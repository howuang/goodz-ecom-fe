import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import authAction from '../../redux/actions/auth.action';
import "./LoginPage.css"

const LoginPage = () => {
    const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
    });
  
    const navigate = useNavigate();
  
  const { email, password } = dataForm;
  const handleOnChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };
  
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
      dispatch(authAction.login({ email, password }));
      navigate('/')
  };
    
    const loginWithGoogle = (e) => {
        e.preventDefault();
        dispatch(authAction.loginWithGoogle())
  }

  return (
      <div className="login">
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: "white"}}>
              <h1>GOODZ</h1>
          </div>
          <div className="login-form">
              <h2>Sign in</h2>
              <small>New User? <span><Link as={NavLink} to="/register">Create an account</Link></span></small>
              <br /><br />
              <hr></hr>
          <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail" style={{textAlign: "left"}}>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={email}
                      onChange={handleOnChange}
                  />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword" style={{textAlign: "left"}}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={handleOnChange}
                  />
                  </Form.Group>
              <Button variant="primary" type="submit">Submit</Button>
          </Form> 
          <div style={{ width: "100%", display: 'flex', justifyContent: "center", marginTop: "2rem" }}>
                 <ul style={{ listStyle: "none", display: "flex", fontSize: "2rem", justifyContent: "center" }}>
                      <li><a href="https://ecombe-hoang.herokuapp.com/api/users/loginwithgoogle"><i className="fab fa-google"></i></a></li>
                      <li><a href="https://ecombe-hoang.herokuapp.com/api/users/loginwithfacebook"><i className="fab fa-facebook"></i></a></li>
                  </ul>
          </div>
          </div>
          
      </div>
  );
}

export default LoginPage
