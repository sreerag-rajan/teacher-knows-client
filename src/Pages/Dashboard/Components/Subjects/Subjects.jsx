import { Box, Button, Grid } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux/es/exports"
import { AddSubjects } from "../../../../Common/AddSubjects"
import { getSubjects } from "../../../../Redux/Subject/subject.action"

export const Subjects = () => {

  const {subjects} = useSelector(store => store.subjects);  
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = ()=>{
    setIsModalOpen(true);
  }
  const closeModal = ()=>{
    setIsModalOpen(false);
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
      <Grid sx={{display: 'flex', flexWrap:'wrap', gap: '1.5rem', justifyContent: 'space-around'}} item xs={7}>
        {subjects && subjects.map((el, i)=>{
          if(i<6) return <Box sx={{
            border: '1px solid black', 
            minWidth: '8rem', 
            display: 'flex', 
            justifyContent:'center', 
            alignItems:'center',
            borderRadius: '10px',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
          }}>
              {el.name}
            </Box>
        })}
      </Grid>
      <Grid item xs={2} sx={{display: 'flex', flexDirection:'column', justifyContent: 'space-between'}}>
        <Button onClick={openModal} variant="contained">Add Subject</Button>
        <Button variant='contained'>See all</Button>
      </Grid>
      
    </Grid>

    <AddSubjects open={isModalOpen} handleClose={closeModal}/>

    </React.Fragment>
  )
}