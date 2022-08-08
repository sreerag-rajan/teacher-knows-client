import axios from '../../config/axiosInstance'
import { SET_STUDENTS } from '../Student/student.action';
import { toast} from "react-toastify";

//Action Types
export const SET_CLASSES = 'SET_CLASSES';
export const SET_CLASSES_LOADING_STATE = 'SET_CLASSES_LOADING_STATE';
export const SET_CLASSES_ERROR_STATE = 'SET_CLASSES_ERROR_STATE';
export const SET_CLASSES_ERROR_MESSAGE = 'SET_CLASSES_ERROR_MESSAGE';
export const SET_SELECTED_CLASS = "SET_SELECTED_CLASS";


//Actions

export const getClasses = () => dispatch => {
  dispatch({type: SET_CLASSES_LOADING_STATE, payload: true})
  axios.get('/classes')
    .then(({data})=>{
      dispatch({type: SET_CLASSES, payload: data});
    })
    .catch((er)=> {
      console.error('ERROR ::: getClasses ::: ', er);
      dispatch({type: SET_CLASSES_ERROR_STATE, payload: true});
      dispatch({type: SET_CLASSES_ERROR_MESSAGE, payload: "Something Went Wrong"});
    })
    .finally(()=> {
      dispatch({type: SET_CLASSES_LOADING_STATE, payload: false});
    })
}

export const getClass = (classId) => dispatch => {
  dispatch({type: SET_CLASSES_LOADING_STATE, payload: true})
  axios.get(`/classes/${classId}`)
    .then(({data})=>{
      dispatch({type: SET_SELECTED_CLASS, payload: data.classe});
      dispatch({type: SET_STUDENTS, payload: data.students});
    })
    .catch((er)=> {
      console.error('ERROR ::: getClass ::: ', er);
      dispatch({type: SET_CLASSES_ERROR_STATE, payload: true});
      dispatch({type: SET_CLASSES_ERROR_MESSAGE, payload: "Something Went Wrong"});
    })
    .finally(()=> {
      dispatch({type: SET_CLASSES_LOADING_STATE, payload: false});
    })
}

export const addClasses = payload => dispatch => {
  dispatch({type: SET_CLASSES_LOADING_STATE, payload : true});
  axios.post('/classes', payload)
    .then(({data})=>{
      dispatch({type: SET_CLASSES, payload : data})
      toast.success("Class Added");
    })
    .catch((er)=>{
      console.error('ERROR ::: getClasses ::: ', er);
      dispatch({type: SET_CLASSES_ERROR_STATE, payload: true});
      dispatch({type: SET_CLASSES_ERROR_MESSAGE, payload: "Something Went Wrong"});
      toast.error('Class creation failed! Please try again')
    })
    .finally(() => dispatch({type: SET_CLASSES_LOADING_STATE, payload: false}));
}; 

export const editClasses = ({id, payload}) => dispatch => {
  dispatch({type: SET_CLASSES_LOADING_STATE, payload : true});
  axios.patch(`/classes/${id}`, payload)
    .then(({data})=>{
      dispatch({type: SET_CLASSES, payload : data})
      toast.success('Class Succesffuly Edited!')
    })
    .catch((er)=>{
      console.error('ERROR ::: getClasses ::: ', er);
      dispatch({type: SET_CLASSES_ERROR_STATE, payload: true});
      dispatch({type: SET_CLASSES_ERROR_MESSAGE, payload: "Something Went Wrong"});
      toast.error('Class Editing Failed! Please try again');
    })
    .finally(() => dispatch({type: SET_CLASSES_LOADING_STATE, payload: false}));

}

export const deleteClass = (classId) => dispatch => {
  dispatch({type: SET_CLASSES_LOADING_STATE, payload: false});
  axios.delete(`/classes/${classId}`)
    .then(({data}) => {
      dispatch({type: SET_CLASSES, payload: data});
      toast.success('Class Successfully deleted!')
    })
    .catch((er)=> {
      console.error('ERROR ::: deleteClasses ::: ', er);
      dispatch({type: SET_CLASSES_ERROR_STATE, payload: true});
      dispatch({type: SET_CLASSES_ERROR_MESSAGE, payload: "Something Went Wrong"});
      toast.error('Class deletion Failed! Please try again')
    })
    .finally(()=> {
      dispatch({type: SET_CLASSES_LOADING_STATE, payload: false});
    });
}