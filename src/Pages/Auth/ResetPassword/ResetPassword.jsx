import { TextField } from "@mui/material"
import { useState, useRef } from "react"

export const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password1: "",
    password2: "",
  })
  const [error, setError] = useState({
    password1 : false,
    password2 : false
  })

  const errorMessage = useRef('This field cannot be blank')
  const handleChange = (e)=>{
		const {name, value} = e.target
		setFormData({...formData, [name]: value})
	}
  return(
    <div>
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
    </div>
  )
}