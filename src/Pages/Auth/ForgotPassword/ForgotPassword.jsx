import { Button, TextField, CircularProgress } from "@mui/material"
import { useState, useRef } from "react";
import { createVerificationToken } from "../../../Redux/Auth/auth.action";
import { useDispatch, useSelector } from "react-redux";

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false)
  const {loadingState} = useSelector(store=>store.auth);
  const dispatch = useDispatch()

  const errorMessage = useRef('This Field Cannot be left Blank');

  const handleChange = (e) => {
    setError(false);    
    setEmail(e.target.value);
  }

  const handleSubmit = () => {
    if(email===""){
      return setError(true)
    }
    dispatch(createVerificationToken(email))
  }
  return(
    <div>
      {loadingState?<CircularProgress/>
      :<div>
        <h1>Forgot Your Password?</h1>
        <p>Please Enter your Email Id</p>
        <TextField 
          error={error} 
          helperText={error && errorMessage.current} 
          onChange={handleChange} 
          value={email} 
          type='email'
          name="email" 
          id="email" 
          label='Email' 
          variant="outlined" 
        />
        <br />
        <Button onClick={handleSubmit} variant="contained">Submit</Button>        
      </div>}
    </div>
  )
}