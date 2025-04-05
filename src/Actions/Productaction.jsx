// import axios from "axios";
import api from '../Api/axios'

import { PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL
 } from "../Constants/Productconstant";


export const listProducts =()=>async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_LIST_REQUEST})
        const {data} = await api.get(`/api/products`)
        console.log("API:",data)
        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload: error.response?.data?.message || "Failed to fetch products"
        })
    }
}


export const  ProductDetailslist = (_id)=>async(dispatch)=>{ 
        try{
            dispatch({type:PRODUCT_DETAILS_REQUEST})
            const {data} = await api.get(`/api/product/${_id}`)

            dispatch({
                type:PRODUCT_DETAILS_SUCCESS,
                payload:data
            })
        }catch(error){
            dispatch({
                type:PRODUCT_DETAILS_FAIL,
                payload:error.response?.data?.message || "Failed To Fetch The Product Details."
            })
        }
}