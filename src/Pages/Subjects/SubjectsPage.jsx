import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { AddSubjects } from "../../Components/Subjects/AddSubjects";
import { getSubjects } from "../../Redux/Subject/subject.action";
import { SubjectCard } from "../../Components/Subjects/SubjectCard";
export const SubjectsPage = ()=> {
  const {subjects} = useSelector(store => store.subjects);  
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState('new')
  const [selectedSubject, setSelectedSubject] = useState(null);

  const openModal = ()=>{
    setIsModalOpen(true);
  }
  const closeModal = ()=>{
    setIsModalOpen(false);
  }
  const handleMode = (value, subject=null)=>{
    setMode(value);
    setSelectedSubject(subject);
    openModal();
  }

  useEffect(()=>{
    dispatch(getSubjects());
  },[])
  return(
    <Box>
      <h1>Subjects</h1>
      <Box sx={{
        display: 'flex', 
        justifyContent: 'flex-end',
        marginRight: '1rem'
      }}>
        <Button onClick={()=> handleMode('new')} variant="contained">Add Subject</Button>
      </Box>
      <Grid container sx ={{
        padding: '1.5rem',
        margin: 'auto',
        width: '98%',
        display: 'flex',
        borderRadius: '10px',
        rowSpacing: '5',
        columnSpacing : '10',
      }}>
        {subjects && subjects.map((el)=>{
          return <Grid sx={{
            margin: '1rem 0',
            display: 'flex',
            justifyContent: 'center',
          }} item xs={2}><SubjectCard key={el._id} subject = {el} handleMode={handleMode}/></Grid>
        })}

      </Grid>

      <AddSubjects open={isModalOpen} handleClose={closeModal} mode={mode} selectedSubject={selectedSubject}/>
    </Box>
  )
}