import {isEmpty as _isEmpty} from "lodash";
import { Modal, Button, Typography, Box, TextField, Checkbox, FormGroup, FormControlLabel } from "@mui/material"
import React, { useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import {getSubjects} from "../../Redux/Subject/subject.action";
import { useEffect } from "react";
import axios from '../../config/axiosInstance'
import { useDebounce } from "../../Utility/hooks/useDebounce";
import { addClasses, editClasses } from "../../Redux/Classes/classes.action";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
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


export const AddClass = ({open, handleClose, mode='new', selectedClass=null}) => {
  //Setting States
  const [formData, setFormData] = useState({
    grade: '',
    section: '',
    subjects: [],
    numberOfStudents: 0
  })
  const [error, setError] = useState(false);
  const errorMessage = useRef('This field cannot be blank');
  const { subjects }= useSelector(store => store.subjects);

  const dispatch = useDispatch();

  //USE EFFECTS
  useEffect(()=>{
    if(mode==='edit'){
      setFormData({
        grade: selectedClass.grade,
        section: selectedClass.section,
        subjects: selectedClass.subjects.map(el => el._id),
        numberOfStudents : selectedClass.numberOfStudents,
      });
    }

    return ()=> setFormData({
      grade: '',
      section: '',
      subjects: [],
      numberOfStudents: 0
    });
  },[open])

  useEffect(()=>{
    if(_isEmpty(subjects)){
      dispatch(getSubjects());
    }
  },[])

  //Functions
  const handleChange = (e) => {
    setError(false); 
    const {name, value, type, checked} = e.target;
    //Logic for Checkbox
    if(type === 'checkbox'){
      if(checked && !formData.subjects.includes(value)){
        setFormData({...formData, subjects: [...formData.subjects, value]});    
      }
      else if (formData.subjects.includes(value)){
        const x = formData.subjects.filter((el) => {
          if(el !== value) return el;
        });
        setFormData({...formData, subjects: x});
      }
    }
    else
      setFormData({...formData, [name]: value});    
  }

  const handleSubmit = () => {
    const payload = {
      grade : formData.grade,
      section : formData.section.toLowerCase(),
      subjects: formData.subjects,
      numberOfStudents: formData.numberOfStudents,
    }
    if(mode === 'new')
      dispatch(addClasses(payload));
    else
      dispatch(editClasses({id: selectedClass._id, payload}))

    setFormData({
      grade: '',
      section: '',
      subjects: [],
      numberOfStudents: 0
    });
    
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
            Add Class
          </Typography>

          <TextField
            value={formData.grade}
            onChange={handleChange}
            helperText={error && errorMessage.current}
            error={error}
            name='grade'
            label="Grade"
            variant='outlined'
            type={'number'}         
          />
          <br/>
          <TextField
            value={formData.section}
            onChange={handleChange}
            helperText={error && errorMessage.current}
            error={error}
            name='section'
            label="Section"
            variant='outlined'         
          />
          <br/>
          <Box sx={{border: '1px solid grey', borderRadius: '10px', padding: "0.5rem 1.3rem"}}>
            <h3>Subjects: </h3>
            <Box
              sx={{
                height: '10rem',
                overflowY: "scroll"
              }} 
            >
            <FormGroup>
            {subjects && subjects.map((el) => {
              return <FormControlLabel key={el._id} control={<Checkbox value={el._id} checked={formData.subjects.includes(el._id)} onChange={handleChange}/>} sx={{textTransform: 'capitalize'}} label={el.name} />
            })}
          </FormGroup>
          </Box>
        </Box>
          <Button disabled={error} variant='contained' onClick={handleSubmit}>{mode==='new'?'ADD':'EDIT'}</Button>
          
        </Box>
                
      </Modal>    
    </>
  )
}