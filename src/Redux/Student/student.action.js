import axios from '../../config/axiosInstance'
import { toast} from "react-toastify";
import { SET_SELECTED_CLASS } from '../Classes/classes.action';

//ACTION TYPES
export const SET_STUDENTS = 'SET_STUDENTS';
export const SET_STUDENTS_LOADING = 'SET_STUDENTS_LOADING';
export const SET_STUDENT_ERROR_STATE = 'SET_STUDENT_ERROR_STATE';

//ACTIONS
export const addStudents = ({classId, payload}) => dispatch => {
  dispatch({type: SET_STUDENTS_LOADING, payload: true});
  axios.post('/student', payload)
    .then(({data})=>{
      dispatch({type: SET_STUDENTS, payload: data.students})
      if(classId === data.classe._id) 
        dispatch({type: SET_SELECTED_CLASS, payload: data.classe});
      dispatch({type: SET_STUDENT_ERROR_STATE, payload: false});
      toast.success('Student Successfully Added')
    })
    .catch((er)=> {
      console.error('ERROR ::: addStudents :::', er);
      dispatch({type: SET_STUDENT_ERROR_STATE, payload: true});
      toast.error("Student Addition Failed! Please try Again")
    })
    .finally(()=> dispatch({type: SET_STUDENTS_LOADING, payload:false}))
}

export const editStudent = ({id, payload, classId}) => dispatch => {
  dispatch({type: SET_STUDENTS_LOADING, payload: true});
  axios.patch(`/student/${id}`, payload)
    .then(({data})=>{
      dispatch({type: SET_STUDENTS, payload: data.students})
      if(classId === data.classe._id) 
        dispatch({type: SET_SELECTED_CLASS, payload: data.classe});
      dispatch({type: SET_STUDENT_ERROR_STATE, payload: false});
      toast.success("Student Succesfully edited");
    })
    .catch((er)=> {
      console.error('ERROR ::: editStudents :::', er);
      dispatch({type: SET_STUDENT_ERROR_STATE, payload: true});
      toast.error('Student Editing Failed! Please try again');
    })
    .finally(()=> dispatch({type: SET_STUDENTS_LOADING, payload:false}))
}

export const deleteStudent = (id) => dispatch => {
  dispatch({type: SET_STUDENTS_LOADING, payload: true});
  axios.delete(`/student/${id}`)
    .then(({data})=>{
      dispatch({type: SET_STUDENTS, payload: data.students});
      dispatch({type: SET_SELECTED_CLASS, payload: data.classe});
      dispatch({type: SET_STUDENT_ERROR_STATE, payload: false});
      toast.success('Student Succesffuly Deleted')
    })
    .catch((er)=> {
      console.error('ERROR ::: deleteStudents :::', er);
      dispatch({type: SET_STUDENT_ERROR_STATE, payload: true});
      toast.error('Student Deletion failed! Please try again');
    })
    .finally(()=> dispatch({type: SET_STUDENTS_LOADING, payload:false}))
}