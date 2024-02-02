import React from 'react';
import { AttentionSeeker, Fade, Slide } from 'react-awesome-reveal';
import { Button, Col, Container, Image, Row, Breadcrumb } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import boy_happy from '../assets/boy_happy.png';
import ProductCard from '../components/products/ProductCard';
import { useFav } from '../hooks/useFav';
import { Product } from '../types/types';

const FavPage: React.FC = () => {
    const { favItems } = useFav();
    const navigate = useNavigate();

    return (
        <Fade duration={500} triggerOnce>
            <Container id='fav-page' className='my-4 page-wrapper'>
                <Breadcrumb className='ps-2'>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Hem</Breadcrumb.Item>
                    <Breadcrumb.Item active>Dina favoritprodukter</Breadcrumb.Item>
                </Breadcrumb>
                <Container className="rounded secondary-bg mb-5" >
                    <Row className="align-items-center justify-content-between">
                        <Col md={4} className='mx-auto mt-3 mt-lg-0'>
                            <Slide duration={1000} triggerOnce>
                                <h1>Dina favoriter, dina ögonblick!</h1>
                                <p>Bläddra genom din personliga samling av favoritgodis. Varje vald sötsak väntar på att återigen förgylla din dag!</p>
                            </Slide>
                        </Col>
                        <Col md={5} className='mt-5'>
                            <Image
                                src={boy_happy}
                                alt="Girl with sweets"
                                fluid
                            />
                        </Col>
                    </Row>
                </Container>
                <Container className="rounded secondary-bg bg-bg py-4 pt-4">
                    <h2 className='ps-3 mb-4'>Dina favoritprodukter</h2>
                    <Row>
                        <Col md={12} className='p-0'>
                            <Row className="row-appear">
                                {favItems?.length === 0 ?
                                    <div className='d-flex flex-column justify-content-center align-items-center mb-4'>
                                        <div className='text-center mb-4'>Du har inga favoritprodukter än.
                                        </div>
                                        <AttentionSeeker effect="swing" >
                                            <Button
                                                onClick={() => { window.scrollTo(0, 0); navigate('/products'); }}
                                            >
                                                Handla nu!
                                            </Button>
                                        </AttentionSeeker>
                                    </div>
                                    :
                                    favItems.map((product: Product) => (
                                        <Col key={product.id} xs={6} md={4} lg={3} className='mb-4'>
                                            <ProductCard product={product} />
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </Fade>
    );
};

export default FavPage;