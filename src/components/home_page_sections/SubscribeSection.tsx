import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import subscribeImage from '../../assets/subscribe-image.png';
import { toast } from 'react-toastify';
import { Slide } from "react-awesome-reveal";

const SubscribeSection: React.FC = () => {
    const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast("Tack för att du prenumererar på vårt nyhetsbrev!");
    };

    return (
        <Container className="my-5 rounded" id='subscribe-section'>
            <Row>
                <Col sm={12} md={6}>
                    <Image src={subscribeImage} alt="Subscribe" fluid />
                </Col>
                <Col sm={12} md={6} className="d-flex align-items-center justify-content-center">
                    <Slide duration={1000} triggerOnce direction='right'>
                        <div className='text-wrapper'>
                            <h3>Prenumerera på vårt nyhetsbrev</h3>
                            <p>Håll dig uppdaterad med våra senaste nyheter och erbjudanden.</p>
                            <Form onSubmit={handleSubscribe} className='d-flex'>
                                <Form.Group controlId="email" className='subscribe-email-input mx-2'>
                                    <Form.Control type="email" placeholder="E-mail" defaultValue="test@test.se" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Prenumera
                                </Button>
                            </Form>
                        </div>
                    </Slide>
                </Col>
            </Row>
        </Container>
    );
};

export default SubscribeSection;