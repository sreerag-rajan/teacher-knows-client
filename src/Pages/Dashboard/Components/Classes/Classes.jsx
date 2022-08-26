import { Button, Grid } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {useNavigate} from 'react-router-dom'
import { AddClass } from "../../../../Components/Classes/AddClass"
import { getClasses } from "../../../../Redux/Classes/classes.action"
import { ClassCard } from "../../../../Components/Classes/ClassCard"

export const Classes = ({limit}) => {
  const {classes} = useSelector(store => store.classes);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState('new')
  const [selectedClass, setSelectedClass] = useState(null);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    dispatch(getClasses());
  },[])

  const openModal = ()=>{
    setIsModalOpen(true);
  }
  const closeModal = ()=>{
    setIsModalOpen(false);
  }
  const handleMode = (value, sclass=null)=>{
    setMode(value);
    setSelectedClass(sclass);
    openModal();
  }
  return(
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
        <Grid item xs={2} sx={{
          borderRight: '1px solid black', 
          padding: '1rem', 
          display:'flex', 
          justifyContent:'center', 
          flexDirection:'column'}}>
          <h2>Classes</h2>
        </Grid>
        <Grid sx={{
            display: 'grid', 
            // flexWrap:'wrap',
            gridTemplateColumns: '50% 50%',
            gridTemplateRows: '13rem 13rem', 
            gap: '1.5rem', 
            justifyContent: 'space-around'
          }} item xs={8}>
          {classes && classes.map((el, i)=>{
            if(i<limit) return <ClassCard key={el._id} item={el} handleMode={handleMode}/>
          })}
        </Grid>
        <Grid item xs={1} sx={{display: 'flex', flexDirection:'column', gap: '5rem', justifyContent:'flex-start'}}>
          <Button onClick={()=> handleMode('new')} variant="contained">Add Classes</Button>
          <Button onClick={()=>{navigate('/classes')}} variant='contained'>See all</Button>
        </Grid>
        
      </Grid>
      <AddClass open = {isModalOpen} handleClose = {closeModal} mode ={mode} selectedClass ={selectedClass}/>
    </React.Fragment>
  )
}