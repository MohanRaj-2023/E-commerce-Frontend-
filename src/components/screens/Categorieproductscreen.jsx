import React from 'react'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CategorieproductAction } from '../../Actions/Categorieactions'
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router'
import Product from '../Product'
import Loader from '../Loader'
import Message from '../Message'
import Filter from '../Filter'

//Filter
import { useFilter } from '../FilterContext'

const Categorieproductscreen = () => {
  const { categoriename } = useParams()
  

  const dispatch = useDispatch()
  const CategorieProducts = useSelector((state) => state.CategorieProducts)
  const { error, loading, products } = CategorieProducts

  useEffect(() => {
    if (categoriename){
      dispatch(CategorieproductAction(categoriename))
      
      updatefilter("price"," ")
      updatefilter("rating"," ")
      updatefilter("trending",false)
    }
    
  }, [dispatch, categoriename])
  
  console.log("updated_products:",products)
  //filter
  const {filters,updatefilter} = useFilter()

  useEffect(()=>{
    const maxprice = Math.max(...products.map((p)=>p.selling_price?p.selling_price:0))
    updatefilter("price",maxprice)
  },[products])

  console.log("updated_filters:",filters)
  
  const hashFilter = filters.price!==undefined || filters.rating!==undefined

  const filterdproducts =
      hashFilter ? 
      products.filter((product)=>
      (!filters.price || product.selling_price<=filters.price) &&
      (!filters.rating || product.rating>=filters.rating)  &&
      (filters.gender.length===0 || filters.gender.includes(product.gender.toLowerCase().trim())) &&
      (filters.size.length===0|| product.variant.some(variant=>filters.size.includes(String(variant.size)))) &&
      (!filters.trending ||  product.trending===true) &&
      (filters.color.length===0 || product.variant.some(variant=>filters.color.includes(String(variant.color))))
      ) : products || [];

    console.log("filterd_product:",filterdproducts)


  return (
    <>
      <Container fluid>
        <Row>
          <Col md={3}>
            <Filter products={products} />
          </Col>

          <Col md={9}>
            {loading ?
              (<Loader />) :
              error ?
                (<Message variant='danger' message={error} />) :
              filterdproducts.length>0?
                (
                  <Row>
                    {filterdproducts.map((product)=>(
                       <Col key={product.id} md={4} >
                       <Product product={product} />
                      </Col>
                    ))}
                  </Row>
                ):
                (<Message variant="danger" message="No products found..." />)}
          </Col>
        </Row>


      </Container>
    </>
  )
}

export default Categorieproductscreen