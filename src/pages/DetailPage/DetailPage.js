import Button from '@restart/ui/esm/Button';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import PublicFooter from '../../components/PublicFooter';
import PublicNavbar from '../../components/PublicNavbar';
import cartActions from '../../redux/actions/cart.action';
import productAction from '../../redux/actions/product.action';
import userActions from '../../redux/actions/user.action';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

const DetailPage = () => {
    const params = useParams();
    const productId = params.id;
    const [cartProduct, setCartProduct] = useState(false);
    const rating = 5;
    const [review, setReview] = useState("")
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState([]);
    

    
    const handleAddQty = () => {
        setQuantity(quantity + 1)
    };
    
    const handleMinusQty = () => {
        setQuantity(quantity - 1)
    }
    
    const handleReviewInput = (e) => {
        e.preventDefault();
        setReview(e.target.value);
    }
    
    const handleReviewSubmit = () => {
        dispatch(userActions.postReview({ review, productId, rating }));
    };

    const addToCart = (productId) => {
        setCartProduct(productId)
    };
    
    const dispatch = useDispatch();

    const loading = useSelector(state => state.products.loading)
    const product = useSelector(state => state.products.singleProduct)
    const currentCart = useSelector(state => state.carts.cart)
    
    useEffect(() => {
        dispatch(productAction.getDetail({productId}))
    }, [productId])
    
    useEffect(() => {
        dispatch(cartActions.getCart())
    },[])
    
    useEffect(() => {
   if (currentCart && cartProduct) {
     dispatch(cartActions.createCart(cartProduct, quantity))
   }
    }, [cartProduct, quantity])

    useEffect(() => {
        if (currentCart && cartProduct) {
            dispatch(cartActions.addToCart(cartProduct, quantity))
        }
    }, [cartProduct, quantity])

    return (
        <div>
            <PublicNavbar />
            <ToastContainer autoClose={2000} />
            <Container className="container">
                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" variant="secondary" size={100} loading={true} />
                    </div>
                ) : (
                        <Row style={{ display: "flex", justifyContent: "space-around", marginTop: "10rem" }}>
                            <Col className="product-img" style={{ maxWidth: "24rem" }}>
                                <div >
                                    {product && (
                                        <img
                                            className="w-100"
                                            src={product?.image}
                                            alt="Product Image"
                                        />
                                    )}
                                </div>
                                {product && (
                                    <img
                                        className="w-100"
                // src={product.}`}
                                        alt=""

                                    />
                                )}
                            </Col>
                            <Col className="product-detail" style={{ maxWidth: "24rem", display: "flex", flexDirection: "column", justifyContent: "flex-start", textAlign: "left" }}>
                                {product && (
                                    <>
                                        <h1>{product.name}</h1>
                                        <h5>${product.price}</h5>
                                        <br/>
                                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                            <p>Quantity</p>
                                            <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center", width: "250px", border: "1px solid black"}}>
                                                <button style={{ background: "white", border: "none", padding: "0 1rem" }} disabled={quantity === 1} onClick={handleMinusQty}>-</button>
                                                <span style={{alignItems: "center"}}>
                                                    <p style={{ alignItems: "center" }}>{quantity}</p>
                                                </span>
                                                <button style={{ background: "white", border: "none", padding: "0 1rem" }} onClick={handleAddQty}>+</button>
                                            </div>
                                        </div>
                                        <br/>
                                        <Button style={{ backgroundColor: "white", border: "1px solid black", maxWidth: "100%", height: "2.5rem" }} onClick={() => addToCart(product._id)}>Add to Cart</Button>{" "}
                                        <br/>
                                        <div>
                                            <p>{product.description}</p>
                                        </div>
                                        <div>
                                            <strong>Write us your review</strong>
                                            <br />
                                            <textarea key="review" rows="5" cols="50" onChange={handleReviewInput}></textarea>
                                        </div>
                                        <br />
                                        <div>
                                            <Button style={{ backgroundColor: "white", border: "1px solid black", maxWidth: "100%", height: "2.5rem" }} onClick={handleReviewSubmit}>Send review</Button>
                                        </div>
                                    </> 
                                )} 
                            </Col> 
                        </Row>
                )} 
            </Container>
            <PublicFooter />
        </div>
    )
}

export default DetailPage
