import { get as _get} from 'lodash';
import React, {useState, useEffect} from "react"
import { CircularProgress, Table, TableRow, TableCell, Button, TableHead } from "@mui/material"
import { Box } from "@mui/system"
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux"
import {useParams} from 'react-router-dom'
import { getClass } from "../../Redux/Classes/classes.action"
import { AddStudent } from './Components/AddStudent';

export const IndividualClass = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState('new');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const {selectedClass, classesLoadingState} = useSelector(store => store.classes)
  const {students} = useSelector(store => store.students)
  const {id} = useParams()
  const dispatch = useDispatch()

  useEffect(()=>{
    if(!selectedClass){
      dispatch(getClass(id))
    }
  },[])

  const openModal = ()=>{
    setIsModalOpen(true);
  }

	const closeModal = ()=>{
    setIsModalOpen(false);
  }
  const handleMode = (value, student=null)=>{
    setMode(value);
    setSelectedStudent(student);
    openModal();
  }

  const rows = students;

  const columns = [
    { field: 'rollNumber', headerName: 'Roll No.', width: 80},
    { field: 'firstName', headerName: 'First Name', width: 250},
    { field: 'lastName', headerName: 'Last Name', width: 250},
    { field: 'studentEmail', headerName: 'Student Email', width: 250},
    { field: 'parentEmail', headerName: 'Parent Email', width: 250},
  ]
  return(
    <React.Fragment>
      {classesLoadingState ? <CircularProgress/> :
        <Box>
          <h1>Class {_get(selectedClass, 'grade', 'Grade')} - {_get(selectedClass, 'section', 'Section').toUpperCase()}</h1>
          
          <Box>
            <Table sx={{width: 'fit-content', border: '1px solid black', margin: 'auto'}}>
              <TableRow sx={{border: '2px solid black'}}>
                <TableCell sx={{borderRight: '1px solid black', fontWeight:'900'}} align='center'>Subjects</TableCell>
                <TableCell sx={{textTransform: 'capitalize'}}>{_get(selectedClass, 'subjects', []).map((el) => el.name).join(', ')}</TableCell>
              </TableRow>
              <TableRow sx={{border: '2px solid black'}}>
                <TableCell sx={{borderRight: '1px solid black',  fontWeight: '900'}} align='center'>Number of Students</TableCell>
                <TableCell>{_get(selectedClass, 'numberOfStudents', 0)}</TableCell>
              </TableRow>
            </Table>
          </Box>

          <Box>
            <h2>Students</h2>
            <Box sx={{display: 'flex', justifyContent:'flex-end', margin:'2rem'}}>
              <Button onClick={()=>handleMode('new')} variant='contained'>Add Students</Button>
            </Box>
            <Box sx={{height: '500px'}}> 
              {/* <Table sx={{width: '95%', margin:'auto', border: `1.5px solid #15133C`}}>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Roll No.</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Student</TableCell>
                    <TableCell>Parent Email</TableCell>
                  </TableRow>
                </TableHead>
              </Table> */}
              <DataGrid width={'90%'} rows={rows} columns={columns}/>
            </Box>
          </Box>

        </Box>
      }
      
      <AddStudent open={isModalOpen} handleClose={closeModal} mode={mode} selectedStudent={selectedStudent} classId={id}/>
    </React.Fragment>
  )
}