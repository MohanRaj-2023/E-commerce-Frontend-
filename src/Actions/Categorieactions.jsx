import { CATEGORIE_LIST_REQUEST,CATEGORIE_LIST_SUCCESS,CATEGORIE_LIST_FAIL,CATEGORIE_PRODUCTS_REQUEST,
    CATEGORIE_PRODUCTS_SUCCESS,CATEGORIE_PRODUCTS_FAIL
 } 
from "../Constants/Categorieconstants";
import axios from "axios";
import api from '../Api/axios'

export const categoriesaction = () => async(dispatch)=>{
    try{
        dispatch({
            type:CATEGORIE_LIST_REQUEST
        })

        const {data} = await api.get(`api/categories`)
        console.log("categories_data:",data)
        dispatch({
            type:CATEGORIE_LIST_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type:CATEGORIE_LIST_FAIL,
            payload:error.response?.data?.message || "Faild to fetch Categories"
        })
    }
}



export const CategorieproductAction = (categoriename)=> async (dispatch)=>{
    try{
        dispatch({
            type: CATEGORIE_PRODUCTS_REQUEST
           })    
           const {data} = await api.get(`api/categorie/${categoriename}`)
           dispatch({
            type:CATEGORIE_PRODUCTS_SUCCESS,
            payload:data
           })
    } 
    catch(error){
        dispatch({
            type:CATEGORIE_PRODUCTS_FAIL,
            payload:error.response?.data?.message || "Failed to fetch products"
        })
    }
    
}