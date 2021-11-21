import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import authAction from "../../redux/actions/auth.action";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RegisterPage.css"


const RegisterPage = () => {
  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = dataForm;
  const handleOnChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authAction.register({ name, email, password }));
  };

  return (
      <div className="register">
          <ToastContainer autoClose={2000} />
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: "white"}}>
              <h1>GOODZ</h1>
          </div>
          <div className="register-form">
              <h2>Create an account</h2>
              <small>Already have an account? <span><Link to="/login">Sign in</Link></span></small>
              <br />
              <div>
                  <h5>Sign up with social</h5>
              <div>
                  <ul style={{ listStyle: "none", display: "flex", fontSize: "2rem", justifyContent: "center" }}>
                      <li><a><i className="fab fa-google"></i></a></li>
                      <li><a><i className="fab fa-facebook"></i></a></li>
                  </ul>
              </div>
              </div>
              <hr></hr>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName" style={{textAlign: "left"}}>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail" style={{textAlign: "left"}}>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword" style={{textAlign: "left"}}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={handleOnChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
          </div>
          
    </div>
  );
};

export default RegisterPage;