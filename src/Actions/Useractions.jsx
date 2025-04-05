import axios from "axios";
import api from '../Api/axios'

import {
    USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL,
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, 
    USER_SIGNOUT
} from "../Constants/Userconstants";


export const Usersignup = (fname, lname, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_SIGNUP_REQUEST
        })



        const { data } = await api.post('/api/user/signup/',
            {
                'fname': fname,
                'lname': lname,
                'email': email,
                'password': password
            },
            {
                headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log('USER_SIGNUP:',data)
        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        })

        // localStorage.setItem('userinfo', JSON.stringify(data))
    }
    catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response.data && error.response.data.details ? error.response.data.details : 'Invalid Credentials'
        })
    }
}


export const Usersignin = (username,password)=>async(dispatch)=>{
    try{
        dispatch({
            type:USER_SIGNIN_REQUEST
        })

        

        const {data} = await api.post('/api/user/signin/',
            {
                'username':username,
                'password':password
            },{
                'headers':{
                    'Content-type':'application/json'
                }
            })
        
        dispatch({
            type:USER_SIGNIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userinfo',JSON.stringify(data))
    }
    catch(error){
        dispatch({
            type:USER_SIGNIN_FAIL,
            payload:error.response.data && error.response.data.details ? error.response.data.details : 'Invalid Credentials'
        })
    }
}

export const Usersignout =()=>(dispatch)=>{
        localStorage.removeItem('userinfo')
        dispatch({
            type:USER_SIGNOUT
        })
}