import { Button, TextField,CircularProgress} from "@mui/material"
import { useRef } from "react";
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { registerUser } from "../../../Redux/Auth/auth.action";


export const SignUp = ()=>{
	let texfieldStyle = {
		margin: "0.6rem 0"
	}
	const [formData, setFormData] = useState({
		firstName : '',
		lastName: '',
		email: '',
		password: '',
		password2: '',
	})

	const [error, setError] = useState({
		firstName : false,
		lastName: false,
		email: false,
		password: false,
		password2: false,
	})

	const {loadingState} = useSelector(store => store.auth)

	const errorMessage = useRef('This field cannot be blank')
	const dispatch = useDispatch()

	const handleChange = (e)=>{
		const {name, value} = e.target
		setFormData({...formData, [name]: value})
	}

	const handleSubmit = ()=>{
		let e = {}
		for(let key in formData){
			if(formData[key]===''){
				e[key] = true
			}
			else{
				e[key]=false
			}
		}
		setError({...error,...e})
		
		let errors = 0

		for(let key in e){
			if(e[key]){
				errors++;
			}
		}
		
		if(errors>0){
			return;
		}
		else if(formData.password!==formData.password2){
			toast.error("Passwords do no match!")
		}
		else{
			dispatch(registerUser(formData))
		}
	}



  return(
    <div>
      <h1>Sign Up</h1>
			{loadingState?<CircularProgress/>:<div>
				<TextField 
					error={error.firstName} 
					helperText={error.firstName && errorMessage.current} 
					onChange={handleChange} 
					value={formData.firstName} 
					name="firstName" 
					label='First Name' 
					variant="outlined" 
					inputProps={{required:true}}
					style = {{...texfieldStyle}}
				/>

				<br/>

				<TextField 
					error={error.lastName} 
					helperText={error.lastName && errorMessage.current} 
					onChange={handleChange} 
					value={formData.lastName} 
					name="lastName" 
					label='Last Name' 
					variant="outlined" 
					required
					style = {{...texfieldStyle}}
				/>

				<br/>
				
				<TextField 
					error={error.email} 
					helperText={error.email && errorMessage.current} 
					onChange={handleChange} 
					value={formData.email} 
					type='email'
					name="email" 
					id="email" 
					label='Email' 
					variant="outlined" 
					required
					style = {{...texfieldStyle}}
				/>
				

				<br/>

				<TextField 
					error={error.password} 
					helperText={error.password && errorMessage.current} 
					onChange={handleChange} 
					value={formData.password} 
					type='password' 
					name="password" 
					id="password" 
					label="Password" 
					variant="outlined" 
					required
					style = {{...texfieldStyle}}
				/>
			
				<br/>

				<TextField 
					error={error.password2} 
					helperText={error.password2 && errorMessage.current} 
					onChange={handleChange} value={formData.password2} 
					type='password' 
					name='password2' 
					id="password2"  
					label="Confirm Password" 
					variant="outlined" 
					required
					style = {{...texfieldStyle}}
				/>
			

				<br/>

				<Button onClick={handleSubmit} variant="contained">Submit</Button>

			</div>}

			

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

