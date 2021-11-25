import { Modal } from 'bootstrap';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PublicFooter from '../../components/PublicFooter'
import PublicNavbar from '../../components/PublicNavbar'
import userActions from '../../redux/actions/user.action';

const ProfilePage = () => {
    const [currentUser, setCurrentUser] = useState({});
    const [show, setShow] = useState(false);

     const handleClose = () => setShow(false);

    const dispatch = useDispatch();

    const user = useSelector(state => state.users.currentUser);
    const loading = useSelector(state => state.users.loading)
    
    
    useEffect(() => {
        dispatch(userActions.getCurrentUser(currentUser))
    }, [currentUser]);

    return (
        <div>
            <PublicNavbar />
            <Container style={{marginTop: "5rem"}}>
                <Row>
                    <Col>
                        <Card style={{ width: "300px", height: "550px" }}>
                            <img src={user.avatar}/>
                            {/* {!user.avatar && <Card.Img src="avatar.jpeg/100px270" />}
                            {user.avatar && <Card.Img>{user.avatar}</Card.Img>} */}
                            <Card.Body>
                                <Card.Title>{user.name}</Card.Title>
                                <Card.Text>Email: {user.email}</Card.Text>
                                <Card.Text>Current balance:{user.currentBalance}</Card.Text>
                                <Button style={{ margin: "2rem" }} as={Link} to="/profile/update">Edit Profile</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <PublicFooter />
        </div>
    )
}

export default ProfilePage
