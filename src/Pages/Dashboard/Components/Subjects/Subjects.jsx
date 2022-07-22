import { Box, Button, Grid } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux/es/exports"
import { getSubjects } from "../../../../Redux/Subject/subject.action"

export const Subjects = () => {

  const {subjects} = useSelector(store => store.subjects);  
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getSubjects());
  },[])
  return (
    <Grid sx={{
      border: '1px solid black',
      padding: '1.5rem',
      margin: '1rem auto',
      width: '80%',
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      <Grid item xs={3} sx={{borderRight: '1px solid black', padding: '1rem'}}>
        <h2>Subjects</h2>
      </Grid>
      <Grid sx={{display: 'flex', flexWrap:'wrap', gap: '1.5rem'}} item xs={7}>
        {subjects && subjects.map((el, i)=>{
          if(i<6) return <Box sx={{
            border: '1px solid black', 
            minWidth: '8rem', 
            display: 'flex', 
            justifyContent:'center', 
            alignItems:'center'}}>
              {el.name}
            </Box>
        })}
      </Grid>
      <Grid item xs={2} sx={{display: 'flex', flexDirection:'column', justifyContent: 'space-between'}}>
        <Button variant="contained">Add Subject</Button>
        <Button variant='contained'>See all</Button>
      </Grid>
      
    </Grid>
  )
}