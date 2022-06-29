import axios from "axios";
import { serverapi } from "../../config/api";

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
			localStorage.setItem('__tk_userToken', JSON.stringify(data.token));
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
		})
		.catch((er)=>{
			console.error('ERROR ::: loginUser:::', er.message, "; ", er.response.data.error)
		})
		.finally(()=>{
			dispatch(setLoadingState(false))
		})
}


