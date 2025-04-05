import React,{useState,useEffect}  from 'react'
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap'
import { Link, useLocation } from 'react-router'
import {validPassword} from '../Regex'
import { useDispatch, useSelector } from 'react-redux'
import { Usersignup } from '../../Actions/Useractions'
import { useNavigate } from "react-router-dom";
import Loader from '../Loader'
import Message from '../Message'

export const Signupscreen = () => {
  const [fname,setfname] = useState('')
  const [lname,setlname] = useState('')
  const [email,setemail] = useState('')
  const [password,setpassword] = useState('')
  const [conpassword,setconpassword] = useState('')
  var [message,setMessage] = useState('')
  const [showpassword,setshowpassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const redirect = location.search?location.search.split("=")[1]:"/"
    
  const UserSignup = useSelector((state)=> state.UserSignup)
  var {error,loading,userinfo} = UserSignup
  
  useEffect(()=>{
   if(userinfo){
     setMessage(userinfo.details)
     setemail("")
     setfname("")
     setlname("")
     setpassword("")
     setconpassword("")
   }
  },[userinfo,redirect])

  const FormHandler=(event)=>{
      event.preventDefault()
      if(password != conpassword){
        setMessage('Password does not match')
      }
      else if(!validPassword.test(password)){
        setMessage('Enter a valid password')
      }
      else{
        dispatch(Usersignup(fname,lname,email,password))
        // console.log('Dispatching Usersignup action...') 
        setMessage('Signup Successfull')
        // // navigate("/signin")
        
      }
  }

  const Showpassword = ()=>{
    setshowpassword((prevState)=>!prevState)
  }
  
  return (
    <>
      <Container className='mt-5'>
        <Row>
          <Col md={4}></Col>
          <Col md={4} >
          <Card className='mb-4'>
            <Card.Header className='bg-dark text-white text-center'>
              <h3>Signup</h3>
            </Card.Header>  
                {
                  loading?(<Loader/>):
                  <>        
                <Card.Body>
                {message && <Message variant="danger" message={message} />}
                {error && <Message variant="danger" message={error} />}
                
                  <Form onSubmit={FormHandler}>
                <Form.Group className='mb-3' controlId='firstname'>
                  <Form.Label><span><i className='fa fa-user'></i></span> First Name</Form.Label>
                  <Form.Control type='text' placeholder='Enter your first name' value={fname} onChange={event=>setfname(event.target.value)} required></Form.Control>
                </Form.Group>

                <Form.Group className='mb-3' controlId='lasttname'>
                  <Form.Label><span><i className='fa fa-user'></i></span> Last Name</Form.Label>
                  <Form.Control type='text' placeholder='Enter your last name' value={lname} onChange={event=>setlname(event.target.value)} required></Form.Control>
                </Form.Group>

                <Form.Group className='mb-3' controlId='email'>
                  <Form.Label><span><i className='fa-solid fa-envelope'></i></span> Email</Form.Label>
                  <Form.Control type='email' placeholder='you@gmail.com' value={email} onChange={event=>setemail(event.target.value)} required></Form.Control>
                </Form.Group>


                <Form.Group className='mb-3'controlId='pass1'>
                  <Form.Label><span><i className={showpassword?'fa fa-eye':'fa fa-eye-slash'}></i></span> Password</Form.Label>      
                  <InputGroup>
                      <Form.Control  type={showpassword?'text':'password'} placeholder='Enter your password' value={password} onChange={e=>setpassword(e.target.value)} required/>    
                  </InputGroup>
                  <Form.Check type='checkbox' label='Show Password' onClick={Showpassword} ></Form.Check>
                  <Form.Text>Password must contain aleast 8 characters [a-z] [0-9]</Form.Text>
                </Form.Group>


                <Form.Group className='mb-4'controlId='pass2'>
                  <Form.Label><span><i className={showpassword?'fa fa-eye':'fa fa-eye-slash'}></i></span> Confirm Password</Form.Label>
                  <InputGroup>
                    <Form.Control type={showpassword?'text':'password'} placeholder='Enter your password' value={conpassword} onChange={event=>setconpassword(event.target.value)} required/>         
                  </InputGroup>
                  <Form.Check type='checkbox' label='Show Password' onClick={Showpassword} ></Form.Check>   
                </Form.Group>

                <div className='d-grid mb-2'>
                  <Button className="btn-md btn-success" type='submit'>Signup</Button>
                </div>

              </Form>

              <Row className='py-3'>
                <Col>
                  Already have an account? <Link to='/signin'>Signin</Link>
                </Col>
              </Row>

                </Card.Body>
          

                  </>

                }
            </Card>
                
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </>
  )
}

export default Signupscreen