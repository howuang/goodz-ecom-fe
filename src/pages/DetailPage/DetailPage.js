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
    const [review, setReview] = useState("")
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState([]);
    const [deleteReview, setDeleteReview] = useState("");
    const [comment, setComment] = useState(false);
    const [rating, setRating] = useState(1);
    const [updateComment, setUpdateComment] = useState(false);

     const handleCommentText = (e) => {
        console.log(e.target.value, 'key here')
        setComment(e.target.value)
    }

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

     const handleDeleteReview = (reviewId) => {
        setDeleteReview(reviewId)
    }

    const addToCart = (productId) => {
        setCartProduct(productId)
    };

       const handUpdateReview = (id) => {
        console.log(id,'id here');
        setUpdateComment(id)
    }
    const handleSuccess = (e) => {
        if(e.keyCode === 13) {
          setUpdateComment(false)
          dispatch(userActions.putReview({updateComment, comment, productId}))
        }
    }
    
    const dispatch = useDispatch();

    const loading = useSelector(state => state.products.loading)
    const product = useSelector(state => state.products.singleProduct)
    const currentCart = useSelector(state => state.carts.cart)
    const comments = useSelector(state => state.users.comment);
    
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
    }, [cartProduct, quantity]);

     useEffect(() => {
    if(deleteReview){
        dispatch(userActions.deleteReview({deleteReview, productId}))
    }
     }, [dispatch, deleteReview]);
    
      useEffect(() => {
        dispatch(userActions.getAllComment({productId, dispatch}))
      },[productId]);   

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
                                             <ul>
                                                {comments && comments.map((review) => {
                                                    return <li key={review._id}>{review.content}
                                                        <Button onClick={() => handleDeleteReview(review._id)} style={{ margin: '10px 30px' }}>
                                                            Delete
                                                        </Button>
                                                        {updateComment ?
                                                            <textarea onChange={handleCommentText} onKeyDown={handleSuccess} style={{ margin: '10px 30px' }}>
                                                            </textarea> :
                                                            <Button onClick={() => handUpdateReview(review._id)} style={{ margin: '10px 30px' }}>
                                                                Update
                                                            </Button>
                                                        }
                                                    </li>;
                                                })}
                                            </ul>
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
