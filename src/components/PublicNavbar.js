import Button from '@restart/ui/esm/Button'
import React, { useEffect, useState } from 'react'
import { Collapse, Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
import authAction from '../redux/actions/auth.action';
import cartActions from '../redux/actions/cart.action';
import userActions from '../redux/actions/user.action';
import productAction from '../redux/actions/product.action';

const PublicNavbar = () => {
    const [open, setOpen] = useState(false);
    const [currentUser, setCurrenUser] = useState({});
    const [cart, setCart] = useState([]);
    const [query, setQuery] = useState("");
    const [pageNum, setPageNum] = useState(1);
    const limit = 12;

    const dispatch = useDispatch();
    const navigate = useNavigate();

     const handleSearchChange = (e) => {
        e.preventDefault();
        setQuery(e.target.value);
    }

    const user = useSelector(state => state.users.currentUser);
    const handleLogOut = (e) => {
        dispatch(authAction.logout(e));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(productAction.getAllProducts({ pageNum, limit, query }));
        navigate("/products");
    }

    useEffect(() => {
        dispatch(userActions.getCurrentUser(currentUser))
    }, [currentUser])

    useEffect(() => {
        dispatch(cartActions.getCart(cart))
    },[cart])

    return (
        <div>
            <Navbar className="bg.transparent" expand="lg">
                <Container fluid>                    
                    <Navbar.Brand as={NavLink} to="/" >GOODZ</Navbar.Brand>                    
                    <Navbar.Toggle aria-controls="navbarScroll" />                   
                    <Navbar.Collapse id="navbarScroll">                        
                        <Nav                          
                            className="me-auto my-2 my-lg-0"                           
                            style={{ maxHeight: '100px' }}                            
                            navbarScroll                          
                        >                        
                            <Nav.Link as={NavLink} to="/products">Shop</Nav.Link> 
                        </Nav>
                        <Nav
                            onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                            style={{cursor: 'pointer'}}
                        >
                            Search
                        </Nav>
                        <Collapse in={open}>
                            <div>
                                <Form onSubmit={handleSubmit} className="d-flex" style={{paddingLeft: "10px", display: "flex", alignItems: "center"}}>
                                    <FormControl
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                        onChange={handleSearchChange}
                                    />
                                    <Button style={{background: "transparent", border: "none"}}><i className="fas fa-search"></i></Button>
                                </Form>
                            </div>
                        </Collapse>
                    </Navbar.Collapse>
                    {!user._id && (
                        <Nav.Link as={NavLink} to="/login">Log in</Nav.Link>                   
                    )}
                    {user._id && (
                        <NavDropdown title={user.name} id="navbarScrollingDropdown">
                            <NavDropdown.Item as={NavLink} to="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item>Settings</NavDropdown.Item>
                            <NavDropdown.Item>Help</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogOut}>Log out</NavDropdown.Item>
                        </NavDropdown>
                    )}
                    <Nav.Link as={NavLink} to="/cart">Cart</Nav.Link>                   
                </Container>
            </Navbar>
        </div>
    )
}

export default PublicNavbar
