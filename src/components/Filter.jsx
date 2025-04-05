import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Card, ListGroup, ListGroupItem, Form, InputGroup } from 'react-bootstrap'
import { useEffect } from 'react'
import { Searchaction } from '../Actions/Searchactions'

//usefilter
import { useFilter } from './FilterContext'



const Filter = ({ products }) => {
  //Filter
  const { filters, updatefilter } = useFilter();

  const [min_price, setmin_price] = useState(0)
  const [max_price, setmax_price] = useState(0)
  const [price, setPrice] = useState(0)


  const allProducts = products.length > 0 ? products : []

  console.log("Allproducts:", allProducts)



  const updatePricerange = (Products) => {
    if (Products.length > 0) {
      const prices = Products.map((p) => Number(p.selling_price))
      const minP = Math.min(...prices)
      const maxP = Math.max(...prices)
      setmin_price(minP)
      setmax_price(maxP)
      setPrice(maxP)
      console.log("minP:", minP)
      console.log("maxP:", maxP)
    } else {
      setmin_price(0)
      setmax_price(0)
      setPrice(0)
    }

  }

  //get price if the categorie is not selected
  
  useEffect(()=>{
    updatePricerange(allProducts)
  },[allProducts])

  useEffect(() => {
    if(!filters.price && min_price!==max_price){
      updatefilter("price",min_price)
    }
    
  }, [min_price,max_price,allProducts,filters.price])

  const handlePricechange = (newprice)=>{
    setPrice(newprice)
    updatefilter("price",newprice)
  }
  //rating filter
  const [rating, setrating] = useState(0)


  console.log("Filters:", filters)

  //Gender filter

  const genderselectHandler = (event) => {
    const { value, checked } = event.target;
    updatefilter("gender", value)
  };

  //Detect Avilable Filters
  const hashGender = products.some(product=>product.gender!==undefined && product.gender!==null)
  const hashSize = products.some(product=>product.variant.some(v=>v.size!==null))
  const hashColor = products.some(product=>product.variant.some(v=>v.color!==null))
  console.log("SIZE----:",hashSize)
  console.log("GENDER----:",hashGender)

  //Get Size
  const sizes = hashSize ? [...new Set(products.flatMap(product => product.variant.map(v => v.size).filter(size=>size!==null)))] : []
  console.log("SIZE:", sizes)

  //Get Color
  const colors = hashColor ? [...new Set(products.flatMap(product => product.variant.map((v) => v.color).filter(color=>color!==null)))] : []
  console.log("COLORS:", colors)
  return (
    <>
      <Row className='mt-4'>
        <Col>
          <Card>
            <Card.Header className='mb-4'> <b>FILTERS:</b></Card.Header>
            <ListGroup className='mb-4' variant='flush' >
              <ListGroup.Item active>
                Price
              </ListGroup.Item>
              <ListGroupItem >
                <Form.Range 
                min={min_price} 
                max={max_price} 
                step={price < 1000 ? 10 : price < 10000 ? 100 : 500} 
                value={filters.price || price}  
                onChange={(e) => handlePricechange(Number(e.target.value))} 
                disabled={min_price === max_price} />
              </ListGroupItem>

              <ListGroupItem>
                <InputGroup>
                  <InputGroup.Text>Price</InputGroup.Text>
                  <Form.Control value={price} type='Number' onChange={(event) => handlePricechange(Number(event.target.value))}></Form.Control>
                </InputGroup>
              </ListGroupItem>

            </ListGroup>

            {/* Rating Filter */}

            <ListGroup className='mb-4' variant='flush'>
              <ListGroupItem active>Rating</ListGroupItem>
              <ListGroupItem>
                <Form.Select value={filters.rating || " "} onChange={(event) => updatefilter("rating", event.target.value)} >
                  <option value=" ">Select the rating range</option>
                  <option value="3.5">Above 3.5</option>
                  <option value="4">Above 4</option>
                  <option vallue="4.5">Above4.5</option>
                </Form.Select>
              </ListGroupItem>
            </ListGroup>

            {/* Trending Filter */}
            <ListGroup variant='flush' className='mb-4'>
              <ListGroupItem active>Trending</ListGroupItem>
              <ListGroupItem>
                <Form.Check type='checkbox' label="Trending" checked={filters.trending} onChange={(event) => updatefilter("trending", event.target.checked)} ></Form.Check>
              </ListGroupItem>
            </ListGroup>

            {/* Gender filter */}
            {hashGender && (
                <ListGroup variant='flush' className='mb-4'>
                <ListGroupItem active>Gender</ListGroupItem>
                <ListGroupItem>
                  {["boy", "girl", "men", "women", "unisex"].map((gender) => (
                    <Form.Check
                      key={gender}
                      type='checkbox'
                      label={gender}
                      value={gender.toLowerCase()}
                      checked={filters.gender.includes(gender.toLowerCase())}
                      onChange={genderselectHandler}>
                    </Form.Check>
                  ))}
                </ListGroupItem>
              </ListGroup>
            )}
            

            {/* Size filter */}
            { hashSize && (
                  <ListGroup variant='flush' className='mb-4'>
                  <ListGroupItem active>Size</ListGroupItem>
                  <ListGroupItem>
                    {sizes.map((size) => (
                      <Form.Check
                        key={size}
                        type='checkbox'
                        label={size}
                        checked={filters.size.includes(String(size))}
                        onChange={() => updatefilter("size", String(size))}></Form.Check>
                    ))}
                  </ListGroupItem>
                </ListGroup>
            )}
            

            {/* Color Filter */}
            {
              hashColor && (
                <ListGroup variant='flush' className='mb-4'>
                <ListGroupItem active>Color</ListGroupItem>
                <ListGroupItem>
                  {colors.map((color) => (
                    <Form.Check 
                      key={color}
                      type='checkbox'
                      checked={filters.color.includes(color)}
                      onChange={()=>updatefilter("color",color)}
                      label={
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div
                            style={{
                              backgroundColor: color,
                              height: "20px",
                              width: "20px",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                              margin: "0px"
                            }}>
  
                          </div>
                          {color}
                        </div>
  
                      }>
  
  
                    </Form.Check>
                  ))}
                </ListGroupItem>
              </ListGroup>
  
              )
            }
            
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Filter