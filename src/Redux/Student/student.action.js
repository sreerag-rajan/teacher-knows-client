import axios from '../../config/axiosInstance'

//ACTION TYPES
export const SET_STUDENTS = 'SET_STUDENTS';
export const SET_STUDENTS_LOADING = 'SET_STUDENTS_LOADING';
export const SET_STUDENT_ERROR_STATE = 'SET_STUDENT_ERROR_STATE';

//ACTIONS
export const addStudents = payload => dispatch => {
  dispatch({type: SET_STUDENTS_LOADING, payload: true});
  axios.post('/student', payload)
    .then(({data})=>{
      dispatch({type: SET_STUDENTS, payload: data})
      dispatch({type: SET_STUDENT_ERROR_STATE, payload: false});
    })
    .catch((er)=> {
      console.error('ERROR ::: addStudents :::', er);
      dispatch({type: SET_STUDENT_ERROR_STATE, payload: true});
    })
    .finally(()=> dispatch({type: SET_STUDENTS_LOADING, payload:false}))
}

export const editStudent = ({id, payload}) => dispatch => {
  dispatch({type: SET_STUDENTS_LOADING, payload: true});
  axios.patch(`/student/${id}`, payload)
    .then((data)=>{
      dispatch({type: SET_STUDENTS, payload: data})
      dispatch({type: SET_STUDENT_ERROR_STATE, payload: false});
    })
    .catch((er)=> {
      console.error('ERROR ::: editStudents :::', er);
      dispatch({type: SET_STUDENT_ERROR_STATE, payload: true});
    })
    .finally(()=> dispatch({type: SET_STUDENTS_LOADING, payload:false}))
}

export const deleteStudent = (id) => dispatch => {
  dispatch({type: SET_STUDENTS_LOADING, payload: true});
  axios.delete(`/student/${id}`)
    .then((data)=>{
      dispatch({type: SET_STUDENTS, payload: data})
      dispatch({type: SET_STUDENT_ERROR_STATE, payload: false});
    })
    .catch((er)=> {
      console.error('ERROR ::: deleteStudents :::', er);
      dispatch({type: SET_STUDENT_ERROR_STATE, payload: true});
    })
    .finally(()=> dispatch({type: SET_STUDENTS_LOADING, payload:false}))
}