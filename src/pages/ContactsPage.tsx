import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Fade } from "react-awesome-reveal";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const ContactsPage: React.FC = () => {
    return (
        <Fade duration={500} triggerOnce>
            <Container className='my-5 '>
                <Container className='p-5 rounded bg-bg'>
                    <Row>
                        <Col md={6}>
                            <h3 className='mb-5'>Kontakta oss</h3>
                            <p><b>Adress: </b>Vagnmakarebyn 3C, Malmö, 21840</p>
                            <p><b>Telefon: </b> +46760558355</p>
                            <p>
                                <FaFacebook className='icon-btn' /> <FaTwitter className='icon-btn' /> <FaInstagram className='icon-btn' />
                            </p>
                        </Col>
                        <Col md={6}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2248.599104369378!2d13.00075931592569!3d55.60587398052919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465397f63e1619ab%3A0x259675b1d673668b!2sVagnmakarebyn%203C%2C%20213%2077%20Malm%C3%B6%2C%20Sweden!5e0!3m2!1sen!2sus!4v1631293421931!5m2!1sen!2sus"
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