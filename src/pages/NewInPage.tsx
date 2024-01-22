import { Container, Row, Col, Image } from 'react-bootstrap';
import { Fade, Slide } from "react-awesome-reveal";

import girl_open_candy from '../assets/girl_open_candy.png';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types/types';

const NewInPage: React.FC = () => {
    const { newProducts } = useProducts();

    return (
        <Fade duration={500} triggerOnce cascade>
            <Container id='new-in-page' className='my-5'>
                <Container className="my-5 rounded secondary-bg" >
                    <Row className="align-items-center justify-content-between">
                        <Col md={4} className='mx-auto mt-3 mt-md-0'>
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
                <Container className="rounded secondary-bg bg-bg py-4">
                    <div>
                        <div style={{ fontSize: '26px', fontWeight: '500', paddingLeft: '12px', marginBottom: '20px' }}>Våra nya produkter</div>
                    </div>
                    <Row>
                        <Col md={12} style={{ padding: '0' }}>
                            <Row>
                                {newProducts.map((product: Product) => (
                                    <Col key={product.id} xs={6} md={4} lg={3} className='mb-4'>
                                        <ProductCard product={product} />
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