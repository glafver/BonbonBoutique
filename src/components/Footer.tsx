import { Container, Row, Col } from 'react-bootstrap';
import { FaPhone, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer id='footer' className="py-5">
            <Container>
                <Row>
                    <Col md={3}>
                        <div
                            onClick={() => { }}
                            style={{
                                display: 'flex',
                                cursor: 'pointer'
                            }}>
                            <div style={{ lineHeight: '30px' }}>
                                <span className="logo logo-lg">Bonbon</span>
                                <br />
                                <span className="logo logo-lg">Boutique</span>
                                <span className="logo logo-sm">BB</span>
                            </div>
                        </div>
                    </Col>
                    <Col md={3}>
                        <h5>Meny</h5>
                        <ul className="list-unstyled">
                            <li><a href="/products">Sortiment</a> </li>
                            <li><a href="/new-in">Nyheter</a></li>
                            <li><a href="/favorites">Favoriter</a></li>
                        </ul>
                    </Col>
                    <Col md={3}>
                        <h5>Info</h5>
                        <ul className="list-unstyled">
                            <li><a href="/faq">FAQ</a></li>
                            <li><a href="/contacts">Kontakter</a></li>
                        </ul>
                    </Col>
                    <Col md={3}>
                        <h5>Kontakta oss</h5>
                        <p>
                            <FaPhone /> +46760558355
                        </p>
                        <p>
                            <FaFacebook className='icon-btn' /> <FaTwitter className='icon-btn' /> <FaInstagram className='icon-btn' />
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
