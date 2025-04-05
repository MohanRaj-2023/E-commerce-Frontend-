import axios from "axios";
import api from '../Api/axios'

import {SEARCH_REQUEST,SEARCH_SUCCESS,SEARCH_FAIL} from '../Constants/Searchconstants'


export const Searchaction = (search)=> async(dispatch)=>{
    try{
        dispatch({
            type:SEARCH_REQUEST
        })
        console.log("Search_param:",search)
        const {data} = await api.get(`api/product?search=${search}`)

        dispatch({
            type:SEARCH_SUCCESS,
            payload:data
        })
    }
    catch(error){
        dispatch({
            type:SEARCH_FAIL,
            payload: error.response?.data?.message || "Failed to fetch products"
        })
    }
}