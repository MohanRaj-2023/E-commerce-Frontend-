import { ADD_TO_CART,REMOVE_FROM_CART } from "../Constants/Cartconstants";


export const cartreducers = (state={ cartitems: [] },action)=>{
    switch(action.type){
        case ADD_TO_CART:
            const item = action.payload 
            const existingitem = state.cartitems.find(x=>x.product_id === item.product_id)
           
            let updated_cart
            if (existingitem){

                updated_cart = state.cartitems.map(x=> 
                x.product_id === existingitem.product_id? item:x)
                                   
                
            }else{
                updated_cart= [...state.cartitems,item]
                
            }

            return {...state, cartitems: updated_cart}

        case REMOVE_FROM_CART:
                console.log("Reducer Removing ID:", action.payload);
                const filtered_cart = state.cartitems.filter(x=>x.product_id !== action.payload)

                return{...state,cartitems: filtered_cart}
                
        default:
            return state
    }
    
}