import axios from '../../config/axiosInstance'

//Action Types
export const SET_CLASSES = 'SET_CLASSES';
export const SET_CLASSES_LOADING_STATE = 'SET_CLASSES_LOADING_STATE';
export const SET_CLASSES_ERROR_STATE = 'SET_CLASSES_ERROR_STATE';
export const SET_CLASSES_ERROR_MESSAGE = 'SET_CLASSES_ERROR_MESSAGE';


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

// export const addClasses = payload => dispatch => {}; 