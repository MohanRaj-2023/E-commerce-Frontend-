import {CATEGORIE_LIST_REQUEST,CATEGORIE_LIST_SUCCESS,CATEGORIE_LIST_FAIL,CATEGORIE_PRODUCTS_REQUEST,
    CATEGORIE_PRODUCTS_SUCCESS,CATEGORIE_PRODUCTS_FAIL
}
from '../Constants/Categorieconstants'



export const CategorieReducer = (state={categories:[]},action)=>{
        switch(action.type){
            case CATEGORIE_LIST_REQUEST:
                return {loading:true,categories:[]}
            case CATEGORIE_LIST_SUCCESS:
                return {loading:false,categories:action.payload}
            case CATEGORIE_LIST_FAIL:
                return {loading:false,error:action.payload}
            default:
                return state
        }
}


export const CategorieproductsReducers = (state={products:[]},action)=>{
    switch(action.type){
        case CATEGORIE_PRODUCTS_REQUEST:
            return {loading:true,products:[]}

        case CATEGORIE_PRODUCTS_SUCCESS:
            return {loading:false,products:action.payload}
        
        case CATEGORIE_PRODUCTS_SUCCESS:
            return {loading:false,error:action.payload}
        
        default:
            return state
    }
}