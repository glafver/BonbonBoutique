import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import girl_sweets from '../assets/girl_sweets.png';

const HeroSection = () => {
    return (
        <Container className="my-5 rounded" id='hero-section'>
            <Row className="align-items-center justify-content-between">
                <Col md={4} className='mx-auto'>
                    <h1>Söt lycka i varje bit!</h1>
                    <p>Där kalorier är bara siffror och glädjen är verklig. Kom och frossa i sötsaker!</p>
                </Col>
                <Col md={5} className='mt-5'>
                    <Image
                        src={girl_sweets}
                        alt="Girl with sweets"
                        fluid
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default HeroSection;