import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {Card,Button} from 'react-bootstrap'
import Rating from './Rating'
import { useLocation } from 'react-router-dom'


function Product({product}) {
  const [showmore,Setshowmore] = useState(false)
  const max_len = 40
  const [showname,Setshowname] = useState(false)
  const name_len = 10
  const location = useLocation()

  const backendBaseURL = import.meta.env.VITE_API_BASE_URL;

  return (
    
    <Card className='my-3 p-3 rounded' >
        <Link to={`/product/${product.id}`} state={{from:location.pathname}} >
        {product.image?(
            <Card.Img src={ product.image.startsWith("http")? product.image : `${backendBaseURL}${product.image}`} alt='image' className='img-fluid' style={{height:"200px",width:"100%",objectFit:"cover",borderRadius:"10px"}} variant='top'  ></Card.Img>
        ):<Card.Img alt='image'   ></Card.Img>}
         
        </Link>
        <Card.Body>
            <Link to={`/product/${product.id}`} as='h3' className='text-dark text-decoration-none' >
             <Card.Title>{showname? product.productname : `${product.productname.substring(0,name_len)}...`}</Card.Title> 
            </Link>
            <Card.Text className="my-3" as="div" >
                {product.rating} from {product.numreviews} Reviews
             </Card.Text>
             <Card.Text as='h5' >
                {product.selling_price} ₹
             </Card.Text>
             <Card.Text>
                <Rating  
                  value = {product.rating}
                  color = {"#f8e825"}  /> 
             </Card.Text>
             
             <Card.Text>
             <Link  className='text-decoration-none text-dark' to={`/product/${product.id}`}>
              {showmore? product.productinfo : `${product.productinfo.substring(0,max_len)}...`}
              </Link>
             </Card.Text>
             
             
        </Card.Body>
    </Card>
  )
}

export default Product