import { ERROR, FETCH_DATA, LOADING, SINGLE_ERROR, SINGLE_FETCH, SINGLE_lOADING } from "./actionType";

export function initialData(){
    return {type:LOADING}
}

export function fetchData(data){
    return {type:FETCH_DATA,payload:data}
}

export function errorHandle(err){
    return {type:ERROR,payload:err}
}

export function singleLoading(){
    return {type:SINGLE_lOADING}
}

export function singleData(data){
    return {type:SINGLE_FETCH,payload:data}
}

export function singleErrorHandle(err){
    return {type:SINGLE_ERROR,payload:err}
}