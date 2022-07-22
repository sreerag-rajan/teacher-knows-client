import { Modal, Button, Typography, Box, TextField } from "@mui/material"
import { useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import { addSubject } from "../Redux/Subject/subject.action";

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

export const AddSubjects = ({open, handleClose})=>{
  const [name, setName] = useState('')
  const [error, setError] = useState(false);
  const errorMessage = useRef('This field cannot be blank')
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setError(false); 
    setName(e.target.value)
  }
  

  const handleSubmit = () => {
    if(!name) {
      setError(true);
      return
    };

    dispatch(addSubject({name}))
    setName('');
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
            Add Subject
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please Add the Subject you are teaching
          </Typography>

          <TextField
            value={name}
            onChange={handleChange}
            helperText={error && errorMessage.current}
            error={error}
            name='name'
            label="Subject Name"
            variant='outlined'         
          />
          <br/>

          <Button variant='contained' onClick={handleSubmit}>ADD</Button>
          
        </Box>
                
      </Modal>    
    </>
  )
}