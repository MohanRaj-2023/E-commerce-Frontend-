import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row,Col,Container,Card,ListGroup,ListGroupItem,Form,InputGroup } from 'react-bootstrap'
import Loader from '../Loader'
import Message from '../Message'
import Product from '../Product'
import { useEffect } from 'react'
import Filter from '../Filter'
import { Searchaction } from '../../Actions/Searchactions'

//Filter
import { useFilter } from '../FilterContext'



const Searchproductscreen = () => {
  const dispatch = useDispatch()
  const Search  = useSelector((state)=>state.Search)
  const {error,loading,products} = Search
  console.log("Search_Screen=======:",products)

  // Filter
  const {filters,updatefilter} = useFilter()

  useEffect(()=>{
      const latestsearch = localStorage.getItem("latestsearch")
      console.log("Latest:",latestsearch)
      dispatch(Searchaction(latestsearch))
      updatefilter("rating"," ")
      updatefilter("trending",false)
  },[dispatch,localStorage.getItem("latestsearch")])

  useEffect(()=>{
    if (products.length>0){
      const maxprice = Math.max(...products.map((p)=>p.selling_price?p.selling_price:0));
      updatefilter("price",maxprice)
    }  
  },[products])


  
  //Filterseproducts
  const filterdproducts = products.length>0 ?
  products.filter((product)=>
      (!filters.price || product.selling_price <= filters.price) &&
      (!filters.rating || product.rating >= filters.rating) && 
      (filters.gender.length===0 || filters.gender.includes(product.gender.toLowerCase().trim())) &&
      (filters.size.length===0|| product.variant.some(variant=>filters.size.includes(String(variant.size)))) &&
      (!filters.trending ||  product.trending===true) &&
      (filters.color.length===0 || product.variant.some(variant=>filters.color.includes(String(variant.color))))
  ): products || []

  console.log("filterd_product_Search:",filterdproducts)

  return (
    <>

    
    <Container fluid className='mt-2'>

    <Row >
      <Col md={3} >
        <Filter products={products}/>
      </Col>

      <Col md={9}>

      <h3 style={{margin:"20px 0px 20px"}}>Products:</h3>
      {
            loading?(
                <Loader/>
            ):
            error?(
                <Message variant="danger" message={error}/>
            ):(
                <Row>
                
                    {Array.isArray(filterdproducts) && filterdproducts.length>0?((filterdproducts).map((product)=>(
                            <Col key={product.id} md={4} >
                              <Product product={product} />
                            </Col>
                    ))):
                    <Message variant="danger" message={"No products found for you search..."} />}
                    
                </Row>
            )
        }
    
      </Col>

      
    </Row>


    </Container>
    </>
  )
}

export default Searchproductscreen