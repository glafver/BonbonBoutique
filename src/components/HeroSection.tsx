import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import girl_sweets from '../assets/girl_sweets.png';
import { Slide } from "react-awesome-reveal";

const HeroSection = () => {
    const navigate = useNavigate();
    return (
        <Container className="my-5 rounded" id='hero-section'>
            <Row className="align-items-center justify-content-between">

                <Col xs={12} md={6} lg={4} className='mx-auto'>
                    <Slide duration={1000} triggerOnce>
                        <h1>Söt lycka i varje bit!</h1>
                        <p>Där kalorier är bara siffror och glädjen är verklig. Kom och frossa i sötsaker!</p>

                        <Button type="submit" onClick={() => { navigate('/products'); }}>
                            Upptäck vårt sortiment
                        </Button>
                    </Slide>
                </Col>
                <Col xs={12} md={6} lg={5} className='mt-5'>
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