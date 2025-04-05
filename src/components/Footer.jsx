import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'
const Footer = () => {
  return (
    <footer className='bg-dark text-light py-3 mt-5 fixed footer'>
        <Container>
            <Row>
                <Col md={4} className='text-center text-md-start'>
                    <h5>About Us</h5>
                    <p>We provide high-quality products at the best prices.</p>
                </Col>

                <Col md={4} className='text-center'>
                    <h5>Quick Link</h5>
                    <ul className='list-unstyled'>
                        <li><a href="/" className='text-decoration-none text-light'>About Us</a></li>
                        <li><a href="/" className='text-decoration-none text-light'>Contact Us</a></li>
                        <li><a href="/" className='text-decoration-none text-light'>FAQ</a></li>
                    </ul>
                </Col>

                <Col md={4} className='text-center text-md-end'>
                    <h5>Follow Us</h5>
                    <a href="/" className='text-light me-3'><i className='fab fa-facebook' ></i></a>
                    <a href="/" className='text-light me-3'><li className='fab fa-twitter'></li></a>
                    <a href="/" className='text-light'><li className='fab fa-instagram'></li> </a>
                </Col>
            </Row>

        </Container>

    </footer>
  )
}

export default Footer