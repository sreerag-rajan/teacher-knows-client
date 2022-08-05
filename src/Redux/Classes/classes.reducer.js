import { SET_CLASSES, SET_CLASSES_ERROR_MESSAGE, SET_CLASSES_ERROR_STATE, SET_CLASSES_LOADING_STATE } from "./classes.action";

const initState = {
  classes : [],
  classesLoadingState : false,
  classesErrorState : false,
  classesErrorMessage : '',
  selectedClass : null,
}

export const classesReducer = (store = initState, {type, payload}) => {
  switch(type){
    case SET_CLASSES:
      return {...store, classes: payload};
    case SET_CLASSES_LOADING_STATE:
      return {...store, classesLoadingState: payload};
    case SET_CLASSES_ERROR_STATE:
      return {...store, classesErrorState: payload};
    case SET_CLASSES_ERROR_MESSAGE:
      return {...store, classesErrorMessage: payload};
    default:
      return store;
  }
}