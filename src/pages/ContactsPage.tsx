import { Container, Row, Col, Form, Button, Breadcrumb } from 'react-bootstrap';
import { Fade } from "react-awesome-reveal";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { contactsMap } from '../helpers/data';

const ContactsPage: React.FC = () => {
    return (
        <Fade duration={500} triggerOnce>
            <Container id='contacts-page' className='my-4 page-wrapper'>
                <Breadcrumb className='ps-2'>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Hem</Breadcrumb.Item>
                    <Breadcrumb.Item active>Kontakter</Breadcrumb.Item>
                </Breadcrumb>
                <Container className='p-3 p-md-5 rounded bg-bg'>
                    <Row>
                        <Col md={6}>
                            <h3 className='mb-3'>Kontakta oss</h3>
                            <p><b>Adress: </b>Stortorget, Malmö, 21840</p>
                            <p><b>Telefon: </b> +46760558355</p>
                            <p>
                                <FaFacebook className='icon-btn' /> <FaTwitter className='icon-btn' /> <FaInstagram className='icon-btn' />
                            </p>
                            <h3 className='mb-3 mt-5'></h3>
                            <Form className='mb-5 mb-md-0'>
                                <Form.Group controlId="formBasicEmail" className='mb-3'>
                                    <Form.Label>Din email</Form.Label>
                                    <Form.Control type="email" />
                                </Form.Group>

                                <Form.Group controlId="formBasicText" className='mb-3'>
                                    <Form.Label>Meddelande</Form.Label>
                                    <Form.Control as="textarea" rows={3} />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Skicka
                                </Button>
                            </Form>
                        </Col>
                        <Col md={6}>
                            <iframe
                                src={contactsMap}
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                            ></iframe>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </Fade>
    );
};

export default ContactsPage;