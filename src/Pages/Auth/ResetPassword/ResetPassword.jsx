import { Button, TextField } from "@mui/material"
import { toast, ToastContainer } from "react-toastify";
import { useState, useRef } from "react"
import { Navigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../Redux/Auth/auth.action";

export const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password1: "",
    password2: "",
  })
  const [error, setError] = useState({
    password1 : false,
    password2 : false
  })
  const token = JSON.parse(sessionStorage.getItem('__tk_PasswordResetToken'))
  const dispatch = useDispatch();

  const errorMessage = useRef('This field cannot be blank')
  const handleChange = (e)=>{
		const {name, value} = e.target
		setFormData({...formData, [name]: value})
	}

  const handleSubmit = () => {
    let e = {};
    if(formData.password1===""){
      e.password1=true;
    }
    else{
      e.password1=false
    }
    if(formData.password2===""){
      e.password2=true;
    }
    else{
      e.password2 =false;
    }
    setError({...e})
    let errFound = false;
    for(let key in e){
      if(e[key]){
        errFound=true;
      }
    }
    if(errFound){
      return;
    }
    if(formData.password1!==formData.password2){
      toast.error('Passwords do not match')
    }
    else{
      dispatch(resetPassword({token, password:formData.password1}))
    }
    
  }
  return(
    <div>
      {!token && <Navigate to="/login"/>}
      <h1>Reset Password</h1>

      <TextField
        value={formData.password1}
        onChange={handleChange}
        error={error.password1} 
				helperText={error.password1 && errorMessage.current}
        type='password'
        name='password1'
        id='password1'
        label='New Password'
        variant='outlined'  
      />
      <TextField
        value={formData.password2}
        onChange={handleChange}
        error={error.password2} 
				helperText={error.password2 && errorMessage.current}
        type='password'
        name='password2'
        id='password2'
        label='Confirm New Password'
        variant='outlined'  
      />

      <Button onClick={handleSubmit} variant='contained'>Submit</Button>

      <ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
    </div>
  )
}