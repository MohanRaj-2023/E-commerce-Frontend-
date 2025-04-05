import { Container, Row, Col } from 'react-bootstrap'
import { useEffect } from 'react'
import Product from '../Product'
import { listProducts } from '../../Actions/Productaction'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import Message from '../Message'


export const Homescreen = () => {
  const dispatch = useDispatch()


  const ProductsList = useSelector((state) => state.ProductsList)
  const { error, loading, products } = ProductsList
  


  useEffect(() => {
    dispatch(listProducts());

  },[dispatch])

// console.log('Products:',ProductsList)
// console.log('Redux State:', { loading, error, products });

return (

  <Container>
    <br />
    <h1>Products:</h1>
    {
      loading ?(
        <Loader/>
      ):error?(
        <Message variant='danger' message={error} />
      ):(
        <Row>
        {(
            (products || []).map((product) => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3} >
                <Product product={product} />
              </Col>
            ))
        ) }
      </Row>
      )}
    
  </Container>
)
}
export default Homescreen