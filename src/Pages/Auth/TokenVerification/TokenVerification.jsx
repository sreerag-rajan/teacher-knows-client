import OtpInput from 'react-otp-input';
import { useState } from 'react';
import { Button } from '@mui/material';
import './TokenVerification.css'
import { useRef } from 'react';
import {Navigate} from 'react-router-dom'
export const TokenVerification = ()=>{
    const [otp, setOtp] = useState("");
    const [isError, setIsError] = useState(false)
		const [user] = useState(JSON.parse(sessionStorage.getItem('_tk_user')))

    const handleChange = (otp) => {
			setIsError(false);
			setOtp(otp)
    };

    const handleSubmit = ()=>{
      if(otp.length<6) return setIsError(true)
    }
    return(
      <div>
				{!user && <Navigate to='/'/>}
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
			</div>
    )
}