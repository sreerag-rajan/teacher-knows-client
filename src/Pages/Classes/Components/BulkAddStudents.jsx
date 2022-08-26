import { TextField, Table, TableBody, TableRow, TableCell, TableHead, TableContainer, Button, FormControl, InputLabel, NativeSelect } from "@mui/material"
import {
  get as _get,
  isEmpty as _isEmpty,
} from 'lodash';
import { Box } from "@mui/system"
import React, {useState, useEffect} from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom";
import { getClasses } from "../../../Redux/Classes/classes.action";
import { entityAvailability } from "../../../Utility/utlity";

const upperLimit = 15;
const formSchema = {
  rollNumber: '',
  firstName: '',
  lastName: '',
  gender: null,
  studentEmail: '',
  parentEmail : '',
  classId: '',
}
const errorSchema = {state: false, message : ''}

export const BulkAddStudents = () => {
  const [numberOfStudents, setNumberOfStudents] = useState(0);
  const [formData, setFormData] = useState([]);
  const [error, setError] = useState({...errorSchema});
  const {classId} = useParams();

  const {classes, selectedClass} = useSelector(store => store.classes);

  const dispatch = useDispatch();

  useEffect(() => {
    if(_isEmpty(classes)){
      dispatch(getClasses());
    }
  }, [])

  useEffect(()=>{
    let x = [...formData];

    if(+numberOfStudents> formData.length){
      for(let i =0; i<(+numberOfStudents-formData.length); i++){
        x.push({...formSchema, classId,});
      }
    } 
    else if(+numberOfStudents < formData.length){
      for(let i =0; i<(formData.length-+numberOfStudents); i++){
        x.pop();
      }
    }
    setFormData(x);

  },[numberOfStudents])

  const handleNumberOfStudents = (e) => {
    if(e.target.value > upperLimit){
      setError({state: true, message:`Up to ${upperLimit} can be added at a time`})
    }
    else{
      setError({...errorSchema});
      setNumberOfStudents(e.target.value);
    }

  }

  const handleFormChange = ({name, value, id}) => {
    let x = formData.map((el,i) => {
      if(i==id){
        let y = {...el, [name]: value}
        return y
      }
      else{
        return el;
      }
      
    })
    setFormData(x);
  }

  const checkFunction = () => {

    // check for missing values
  }
  return (
    <React.Fragment>
      <Box>
        <h3>Enter the Number of Students to be added: </h3>
        <TextField
            value={numberOfStudents}
            onChange={handleNumberOfStudents}
            helperText={error.state && error.message}
            error={error.state}
            name='numberOfStudents'
            label="Number of Students"
            variant='outlined'
            type='number' 
            InputProps={{ inputProps : {max: 10}}}      
          />

          <hr />
         {numberOfStudents> 0 && <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Roll Number</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Student Email</TableCell>
                  <TableCell>Parent Email</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formData.length>0 && formData.map((el, i) => {
                return <FormRow key={i} id={i} handleForm={handleFormChange} formData={formData} classes ={classes} classId={classId}/>})
                }
              </TableBody>
            </Table>
          </TableContainer>}

          <Box>
            <Button variant={'contained'}>Add Students</Button>
          </Box>
        
      </Box>
    </React.Fragment>
  )
}



const FormRow = ({id,handleForm,formData, classes, classId}) => {
  const errorSchema ={
    rollNumber: {state: false, message: ''},
    firstName: {state: false, message : ''}
  }
  const [error, setError] = useState({...errorSchema});


  const handleChange = (e) => {
    const {name, value} = e.target;
    if(name === 'rollNumber'){
      setError({...error, rollNumber: {state: false, message: ''}})
    }
    if(name === 'firstName'){
      setError({...error, firstName: {state: false, message: ''}});
    }
    if((name === 'classId' && formData[id].rollNumber) || (name==='rollNumber' && formData[id].classId)){
      const rollNumber = name === 'classId' ? formData[id].rollNumber : value;
      const classId = name === 'classId'? value : formData[id].classId;
      entityAvailability({route:'/student/check-entity-availablity', payload: {rollNumber, classId}})
      .catch(()=>{
        setError({...error, rollNumber: {state: true, message: "A Student with this roll number already exists in this class"}})
      })
    }
    handleForm({name, value, id});
  }

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          {id+1}
        </TableCell>
        <TableCell>
          <TextField
            value={formData[id].rollNumber}
            onChange={handleChange}
            helperText={error.rollNumber.state && error.rollNumber.message}
            error={error.rollNumber.state}
            name='rollNumber'
            label="Roll Number"
            variant='outlined'        
          />
        </TableCell>
        <TableCell>
          <TextField
            value={formData[id].firstName}
            onChange={handleChange}
            helperText={error.firstName.state && error.firstName.message}
            error={error.firstName.state}
            name='firstName'
            label="First Name"
            variant='outlined'         
          />
        </TableCell>
        <TableCell>
          <TextField
            value={formData[id].lastName}
            onChange={handleChange}
            name='lastName'
            label="Last Name"
            variant='outlined'         
          />
        </TableCell>
        <TableCell>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <NativeSelect
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData[id].gender}
              label="Gender"
              name='gender'
              onChange={handleChange}
            >
              <option value={null}></option>
              <option value={'MALE'}>Male</option>
              <option value={'FEMALE'}>Female</option>
              <option value={'OTHER'}>Other</option>
              <option value={'NOT DISCLOSED'}>Do not wish to disclose</option>
            </NativeSelect>
          </FormControl>
        </TableCell>
        <TableCell>
          <TextField
            value={formData[id].studentEmail}
            onChange={handleChange}
            name='studentEmail'
            label="Student Email"
            variant='outlined'         
          />
        </TableCell>
        <TableCell>
          <TextField
            value={formData[id].parentEmail}
            onChange={handleChange}
            name='parentEmail'
            label="Parent Email"
            variant='outlined'         
          />
        </TableCell>
        <TableCell>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Class</InputLabel>
            <NativeSelect
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData[id].classId}
              defaultValue={formData[id].classId}
              label="Class"
              name='classId'
              onChange={handleChange}
            >
              <option value={''}></option>
              {classes && classes.map((el) => {
                return <option key={el._id} value={el._id}>{`${el.grade}-${el.section.toUpperCase()}`}</option>
              })}
            </NativeSelect>
          </FormControl>
        </TableCell>
        <TableCell>
          <Button variant="contained">Check</Button>
        </TableCell>
      </TableRow>

    </React.Fragment>
  )
}