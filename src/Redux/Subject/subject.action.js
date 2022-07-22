import axios from '../../config/axiosInstance'
import { SET_LOADING_STATE } from '../Auth/auth.action';


//ACTION TYPES
export const SET_SUBJECTS = 'SET_SUBJECTS';
export const SET_SUBJECTS_LOADING_STATE = 'SET_SUBJECTS_LOADING_STATE';

//ACTIONS
export const getSubjects = ()=> dispatch => {
  dispatch({type: SET_SUBJECTS_LOADING_STATE, payload: true});
  axios.get(`/subject`)
    .then(({data})=>{
      dispatch({type: SET_SUBJECTS, payload: data});
    })
    .catch((er)=>{
      console.error('ERROR ::: getSubjects ::: ', er);
    })
    .finally(()=>{
      dispatch({type: SET_LOADING_STATE, payload: false})
    })
  
}