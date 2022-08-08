import { Button, CircularProgress, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { loginUser } from "../../../Redux/Auth/auth.action";
import { Link } from "react-router-dom";

export const Login = ()=>{
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email:"",
    password: ""
  })
  const [error, setError] = useState({})
  const errorMessage = useRef('This field cannot be blank')
  const {loadingState} = useSelector(store => store.auth)

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const handleLogin = ()=>{
    let e = {}
    for(let key in formData){
      if(formData[key]===""){
        e[key] = true
      }
    }
    setError(e)
    console.log(e)
    if(e.length>0) return;
    dispatch(loginUser(formData));
  }
  return(
    <div>
      <h1>Login</h1>
      {loadingState?<CircularProgress/>:
      <div className="formDiv">
        <TextField
          value={formData.email}
          onChange={handleChange}
          helperText={error.email && errorMessage.current}
          error={error.email}
          name='email'
          label="Email"
          variant='outlined'
        />
        <br />
        <TextField
          value={formData.password}
          onChange={handleChange}
          error={error.password}
          helperText={error.password && errorMessage.current}
          name='password'
          label="Password"
          variant='outlined'
          type={'password'}
        />
        <br />
        <Link to="/forgot-password">Forgot Password</Link>
        <br />
        <Button onClick={handleLogin} variant='contained'>Login</Button>
      </div>}

    </div>
  )
}