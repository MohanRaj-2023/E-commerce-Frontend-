import React, { useEffect, useState } from 'react'
import { Container, Row,Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { categoriesaction } from '../../Actions/Categorieactions'
import Categorie from '../Categorie'
import Loader from '../Loader'
import Message from '../Message'

const Categoriescreen = () => {
  const dispatch = useDispatch()
  const Categories = useSelector((state) => state.Categories)
  const { error, loading, categories } = Categories
  

  useEffect(() => {
    dispatch(categoriesaction())
  }, [dispatch])

  return (
    <>
      <Container>
        <Row>
          <Col className='text-dark m-3'>
            <h3>Categoryes:</h3>
          </Col>
        </Row>
        {
          loading ? (
            <Loader />
          ) :
            error ? (
              <Message variant="danger" message={error} />
            ) : (
              <Row>
                {(categories || []).map((categorie) => (
                  <Col md={4} key={categorie.id}>
                    <Categorie categorie={categorie} />
                  </Col>
                ))}

              </Row>
            )
        }

      </Container>
    </>
  )
}

export default Categoriescreen