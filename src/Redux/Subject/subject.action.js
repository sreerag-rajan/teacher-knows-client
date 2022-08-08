import axios from '../../config/axiosInstance';
import { toast} from "react-toastify";


//ACTION TYPES
export const SET_SUBJECTS = 'SET_SUBJECTS';
export const SET_SUBJECTS_LOADING_STATE = 'SET_SUBJECTS_LOADING_STATE';
export const SET_SUBJECTS_ERROR_STATE = 'SET_SUBJECTS_ERROR_STATE';

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
      dispatch({type: SET_SUBJECTS_LOADING_STATE, payload: false})
    })
  
}

export const addSubject = (payload)=> dispatch => {
  dispatch({type: SET_SUBJECTS_LOADING_STATE, payload: true});
  axios.post('/subject', payload)
    .then(({data})=>{
      dispatch({type: SET_SUBJECTS, payload: data});
      toast.success('Subject Added!')
    })
    .catch((er)=>{
      console.error('ERROR ::: addSubject ::: ', er);
      toast.error('Subject Creation Failed');
    })
    .finally(()=>{
      dispatch({type: SET_SUBJECTS_LOADING_STATE, payload: false})
    })
}

export const editSubject = ({subjectId, name}) => dispatch => {
  dispatch({type: SET_SUBJECTS_LOADING_STATE, payload: true});
  axios.patch(`/subject/${subjectId}`, {name})
    .then(({data})=>{
      dispatch({type: SET_SUBJECTS, payload: data});
      toast.success('Subject successfully edited!')
    })
    .catch((er)=>{
      console.error('ERROR ::: editSubject ::: ', er);
      toast.error("Subject Editing failed! Please try again")
    })
    .finally(()=>{
      dispatch({type: SET_SUBJECTS_LOADING_STATE, payload: false})
    })
}

export const deleteSubject = subjectId => dispatch => {
  dispatch({type: SET_SUBJECTS_LOADING_STATE, payload: true});
  axios.delete(`/subject/${subjectId}`)
    .then(({data})=>{
      dispatch({type: SET_SUBJECTS, payload: data});
      toast.success("Subject Successfully deleted!")
    })
    .catch((er)=>{
      console.error('ERROR ::: deleteSubject ::: ', er);
      toast.error("Subject deleting Failed! Please try again")
    })
    .finally(()=>{
      dispatch({type: SET_SUBJECTS_LOADING_STATE, payload: false})
    })
}

