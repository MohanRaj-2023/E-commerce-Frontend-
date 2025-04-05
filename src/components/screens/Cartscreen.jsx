import React, {useEffect } from "react";
import { useParams, useLocation, Link } from 'react-router'
import {  Container, Row, Col, ListGroup, Button, Form,Image } from 'react-bootstrap'
import { addtocart, removefromcart } from "../../Actions/Cartactions";
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message'

export const Cartscreen = () => {
    const { _id } = useParams()
    const location = useLocation()
    const dispatch = useDispatch()
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const Cart = useSelector((state) => state.Cart)
    const { cartitems } = Cart
    

    // console.log("ID:", _id)
    // console.log("Qty:", qty)
    
    console.log("Cart Items in Redux:", cartitems);

    useEffect(() => {
        if (_id ) {
            const existingitem  = cartitems.find(item => item.product_id === _id);
            if (!existingitem){
                dispatch(addtocart(_id, qty))
            }
            
        }
    },[_id,qty,dispatch])


    const removefromcartHandler = (_id) => {
        dispatch(removefromcart(_id))
    }

    const backendBaseURL = import.meta.env.VITE_API_BASE_URL;
    return (
        <>
            <Container>
                <Row className="m-3">
                    <Col className="text-dark">
                    <h4>Cart Items:</h4>
                    </Col>
                </Row>
                {cartitems.length == 0  ? (
                    <Message variant={"dark"} message=" Your cart is empty" > 
                     
                    </Message>
                ) :
                (<ListGroup className="bg-secondary" >
                    {cartitems?.map(item=>(
                            <ListGroup.Item key={item.product_id} className="m-2" >
                                           <Row> 
                                            <Col md={3} className="d-flex text-lg-start align-items-center justify-content-center" >
                                            <Image src={`${backendBaseURL}${item.image}`} 
                                            style={{Width:"100%", height:"200px", objectFit:"cover", borderRadius:"10px"}}  
                                            className="img-fluid" alt='productimage' />
                                            </Col>

                                            <Col md={2} className="mt-4 d-flex text-center text-lg-start justify-content-center" >
                                            <Link to={`/product/${item.product_id}`} state={{from:location.pathname}} className="text-dark text-decoration-none bold"><b>{item.productname}</b></Link>
                                            </Col>
                                            <Col md={2} className="mt-4">
                                             <b>{item.price?Math.round(item.price)*item.quantity:0} ₹</b>
                                            </Col>
                                            <Col md={1} className="mt-2">
                                              <Form.Control as="select" value={item.quantity} className="text-center"
                                              onChange={(event)=>dispatch(addtocart(item.product_id,Number(event.target.value)))} >
                                                {
                                                    [...Array(item.quantity).keys()].map((x)=>(
                                                        <option key={x+1} value={x+1} >
                                                            {x+1}
                                                        </option>
                                                    ))
                                                }
                                              </Form.Control>
                                            </Col>
                                            <Col md={2} className="m-2 d-flext justify-content-end align-items-end text-end">
                                            <Button type="button" onClick={()=>removefromcartHandler(item.product_id)} ><span> <i className="fa fa-trash" ></i> </span></Button>
                                            </Col>
                                           </Row>
                            </ListGroup.Item>
                    ))}
                    
                </ListGroup>)
                  

                }


            </Container>
        </>
    )


}


export default Cartscreen