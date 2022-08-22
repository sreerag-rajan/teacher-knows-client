import { SET_STUDENTS, SET_STUDENTS_LOADING, SET_STUDENT_ERROR_STATE } from "./student.action"

const initialState = {
  students : [],
  studentLoadingState : false,
  studentErrorState : false
}

export const studentReducer = (store=initialState, {type, payload}) => {
  switch(type){
    case SET_STUDENTS:
      return {...store, students: payload};
    case SET_STUDENTS_LOADING:
      return {...store, studentLoadingState: payload};
    case SET_STUDENT_ERROR_STATE:
      return {...store, studentErrorState: payload};
    default:
      return store;
  }
}