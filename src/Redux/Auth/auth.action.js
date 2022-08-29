import axios from "axios";
import { clientApi, serverapi } from "../../config/api";

export const SET_USER = "SET_USER";
export const SET_LOADING_STATE = 'SET_LOADING_STATE'

export const setUser = (payload) => ({type:SET_USER, payload});
export const setLoadingState = payload => ({type:SET_LOADING_STATE, payload})


export const registerUser = (payload) => dispatch => {
	dispatch(setLoadingState(true))
	axios.post(`${serverapi}/auth/register`, payload)
		.then(({data})=>{
			console.log('User sucessfully registered')
			dispatch(setUser(data))
			sessionStorage.setItem('__tk_userToken', JSON.stringify(data.token));
			sessionStorage.setItem('__tk_user' , JSON.stringify(data.user));
			sessionStorage.setItem('__tk_verify_token_type', JSON.stringify('REGISTER'));
			dispatch(createVerificationToken({user:data.user.email, type: "REGISTER"}));

		})
		.catch((er)=>{
			console.error('ERROR ::: registerUser:::', er.message, "; ", er.response.data.error);
			dispatch(setLoadingState(false))
		});
}

export const loginUser = payload => dispatch => {
	dispatch(setLoadingState(true));
	axios.post(`${serverapi}/auth/login`, payload)
		.then(({data})=>{
			dispatch(setUser(data));
			localStorage.setItem('__tk_userToken', JSON.stringify(data.token))
			localStorage.setItem('__tk_user' , JSON.stringify(data.user));
			window.location.href = clientApi+'/'
		})
		.catch((er)=>{
			console.error('ERROR ::: loginUser:::', er.message, "; ", er.response.data.error)
		})
		.finally(()=>{
			dispatch(setLoadingState(false))
		})
}

export const resetPassword = payload => dispatch => {
	dispatch(setLoadingState(true))
	axios.post(`${serverapi}/auth/reset-password`, payload)
		.then(()=>{
			sessionStorage.removeItem('__tk_PasswordResetToken');
			window.location.href = clientApi + '/login'
		})
		.catch((er)=>{
			console.error('ERROR ::: resetPassword :::', er.message)
		})
		.finally(()=>{
			dispatch(setLoadingState(false));
		})
}


export const createVerificationToken = payload => dispatch => {
	dispatch(setLoadingState(true))
	axios.post(`${serverapi}/token/create-token`,payload)
		.then((res)=>{
			sessionStorage.setItem('__tk_user' , JSON.stringify(res.data));

			window.location.href = clientApi+'/verify-token'
		})
		.catch((er)=>{console.error('ERROR ::: token creation failed :::', er)})
		.finally(()=>{
			dispatch(setLoadingState(false))
		})

}

export const verifyToken = ({token, type}) => dispatch =>{
	dispatch(setLoadingState(true))
	axios.post(`${serverapi}/token/verify-token`,{token, type})
		.then((res)=>{
			if(type==="REGISTER"){
				let token = JSON.parse(sessionStorage.getItem('__tk_userToken'))
				localStorage.setItem('__tk_userToken', JSON.stringify(token))
				localStorage.setItem('__tk_user' , JSON.stringify(res.data.user));
				sessionStorage.removeItem('__tk_userToken');
				sessionStorage.removeItem('__tk_user');
				sessionStorage.removeItem('__tk_verify_token_type');
				window.location.href = clientApi+'/'
			}
			else{
				sessionStorage.setItem('__tk_PasswordResetToken', JSON.stringify(res.data.token._id));
				window.location.href= clientApi+'/reset-password'
			}
	})
	.catch((er)=>{
		console.error('ERROR ::: verifyToken :::', er)
	})
	.finally(()=>{
		dispatch(setLoadingState(false))
	})
}


