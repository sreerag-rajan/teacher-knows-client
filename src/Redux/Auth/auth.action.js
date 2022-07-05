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
			dispatch(createVerificationToken(data.user.email));

		})
		.catch((er)=>{
			console.error('ERROR ::: registerUser:::', er.message, "; ", er.response.data.error)
		})
		.finally(()=>{
			dispatch(setLoadingState(false))
		})
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


export const createVerificationToken = payload => dispatch => {
	axios.post(`${serverapi}/token/create-token`,{user:payload})
		.then((res)=>{
			window.location.href = clientApi+'/verify-token'
		})
		.catch((er)=>{console.log('ERROR ::: token creation failed :::', er)});

}

export const verifyToken = ({token, type}) => dispatch =>{
	axios.post(`${serverapi}/token/verify-token`,{token, type})
		.then((res)=>{
			if(type==="REGISTER"){
				let token = JSON.parse(sessionStorage.getItem('_tk_userToken'))
				localStorage.setItem('__tk_userToken', JSON.stringify(token))
				localStorage.setItem('__tk_user' , JSON.stringify(res.user));
				window.location.href = clientApi+'/'
			}
			else{
				window.location.href= clientApi+'/reset-password'
			}
	})
}


