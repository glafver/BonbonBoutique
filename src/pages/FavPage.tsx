import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { Product } from '../types/types';
import boy_happy from '../assets/boy_happy.png';
import { useFav } from '../hooks/useFav';
import { Fade, Slide } from "react-awesome-reveal";
import { useNavigate } from 'react-router-dom';
import { AttentionSeeker } from 'react-awesome-reveal';

const FavPage: React.FC = () => {
    const { favItems } = useFav();
    const navigate = useNavigate();

    return (
        <Fade duration={500} triggerOnce>
            <Container id='fav-page' className='my-5 rounded'>
                <Container className="my-5 rounded secondary-bg" >
                    <Row className="align-items-center justify-content-between">
                        <Col md={4} className='mx-auto'>
                            <Slide duration={1000} triggerOnce>
                                <h1>Dina Favoriter, Dina Ögonblick!</h1>
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
                <Container className=" rounded secondary-bg bg-bg py-4" style={{ paddingTop: '20px' }}>
                    <div>
                        <div style={{ fontSize: '26px', fontWeight: '500', paddingLeft: '12px', marginBottom: '20px' }}>Dina favoritprodukter</div>

                    </div>
                    <Row>
                        <Col md={12} style={{ padding: '0' }}>
                            <Row className="row-appear">
                                {favItems?.length === 0 ?
                                    <div className='d-flex flex-column justify-content-center align-items-center mb-4'>
                                        <div className='text-center mb-4'>Du har inga favoritprodukter än.
                                        </div>
                                        <AttentionSeeker effect="swing" >
                                            <Button
                                                style={{
                                                    backgroundColor: 'deeppink',
                                                    borderColor: 'deeppink',
                                                    color: 'white'
                                                }}
                                                onClick={() => { window.scrollTo(0, 0); navigate('/products'); }}
                                            >
                                                Handla nu!
                                            </Button>
                                        </AttentionSeeker>
                                    </div>
                                    :
                                    favItems.map((product: Product) => (
                                        <Col key={product.id} xs={12} md={4} lg={3} style={{ marginBottom: '20px' }}>
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