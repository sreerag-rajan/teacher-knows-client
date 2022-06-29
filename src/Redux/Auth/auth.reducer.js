import { SET_LOADING_STATE, SET_USER } from "./auth.action";

const initState = {
    user:null,
    loadingState: false
}

export const authReducer = (store=initState, {type, payload})=>{
    switch(type){
        case SET_USER:
            return {...store, user:payload}
        case SET_LOADING_STATE:
            return {...store, loadingState: payload}
        default:
            return store;
    }

}