import axios from "axios";
import api from '../Api/axios'

import { ADD_TO_CART, REMOVE_FROM_CART } from "../Constants/Cartconstants";


export const addtocart = (_id, qty) => async (dispatch, getState) => {
    // console.log("CART_STATE:..............",getState().Cart)
    // console.log("CARTITEMS_STATE:..............",getState().Cart.cartitems)
    const { data } = await api.get(`/api/product/${_id}/`)
      console.log("API Response Data:", data);
       const item={
            product_id: data.id,
            productname: data.productname,
            image: data.image,
            productinfo: data.productinfo,
            price: data.selling_price,
            stockcount: data.stockcount,
            quantity: qty
        }
        dispatch({
            type:ADD_TO_CART,
            payload:item
        })
   const update_cart = getState().Cart.cartitems
   localStorage.setItem("cartitems",JSON.stringify(update_cart))
}

export const removefromcart = (_id) =>(dispatch,getState)=>{
    console.log("Removing item with ID:", _id);
    dispatch({
        type:REMOVE_FROM_CART,
        payload:_id
    })
    // localStorage.removeItem("cartitems")
    const remove_cart = getState().Cart.cartitems
    localStorage.setItem("cartitems",JSON.stringify(remove_cart))
}