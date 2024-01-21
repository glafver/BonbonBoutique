import React, { FC } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import girl_open_candy from '../assets/girl_open_candy.png';
import ProductCard from '../components/ProductCard';
import { Product } from '../types/types';
import { useProducts } from '../hooks/useProducts';
import { Fade, Slide } from "react-awesome-reveal";

const NewInPage: FC = () => {
    const { newProducts } = useProducts();
    return (
        <Fade duration={500} triggerOnce cascade>
            <Container id='new-in-page' className='my-5'>
                <Container className="my-5 rounded secondary-bg" >
                    <Row className="align-items-center justify-content-between">
                        <Col md={4} className='mx-auto'>
                            <Slide duration={1000} triggerOnce>
                                <h1>Njut av Livets Söta Sidor!</h1>
                                <p>Upplev glädjen och spänningen med våra nylanserade godisar. Varje bit är skapad för att förgylla dina stunder.</p>

                            </Slide>
                        </Col>
                        <Col md={5} className='mt-5'>
                            <Image
                                src={girl_open_candy}
                                alt="Girl with sweets"
                                fluid
                            />
                        </Col>
                    </Row>
                </Container>
                <Container className=" rounded secondary-bg bg-bg py-4" style={{ paddingTop: '20px' }}>
                    <div>
                        <div style={{ fontSize: '26px', fontWeight: '500', paddingLeft: '12px', marginBottom: '20px' }}>Våra nya produkter</div>
                    </div>
                    <Row>
                        <Col md={12} style={{ padding: '0' }}>
                            <Row className="row-appear">
                                {newProducts.map((product: Product) => (
                                    <Col key={product.id} xs={12} md={4} lg={3} style={{ marginBottom: '20px' }}>
                                        <Fade triggerOnce><ProductCard product={product} /></Fade>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </Fade>
    );
};

export default NewInPage;