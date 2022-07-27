import React, { useRef } from "react"
import {Box, Button, Typography} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSubject } from '../../../../Redux/Subject/subject.action';


export const ClassCard = ({item, handleMode}) => {
  const subjects = useRef(item.subjects.map(el => el.name))
  const {classesLoadingState} = useSelector(store => store.classes)

  const dispatch = useDispatch();

  const handleEdit = () =>{
    handleMode('edit', item);
  }

  const handleDelete = () => {
    dispatch(deleteSubject(item._id));
  }
  return (
    <React.Fragment>
      <Box sx={{
        border: '1px solid black', 
        width: '15rem',
        height: '10rem', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent:'space-around', 
        alignItems:'space-between',
        borderRadius: '10px',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        padding: '5px 20px'
      }}>
        <Box >
          <Typography>Class : {item.grade} - {item.section}</Typography>
          <br/>
          <Typography sx ={{textTransform: 'capitalize'}}>
            {subjects.current.length>1 ? 'Subjects':'Subject'} : {subjects.current && subjects.current.join(", ")}
          </Typography>
          <br />
          <Typography>
            Number of Students : {item.numberOfStudents}
          </Typography>
        </Box>
        <Box sx={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'space-around',
          verticalAlign: 'bottom'
        }}>
          <Button onClick={handleEdit} variant='outlined'><EditIcon/></Button>
          <LoadingButton 
            loading={classesLoadingState} 
            size="small" 
            variant='outlined'
            onClick={handleDelete}>
              <DeleteIcon/>
            </LoadingButton>
        </Box>
          
      </Box>

    </React.Fragment>
  )
}