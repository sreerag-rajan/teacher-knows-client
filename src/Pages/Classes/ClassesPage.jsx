import React, {useState, useEffect} from 'react';
import {Button, Grid} from '@mui/material'
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { ClassCard } from '../../Components/Classes/ClassCard';
import { AddClass } from '../../Components/Classes/AddClass'
import { getClasses } from '../../Redux/Classes/classes.action';

export const ClassesPage = () => {
	const {classes} = useSelector(store => store.classes)
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [mode, setMode] = useState('new');
	const [selectedClass, setSelectedClass] = useState(null);

	const dispatch = useDispatch();

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
    <Box >
      <h1>Classes</h1>
			<Box sx={{
        display: 'flex', 
        justifyContent: 'flex-end',
        marginRight: '1rem'
      }}>
				<Button onClick={() => handleMode('new')} variant='contained'>Add Class</Button>
			</Box>

			<Grid container sx ={{
        padding: '1.5rem',
        margin: 'auto',
        width: '98%',
        display: 'flex',
        borderRadius: '10px',
        rowSpacing: '5',
        columnSpacing : '10',
				gap: '30px',
      }}>
        {classes && classes.map((el)=>{
          return <Grid sx={{
            margin: '1rem 0',
            display: 'flex',
            justifyContent: 'center',
          }} item xs={2}><ClassCard key={el._id} item={el} handleMode={handleMode}/></Grid>
        })}

      </Grid>

			<AddClass open={isModalOpen} handleClose={closeModal} mode={mode} selectedClass={selectedClass}/>
      
    </Box>
  )
}