import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import ProductPagination from '../../components/ProductPagination';
import PublicFooter from '../../components/PublicFooter';
import PublicNavbar from '../../components/PublicNavbar';
import productAction from '../../redux/actions/product.action';
import './ProductsPage.css'

const ProductsPage = () => {
    const [page, setPage] = useState(1)
    const limit = 12;

    const [searchInput, setSearchInput] = useState("");
    const [query, setQuery] = useState("");

    const navigate = useNavigate();

    const handleClickProduct = (productId) => {
    navigate(`/products/${productId}`);
    };

    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products)

    const loading = useSelector(state => state.products.loading)
    const totalPage = useSelector(state => state.products.totalPages)
    const errorMessage = useSelector(state => state.products.errorMessage)


    useEffect(() => {
        dispatch(productAction.getAllProducts({page, limit, query}))
    }, [page, limit, query])
    return (
        <div className="product-page">
            <PublicNavbar/>
            <div>Sort by</div>
            <div className="content">
                <Container>
                    <Row>
                        <Col>
                            {loading ? (
                                <div className="text-center">
                                    <Spinner animation="border" variant="secondary" size={100} loading={true} />
                                </div>  
                            ) : (
                                    <ul className="list-unstyled d-flex flex-wrap justify-content-between">  
                                        {products.map((product) => (        
                                            <li key={product._id} onClick={() => handleClickProduct(product._id)}>
                                                <Card style={{ width: "300px", maxHeight: "2000px", border: "none", marginTop: "2rem", cursor: "pointer" }}>
                                                    <Card.Img
                                                        variant="top"
                                                        src={product.image}
                                                    />
                                                    <Card.Body>
                                                        <Card.Text>{product.name}</Card.Text>
                                                        <Card.Text style={{ lineHeight: "1.5rem", fontSize: ".9rem" }}>${product.price}</Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </li>
                                        ))}
                                    </ul>  
                            )} 
                        </Col>
                    </Row>
                    <ProductPagination page={page}
                        setPage={setPage}
                        totalPage={totalPage}/>
                </Container>
            </div>
            <PublicFooter/>
        </div>
    )
}

export default ProductsPage
