import { Co2Sharp } from '@mui/icons-material';
import { Box, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import readXlsxFile from 'read-excel-file';

const SCHEMA = {
  'rollNumber': {
    prop:'rollNumber',
    type: Number
  },
  'firstName' : {
    prop: 'firstName',
    type: String
  },
  'lastName': {
    prop:'lastName',
    type: String,
  },
  'gender': {
    prop: 'gender',
    type: String
  },
  'studentEmail' : {
    prop: 'studentEmail',
    type: String,
  },
  'parentEmail': {
    prop: 'parentEmail',
    type: String
  },
  'class' : {
    prop: 'class',
    type: String
  }
}

const readExcel = async (file) => {
  const result = await readXlsxFile(file, {sheet: 1});
  return result;
}

export const ImportStudents = () => {
  const [data, setData] = useState([])
  
  useEffect(()=> {
    console.log(data)
  }, [data])

  const handleChange = (file)=> {
    readXlsxFile(file)
      .then((res) =>{
        let x = res.map((el, i) => {
          if(i!=0){
            return {
              rollNumber: el[0],
              firstName: el[1],
              lastName: el[2],
              gender: el[3],
              studentEmail: el[4],
              parentEmail: el[5],
              class: el[6]
            }
          }
        });
        x.shift();
        setData(x);
        
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
    </React.Fragment>
  )
}