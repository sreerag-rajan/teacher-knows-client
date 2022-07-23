import {Box, Button, Typography} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux'
import { deleteSubject } from '../../../../Redux/Subject/subject.action'

export const SubjectCard = ({subject, handleMode})=> {
  const {subjectLoadingState} = useSelector(store => store.subjects)
  const dispatch = useDispatch()
  
  
  const handleEdit = () =>{
    handleMode('edit', subject);
  }

  const handleDelete = () => {
    dispatch(deleteSubject(subject._id));
  }
  return (
    <Box sx={{
      border: '1px solid black', 
      width: '10rem',
      height: '7rem', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent:'space-around', 
      alignItems:'space-between',
      borderRadius: '10px',
      boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      padding: '5px 20px'
    }}>
      <Box >
        <Typography sx={{textTransform: 'capitalize'}}>{subject.name}</Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        gap: '20px',
        justifyContent: 'space-around',
        verticalAlign: 'bottom'
      }}>
        <Button onClick={handleEdit} variant='outlined'><EditIcon/></Button>
        <LoadingButton 
          loading={subjectLoadingState} 
          size="small" 
          variant='outlined'
          onClick={handleDelete}>
            <DeleteIcon/>
          </LoadingButton>
      </Box>
        
      </Box>
  )
}