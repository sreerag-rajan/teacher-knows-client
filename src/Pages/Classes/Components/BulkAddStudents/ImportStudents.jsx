import {filter as _filter, map as _map} from 'lodash';
import { Box, TextField,  Table, TableBody, TableRow, TableCell, TableHead, TableContainer, } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import readXlsxFile from 'read-excel-file';
import { bulkAddEntityCheck } from './helper';
import { RssFeed } from '@mui/icons-material';


const readExcel = async (file) => {
  const result = await readXlsxFile(file, {sheet: 1});
  return result;
}

const mapClass = (value, classes) => {
  const [grade, section] = value.split('-');
  const classe = _filter(classes, (el) => el.grade == grade && el.section == section);
  return classe[0];
}
export const ImportStudents = () => {
  const [data, setData] = useState([])
  const dispatch = useDispatch();
  const {classes} = useSelector(store => store.classes);
  
  useEffect(()=> {
    console.log(data)

  }, [data])

  const bulkEntityCheck = (students) => {
    const checked = _map(students, async (el, i) => {
      const rollNumber = el.rollNumber;
      const classId = el.class.id;
      bulkAddEntityCheck({student: {rollNumber, classId}, classe:students, index:i})
        .then((res) => {
          return {...el, error: res.errorBody};
        })
    });
    
  }

  const handleChange = (file)=> {
    readExcel(file)
      .then((res) =>{
        let x = res.map((el, i) => {
          if(i!=0){
            const classe = mapClass(el[6], classes);          
            return {
              rollNumber: el[0],
              firstName: el[1],
              lastName: el[2],
              gender: el[3],
              studentEmail: el[4],
              parentEmail: el[5],
              class: {name:el[6], id:classe._id},
              error: {state: false, msg:''},
            }
          }
        });
        x.shift();
        setData(x); 
        bulkEntityCheck(x);     
      });
  }
  return(
    <React.Fragment>
      Student details can be imported with a csv file.

      <Box>
        <TextField
          type='file' 
          onChange={(e)=>handleChange(e.target.files[0])}         
        ></TextField>
      </Box>
      <Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll Number</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Student Email</TableCell>
                <TableCell>Parent Email</TableCell>
                <TableCell>Class</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => {
                return( 
                <TableRow>
                  <TableCell>{row.rollNumber}</TableCell>
                  <TableCell sx={{textTransform:'capitalize'}}>{row.firstName}</TableCell>
                  <TableCell sx={{textTransform:'capitalize'}}>{row.lastName}</TableCell>
                  <TableCell sx={{textTransform:'uppercase'}}>{row.gender}</TableCell>
                  <TableCell>{row.studentEmail}</TableCell>
                  <TableCell>{row.parentEmail}</TableCell>
                  <TableCell sx={{textTransform:'uppercase'}}>{row.class.name}</TableCell>

                </TableRow>
                )
              })}

            </TableBody>
          </Table>

        </TableContainer>
      </Box>
    </React.Fragment>
  )
}