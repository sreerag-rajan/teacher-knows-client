import { Modal, Button, Typography, Box, TextField } from "@mui/material"
import { useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import { addSubject, editSubject} from "../Redux/Subject/subject.action";
import { useEffect } from "react";
import axios from '../config/axiosInstance'
import { useDebounce } from "../Utility/hooks/useDebounce";

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
  const [formData, setFormData] = useState({
    grade: '',
    Section: '',
    subjects: [],
    numberOfStudents: 0
  })
  const [error, setError] = useState(false);
  const errorMessage = useRef('This field cannot be blank');

  const dispatch = useDispatch();

  useEffect(()=>{
    if(mode==='edit'){
      setFormData({
        grade: selectedClass.grade,
        section: selectedClass.section,
        subjects: selectedClass.subjects
      });
    }

    return ()=> setFormData({
      grade: '',
      Section: '',
      subjects: [],
      numberOfStudents: 0
    });
  },[open])

  const handleChange = (e) => {
    setError(false); 
    const {name, value, type} = e.target;
    if(type === 'checkbox'){
      //need logic here
    }
    setFormData({...formData, [name]: value});    
  }
  

  const handleSubmit = () => {
    handleClose();
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
          <Button disabled={error} variant='contained' onClick={handleSubmit}>{mode==='new'?'ADD':'EDIT'}</Button>
          
        </Box>
                
      </Modal>    
    </>
  )
}