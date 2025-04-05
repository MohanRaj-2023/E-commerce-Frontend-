import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap'
import { Link, useNavigate,useLocation } from 'react-router'
import Message from '../Message'
import { useDispatch, useSelector } from 'react-redux'
import { Usersignin } from '../../Actions/Useractions'
import Loader from '../Loader'


export const Signinscreen = () => {
  const [username,setusername] = useState('')
  const [password,setpassword] =useState('')
  const [show,setshow] = useState(false)
  const [message,setMessage] = useState('')
  const location = useLocation()
  const redirect = location.search?location.search.split("=")[1]:"/"
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const UserSignin = useSelector((state)=>state.UserSignin)
  const {error,loading,userinfo} = UserSignin

  useEffect(()=>{
    if (userinfo && userinfo.username){
      navigate("/")
      console.log("USERINFO---------:",userinfo)
    }
  },[userinfo,redirect])

  const FormHandler = ()=>{
       dispatch(Usersignin(username,password))
       console.log("USERINFO:",userinfo)
       //navigate("/")
      //  setMessage("Signin Successfull.")
  }

  const Showpassword = ()=>{
    setshow((prevshow)=>!prevshow);
  }

  return (
    <>
    <Container className='mt-5'>
          <Row>
            <Col md={4} ></Col>
            <Col md={4} >
                <Card>
                  <Card.Header className='text-center bg-dark text-light'>
                    <h3>Signin</h3>
                  </Card.Header>
                  {
                    loading ? (<Loader/>):
                    <>
                    {message && <Message variant="danger" message={message} />}
                    {error && <Message variant="danger" message={error} />}
                    
                    <Card.Body>
                    <Form onSubmit={FormHandler}>
                      <Form.Group className='mb-3' controlId='username' >
                        <Form.Label> <span><i className='fa fa-user'></i></span> Username</Form.Label>
                        <Form.Control type='email' placeholder='Enter your Username' value={username} onChange={(event)=>setusername(event.target.value)} required></Form.Control>
                      </Form.Group>

                      
                      <Form.Group className='mb-3' controlId='password' >
                        <Form.Label> <span><i className={show?'fa fa-eye':'fa fa-eye-slash'}></i></span> password</Form.Label>
                        <InputGroup>
                        <Form.Control type={show?'text':'password'} placeholder='Enter your password' value={password}  onChange={(event)=>setpassword(event.target.value)} required ></Form.Control>
                        </InputGroup>
                        <Form.Check
                        type='checkbox' label='show password'className='mt-2' onClick={Showpassword} ></Form.Check>

                      </Form.Group>
                      <div className='d-grid'>
                          <Button className='btn btn-success btn-md' type='submit'>Signin</Button>
                      </div>
                    </Form>

                    <Row className='mt-3'>
                      <Col>
                       Not have an account? <Link to='/signup'>Signup</Link>
                      </Col>
                    </Row>
                  </Card.Body>
                    
                    </>
                  }
                  
                </Card>
            </Col>
            <Col md={4} ></Col>
          </Row>
    </Container>
    </>
  )
}

export default Signinscreen