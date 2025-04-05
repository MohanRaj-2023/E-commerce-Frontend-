import {createStore,combineReducers,applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from "@redux-devtools/extension";
import { ProductDetailsReducers, ProductsListReducers } from './Reducers/Productreducers';
import { UserSignupReducers,UserSigninReducers } from './Reducers/Userreducers';
import { cartreducers } from './Reducers/Cartreducers';
import { CategorieproductsReducers, CategorieReducer } from './Reducers/Categoriereducers';
import { SearchReducers } from './Reducers/Searchreducers';


///////////

import storage from "redux-persist/lib/storage/index.js";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";


const reducer = combineReducers({
    ProductsList:ProductsListReducers,
    ProductDetails : ProductDetailsReducers,
    UserSignup : UserSignupReducers,
    UserSignin : UserSigninReducers,
    Cart : cartreducers,
    Categories : CategorieReducer,
    CategorieProducts : CategorieproductsReducers,
    Search : SearchReducers,
});

function getcartitems(){
 try{
    const cartitems = localStorage.getItem('cartitems')
    return cartitems ? JSON.parse(cartitems):[]
 }catch(error){
    console.error("Error parsing cartitems from localStorage:", error);
    return []
 }
  
}

const initialState = {
    UserSignin: {
        userinfo: localStorage.getItem("userinfo") 
            ? JSON.parse(localStorage.getItem("userinfo")) 
            : null
    },
    Cart:{
        cartitems: getcartitems()
    }

};

const persistConfig = {
    key: "root",
    storage, // Stores Redux state in localStorage
    whitelist: ["Search"], // Persist only the search state
  };


// 🟢 Wrap SearchReducers with persistReducer
const persistedSearchReducer = persistReducer(persistConfig, SearchReducers);


//const initialState = {}
const middleweare = [thunk]
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleweare)))


// 🟢 Create persistor
export const persistor = persistStore(store);

export default store;
