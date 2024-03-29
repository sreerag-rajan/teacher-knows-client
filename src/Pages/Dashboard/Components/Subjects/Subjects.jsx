import { Button, Grid } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {useNavigate} from 'react-router-dom'
import { AddSubjects } from "../../../../Common/Subjects/AddSubjects"
import { getSubjects } from "../../../../Redux/Subject/subject.action"
import { SubjectCard } from "../../../../Common/Subjects/SubjectCard"

export const Subjects = () => {

  const {subjects} = useSelector(store => store.subjects);  
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState('new')
  const [selectedSubject, setSelectedSubject] = useState(null);

  const dispatch = useDispatch()
  const navigate = useNavigate()

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
  return (
    <React.Fragment>
    <Grid container sx={{
      border: '1px solid black',
      padding: '1.5rem',
      margin: '1rem auto',
      width: '80%',
      display: 'flex',
      justifyContent: 'space-between',
      borderRadius: '10px',
    }}>
      <Grid item xs={2} sx={{borderRight: '1px solid black', padding: '1rem'}}>
        <h2>Subjects</h2>
      </Grid>
      <Grid sx={{display: 'flex', flexWrap:'wrap', gap: '1.5rem', justifyContent: 'space-around'}} item xs={8}>
        {subjects && subjects.map((el, i)=>{
          if(i<3) return <SubjectCard key={el._id} subject = {el} handleMode={handleMode}/>
        })}
      </Grid>
      <Grid item xs={1} sx={{display: 'flex', flexDirection:'column', justifyContent: 'space-between'}}>
        <Button onClick={()=> handleMode('new')} variant="contained">Add Subject</Button>
        <Button onClick={()=>{navigate('/subjects')}} variant='contained'>See all</Button>
      </Grid>
      
    </Grid>

    <AddSubjects open={isModalOpen} handleClose={closeModal} mode={mode} selectedSubject={selectedSubject}/>

    </React.Fragment>
  )
}