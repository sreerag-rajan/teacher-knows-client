import {isEmpty as _isEmpty} from "lodash";
import { Modal, Button, Typography, Box, TextField, FormControl, InputLabel, NativeSelect } from "@mui/material"
import React, { useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { entityAvailability } from "../../../Utility/utlity";
import { useDebounce } from "../../../Utility/hooks/useDebounce";
import { addStudents, editStudent } from "../../../Redux/Student/student.action";
import { getClasses } from "../../../Redux/Classes/classes.action";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 650,
  overflowY:'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  pt: 2,
  px: 4,
  pb: 3,
};


export const AddStudent = ({open, handleClose, mode='new', selectedStudent=null, classId}) => {
  const formSchema = {
    rollNumber: '',
    firstName: '',
    lastName: '',
    gender: null,
    studentEmail: '',
    parentEmail : '',
    classId: classId,}
  
  const errorSchema ={
    rollNumber: {state: false, message: ''},
    firstName: {state: false, message : ''}
  }
  //Setting States
  const [formData, setFormData] = useState({...formSchema})
  const [error, setError] = useState({...errorSchema});

  const {classes} = useSelector(store => store.classes);
  const debouncedRollNumber = useDebounce(formData.rollNumber, 800)

  const dispatch = useDispatch();
  

  //USE EFFECTS

  useEffect(()=> {
    if(_isEmpty(classes))
      dispatch(getClasses());
  },[])

  useEffect(()=>{
    if(mode==='edit'){
      setFormData({
        rollNumber: selectedStudent.rollNumber,
        firstName: selectedStudent.firstName,
        lastName: selectedStudent.lastName,
        gender: selectedStudent.gender,
        studentEmail: selectedStudent.studentEmail,
        parentEmail: selectedStudent.parentEmail,
        classId: selectedStudent.classId
      });
    }

    return ()=> {
      setFormData({...formSchema});
      setError({...errorSchema})
    }
  },[open])

  useEffect(()=>{
    if(formData.classId && debouncedRollNumber){
      entityAvailability({route:'/student/check-entity-availablity', payload: {rollNumber: debouncedRollNumber, classId: formData.classId}})
      .catch(()=>{
        setError({...error, rollNumber: {state: true, message: "A Student with this roll number already exists in this class"}})
      })
    }
    
  },[debouncedRollNumber]);

  //Functions
  const handleChange = (e) => { 
    const {name, value} = e.target;

    //Error Handling
    if(name === 'rollNumber') setError({...error, rollNumber: {state: false, message: ''}})
    if(name === 'section') setError({...error, section: {state: false, message: ''}})

    //Check entity Avalability
    if(name === 'classId' && formData.rollNumber){
      entityAvailability({route:'/student/check-entity-availablity', payload: {rollNumber: debouncedRollNumber, classId: formData.classId}})
      .catch(()=>{
        setError({...error, rollNumber: {state: true, message: "A Student with this roll number already exists in this class"}})
      })
    }
    
    setFormData({...formData, [name]: value});    
  }

  const handleSubmit = (isAddMore) => {
    let errorFound = false;
    if(formData.rollNumber.trim()===''){
      errorFound = true;
      setError({...error, rollNumber: {state: true, message: 'This field cannot be blank'}})
    }
    if(formData.firstName.trim()===''){
      errorFound = true;
      setError({...error, firstName: {state: true, message: 'This field cannot be blank'}})
    }
    if(errorFound) return;

    const payload = {
      rollNumber: formData.rollNumber,
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender || 'NOT DISCLOSED',
      studentEmail: formData.studentEmail,
      parentEmail: formData.parentEmail,
      classId: formData.classId
    }
    if(mode === 'new') dispatch(addStudents({classId, payload}));
    else dispatch(editStudent({id: selectedStudent._id, payload, classId}))

    setError({...errorSchema})
    setFormData({...formSchema});

    if(!isAddMore) handleClose()

  }

  return(
    <>
      <Modal
        open = {open}
        onClose = {handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"        
      >
        <Box sx={style}>
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button onClick={handleClose}>
            <CloseIcon/>
          </Button>
        </Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Student
          </Typography>

          <TextField
            value={formData.rollNumber}
            onChange={handleChange}
            helperText={error.rollNumber.state && error.rollNumber.message}
            error={error.rollNumber.state}
            name='rollNumber'
            label="Roll Number"
            variant='outlined'        
          />
          <br/>
          <TextField
            value={formData.firstName}
            onChange={handleChange}
            helperText={error.firstName.state && error.firstName.message}
            error={error.firstName.state}
            name='firstName'
            label="First Name"
            variant='outlined'         
          />
          <br/>
          <TextField
            value={formData.lastName}
            onChange={handleChange}
            name='lastName'
            label="Last Name"
            variant='outlined'         
          />
          <br/>
          <Box>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <NativeSelect
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.gender}
                label="Gender"
                name='gender'
                onChange={handleChange}
              >
                <option value={null}></option>
                <option value={'MALE'}>Male</option>
                <option value={'FEMALE'}>Female</option>
                <option value={'OTHER'}>Other</option>
                <option value={'NOT DISCLOSED'}>Do not wish to disclose</option>
              </NativeSelect>
            </FormControl>
          </Box>
          <br />
          <TextField
            value={formData.studentEmail}
            onChange={handleChange}
            name='studentEmail'
            label="Student Email"
            variant='outlined'         
          />
          <br/>
          <TextField
            value={formData.parentEmail}
            onChange={handleChange}
            name='parentEmail'
            label="Parent Email"
            variant='outlined'         
          />
          <br/>
          <Box>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Class</InputLabel>
              <NativeSelect
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.classId}
                defaultValue={formData.classId}
                label="Class"
                name='classId'
                onChange={handleChange}
              >
                {classes && classes.map((el) => {
                  return <option key={el._id} value={el._id}>{`${el.grade}-${el.section.toUpperCase()}`}</option>
                })}
              </NativeSelect>
            </FormControl>
          </Box>
          
          
          <Button disabled={error.rollNumber.state || error.firstName.state} variant='contained' onClick={()=>handleSubmit(false)}>{mode==='new'?'ADD':'EDIT'}</Button>
          
        </Box>
                
      </Modal>    
    </>
  )
}