import React, { useEffect, useState } from 'react'
import { Carousel, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import PublicFooter from '../../components/PublicFooter';
import PublicNavbar from '../../components/PublicNavbar';
import productAction from '../../redux/actions/product.action';


const HomePage = () => {
    const [page, setPage] = useState(1);
    const limit = 10;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);

    const handleShopNow = (e) => {
    navigate(`/products/${e}`);
    };

    useEffect(() => {
        dispatch(productAction.getAllProducts({page, limit}))
    }, [page, limit])
    
    return (
        <div>
            <PublicNavbar/>
            <Container style={{marginTop: "5rem", marginBottom: "5rem"}}>
                <Row>
                    <Carousel variant="dark">
                        {products.map((e) => (            
                            <Carousel.Item className="carousel-item" interval={2000} style={{height: "600px"}}>
                                <img
                                    src={e.image}
                                    alt="First slide"
                                />
                                <Carousel.Caption  className="carousel-text">
                                    <h4>{e.name}</h4>
                                    <a style={{textDecoration: "underline", cursor: "pointer"}} onClick={()=>handleShopNow(e._id)}>Shop Now</a>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>    
                </Row>
            </Container>
            <PublicFooter/>
        </div>
    )
}

export default HomePage;
