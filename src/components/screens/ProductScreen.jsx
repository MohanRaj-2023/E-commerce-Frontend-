import React from 'react'
import { useEffect,useState } from 'react'
import {  useLocation, useNavigate, useParams } from 'react-router'
import {Card,Container,Row,Col,ListGroup,ListGroupItem,Button,Form} from 'react-bootstrap'
import Rating from '../Rating'
import { useDispatch, useSelector } from 'react-redux'
import { ProductDetailslist } from '../../Actions/Productaction'
import Loader from '../Loader'
import Message from '../Message'
// import {Cartactions} from '../../Actions/Cartactions'

function ProductScreen() {
  const {_id} = useParams()
  const [qty,setQty] = useState('1')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const ProductDetails = useSelector((state)=> state.ProductDetails)
  const {error,loading,product} = ProductDetails
  console.log(product)
  console.log("Product_Stock:",product?.variant?.[0]?.stockcount)

  useEffect(()=>{
    dispatch(ProductDetailslist(_id))
  },[dispatch,_id])

  

  
  const addtoCartHandler = ()=>{
    navigate(`/cart/${_id}?qty=${qty}`)
  }
  
  const GobackHandler = ()=>{
    if(location.state && location.state.from){
      navigate(location.state.from)
      console.log("Location:",location.state.from)
    }
    else{
      navigate('/')
      console.log("Location:",location.state.from)
    }
  }
  console.log("Location:",location.state.from)

  const backendBaseURL = import.meta.env.VITE_API_BASE_URL;
  return (
    <Container>
      <Button className='btn btn-dark my-5' onClick={GobackHandler} state={{from:location.pathname}} >
        Go Back
      </Button>
      {loading?
      (<Loader/>):error?
      (<Message variant='danger' message={error} />):
      (
        <Row>
        <Col md={4}>
        <Card.Img src={`${backendBaseURL}${product.image}`} style={{height:"200px"}}></Card.Img>
        </Col>
        <Col md={4}>
         <ListGroup>
          <ListGroupItem>
            <h3>{product.productname}</h3>
          </ListGroupItem>
          
          <ListGroupItem>
            Brand: {product.productbrand}
          </ListGroupItem>
          
          <ListGroupItem>
            Ratings:<Rating
            value={product.rating}
            color={"#f8e825"}
            />
          </ListGroupItem>

          <ListGroupItem>
            Category: {product.category}
          </ListGroupItem>

          <ListGroupItem>
            Description: {product.productinfo}
          </ListGroupItem>

         </ListGroup>
        </Col>

        <Col md={4}>
        <ListGroup>
        <ListGroupItem>
            Price: <b>{product.selling_price}</b>  Rs
        </ListGroupItem>

        <ListGroupItem>
            Staus: {product?.variant?.[0]?.stockcount >=1 ? "Instock" : "Out of stock"}
        </ListGroupItem>
        
          {product?.variant?.[0]?.stockcount>0 && (
          <ListGroupItem>
            <Row>
              <Col>Qty</Col>
              <Col xs='auto'>
               <Form.Control as="select"  value={qty}
               onChange={(event)=> setQty(event.target.value)} >
                    {[...Array(product?.variant?.[0].stockcount).keys()].map((x)=>(
                      <option key={x+1} value={x+1}>
                          {x+1}
                      </option>
                    ))}
               </Form.Control>
              </Col>
            </Row>
            </ListGroupItem>
          )}
        
        <ListGroupItem>
            <Button className='btn btn-success btn-block' disabled={product.stockcount==0} onClick={addtoCartHandler} >Aad to cart</Button>
        </ListGroupItem>
        </ListGroup>
        </Col>
      </Row>
      ) }
      
    </Container>
  )
}

export default ProductScreen