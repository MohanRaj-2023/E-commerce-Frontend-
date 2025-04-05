import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavDropdown, Container, NavbarBrand, NavbarToggle, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Usersignout } from '../Actions/Useractions'
import { Searchaction } from '../Actions/Searchactions'


export const Header_nav = () => {
    const dispatch = useDispatch()

    const UserSignin = useSelector((state) => state.UserSignin)
    const { userinfo } = UserSignin

    //console.log(userinfo.username)
    const SignoutHandler = () => {
        dispatch(Usersignout())
    }

    //Search handling

    const [search, setSearch] = useState("")
    const Search = useSelector((state) => state.Search)
    const { error, loading, products } = Search
    const navigate = useNavigate()

    const SearchHandler = (event) => {
        event.preventDefault();
        dispatch(Searchaction(search))
        localStorage.setItem("latestsearch", search)
        navigate("/search")
    }

    // Handel search bar
    const location = useLocation()

    useEffect(() => {
        setSearch(" ")
    }, [location.pathname])

    return (
        <>
            <Navbar className='bg-body-tertiary' expand='lg'>
                <Container fluid>
                    {/* App Name */}
                    <NavbarBrand>Ecommerce</NavbarBrand>

                    {/* Toggler  */}
                    <NavbarToggle aria-controls='navbar-nav' />

                    {/* Navbar Collapse Content */}
                    <Navbar.Collapse id="navbar">
                        <Nav className="me-auto my-2 my-lg-0" >
                            <Nav.Link as={Link} to='/' className={`nav-link ${location.pathname==='/'?'active':''}`}>Home <span><i className='fa-solid fa-house'></i></span></Nav.Link>
                            <Nav.Link as={Link} to='/cart' className={`nav-link ${location.pathnmae==='/cart'?'active':''}`} >Cart <span><i className='fa-solid fa-cart-shopping'></i></span> </Nav.Link>
                            <Nav.Link as={Link} to='/categorey' className={`nav-link ${location.pathnmae==='/categorey'?'active':''}`}>Categorey</Nav.Link>

                            {/* Navbar dropdown for user */}
                            {
                                userinfo && userinfo.username ? (
                                    <NavDropdown title={<i className='fa-solid fa-user'></i>} >
                                        <NavDropdown.Item as={Link} to="/">
                                            {userinfo.username}
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to='/' onClick={SignoutHandler}>
                                            signout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <NavDropdown title={<i className='fa-solid fa-user'></i>}>
                                        <NavDropdown.Item as={Link} to="/signup">Signup</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/signin">Sigin</NavDropdown.Item>
                                    </NavDropdown>
                                )
                            }
                        </Nav>

                        {/* Search bar */}
                        <Form className='d-flex'>
                            <Form.Control type='search'
                                onKeyDown={(e) => e.key === 'Enter' && SearchHandler(event)}
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                                placeholder='Search'
                                className='me-2' >
                            </Form.Control>
                            <Button variant='outline-success' onClick={SearchHandler}  type='button'>Search</Button>
                        </Form>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
