import { SET_SUBJECTS, SET_SUBJECTS_LOADING_STATE } from "./subject.action"


const initialState = {
  subjects : [], 
  subjectLoadingState : false
}

export const subjectReducer = (store=initialState, {type, payload}) => {
  switch(type){
    case SET_SUBJECTS:
      return {...store, subjects: payload};

    case SET_SUBJECTS_LOADING_STATE:
      return {...store, subjectLoadingState: payload};
    
    default:
      return store;
  }

}