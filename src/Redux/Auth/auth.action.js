import axios from "axios";
import { serverapi } from "../../config/api";

export const SET_USER = "SET_USER";

export const setUser = (payload) => ({type:SET_USER, payload});


export const registerUser = (payload) => dispatch => {
	axios.post(`${serverapi}/auth/register`, payload)
		.then(({data})=>{
			console.log(data)
			dispatch(setUser(data))
		})
		
}


