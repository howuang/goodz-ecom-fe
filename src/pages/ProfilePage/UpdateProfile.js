import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import PublicFooter from '../../components/PublicFooter';
import PublicNavbar from '../../components/PublicNavbar'
import userActions from '../../redux/actions/user.action';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

export const UpdateProfile = () => {
        const [dataForm, setDataForm] = useState({
            name: "",
            email: "",
            password: "",
            avatar: ""
        });
    const {name, email, password, avatar } = dataForm;

    const navigate = useNavigate();
    
    const handleOnChange = (e) => {
         setDataForm({ ...dataForm, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userActions.updateCurrentUser({ name, email, password, avatar }));
    }
    
    const dispatch = useDispatch();
    return (
        <div>
            <PublicNavbar />
            <ToastContainer autoClose={2000} />
            <Container style={{marginTop: "5rem"}}>
                <Row>
                    <Col>
                        <Card style={{width: "300px", height: "500px"}}>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <h2>Update Profile</h2>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Name" name="name" value={name} onChange={handleOnChange}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={handleOnChange}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={handleOnChange}/>
                                    </Form.Group>
                                    <Form.Group controlId="formFile" className="mb-3" >
                                        <Form.Label>Profile Image</Form.Label>
                                        <Form.Control type="file" name="avatar" value={avatar} onChange={handleOnChange}/>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <PublicFooter />
        </div>
    )
}
