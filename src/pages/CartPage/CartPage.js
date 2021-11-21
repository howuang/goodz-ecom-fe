import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import PublicFooter from '../../components/PublicFooter'
import PublicNavbar from '../../components/PublicNavbar'
import cartActions from '../../redux/actions/cart.action'

const CartPage = () => {
    const [cartProductId, setCartProductId] = useState("");
    const [currentCart, setCurrentCart] = useState([]);
    const [productId, setProductId] = useState(false);

    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch();

    const handleClickProduct = (productId) => {
    navigate(`/products/${productId}`);
    };
    
    const cart = useSelector(state => state.carts.cart)
    const cartId = useSelector(state => state.carts.cart[0]?._id)
    const loading = useSelector(state => state.carts.loading)
    
    const removeCart = (product) => {
        const qty = product.qty;
        const productId = product.productId._id
        dispatch(cartActions.deleteCart( cartId, {productId, qty }));
    };


    useEffect(() => {
        dispatch(cartActions.getCart(currentCart))
    }, [currentCart])

    return (
        <div>
            <PublicNavbar/>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h1 className="text-center">Shopping Cart</h1>
                    </Col>
                    {/* <Col>
                        <p>Quanity</p>
                    </Col>
                    <Col>
                        <p>Total</p>
                    </Col> */}
                </Row>
                <Row>
                    <Col>
                        {loading ? (
                            <div className="text-center">
                                <Spinner animation="border" variant="secondary" size={100} loading={true} />
                            </div>
                        ) : (
                                <ul className="list-unstyled d-flex flex-wrap justify-content-between">
                                    {cart[0].products.map((product) => (
                                        <li key={product.productId._id}>
                                            <Card className="d-flex flex-direction-row" 
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    width: "12rem",
                                                    height: "27rem",
                                                    marginBottom: "2rem",
                                                    position: "relative",
                                                }}
                                            >
                                                <Card.Img
                                                    src={product.productId.image}
                                                    onClick={() => handleClickProduct(product.productId._id)} 
                                                />
                                                <Card.Body>
                                                    <Card.Title>{product.productId.name}</Card.Title>
                                                    <Card.Text>$ {product.productId.price}</Card.Text>
                                                    <Card.Text>Quanity: {product.qty}</Card.Text>
                                                    <Button
                                                        className="position-absolute btn-danger"
                                                        style={{ top: "5px", right: "5px" }}
                                                        size="sm"
                                                        onClick={() => removeCart(product)}
                                                    >
                                                        &times;
                                                    </Button>
                                                </Card.Body>
                                            </Card>  
                                        </li>                                 
                                    ))}  
                                </ul>   
                        )}           
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={6}> 
                        <Button style={{ marginBottom: "5rem" }}>Checkout</Button>
                    </Col> 
                </Row>
            </Container>
            <PublicFooter />
        </div>
    )
}

export default CartPage
