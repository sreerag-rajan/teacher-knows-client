import OtpInput from 'react-otp-input';
import { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import './TokenVerification.css';
import {Navigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken } from '../../../Redux/Auth/auth.action';
export const TokenVerification = ()=>{
    const [otp, setOtp] = useState("");
    const [isError, setIsError] = useState(false)
		const [user] = useState(JSON.parse(sessionStorage.getItem('__tk_user')))
		const {loadingState} = useSelector(store => store.auth);
		const dispatch = useDispatch()

    const handleChange = (otp) => {
			setIsError(false);
			setOtp(otp)
    };

    const handleSubmit = ()=>{
      if(otp.length<6) return setIsError(true)

			let type = JSON.parse(sessionStorage.getItem('__tk_verify_token_type'))||'PASSWORD_RESET';
			dispatch(verifyToken({token:otp, type}))
    }
    return(
      <div>
				{!user && <Navigate to='/'/>}
				{loadingState?<CircularProgress/>
				:<div>
					<h1>Verification</h1>
					<p>Please enter the 6 digit code</p>
					<div className='otpDiv'>
					<OtpInput
						value={otp}
						onChange={handleChange}
						numInputs={6}
						separator={<span>-</span>}
						style={{margin:'auto'}}
						isInputNum={true}
						inputStyle={{width:"30px", height:"40px", fontSize:"20px"}}
						hasErrored={isError}
						errorStyle={{border:'2px solid red'}}
					/>
					</div>
					<Button onClick={handleSubmit} variant='contained'>Submit</Button>
				</div>}
			</div>
    )
}