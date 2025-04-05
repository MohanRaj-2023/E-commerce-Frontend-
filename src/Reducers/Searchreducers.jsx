import { SEARCH_REQUEST,SEARCH_SUCCESS,SEARCH_FAIL } from "../Constants/Searchconstants";



export const SearchReducers = (state={products:[]},action)=>{
    switch(action.type){
        case SEARCH_REQUEST:
            return {loading:true,products:[]}
        case SEARCH_SUCCESS:
            return {loading:false,products:action.payload}
        case SEARCH_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}