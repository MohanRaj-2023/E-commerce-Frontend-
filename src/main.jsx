import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import store from './Store'
import { Provider } from 'react-redux'

// import './index.css'
// import App from './App.jsx'

//Bootstrap
// import './bootstrap.min.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

//Screens
import Homescreen from './components/screens/Homescreen'
import Signupscreen from './components/screens/Signupscreen'
import Signinscreen from './components/screens/Signinscreen'
import Logoutscreen from './components/screens/Logoutscreen'
import { Header_nav } from './components/Header_nav'
//import Product from './components/Product';
import ProductScreen from './components/screens/ProductScreen';
import Cartscreen from './components/screens/Cartscreen'
import Categoriescreen from './components/screens/Categoriescreen'
import Categorieproductscreen from './components/screens/Categorieproductscreen'
import Searchproductscreen from './components/screens/Searchproductscreen'

//Filter-Context
import { FilterProvider } from './components/FilterContext'
import Footer from './components/Footer'

//import css
import './App.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <FilterProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100">
          <Header_nav />
          <div className="main-content">
          <Routes>  {/* ✅ Wrap all routes inside a single <Routes> */}
            <Route path="/" element={<Homescreen />} />
            <Route path="/product/:_id" element={<ProductScreen />} />
            <Route path="/cart/:_id" element={<Cartscreen />} />
            <Route path="/cart" element={<Cartscreen />} />
            <Route path="/signup" element={<Signupscreen />} />
            <Route path="/signin" element={<Signinscreen />} />
            <Route path="/logout" element={<Logoutscreen />} />
            <Route path="/categorey" element={<Categoriescreen />} />
            <Route path="/categorie/:categoriename" element={<Categorieproductscreen />} />
            <Route path="/search" element={<Searchproductscreen />} />
          </Routes>  
          </div>
          <Footer/>
          </div>

          
        </Router>
        
      </FilterProvider>
    </Provider>

  </StrictMode>,
)
