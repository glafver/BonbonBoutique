import { Container, Row, Col } from 'react-bootstrap';
import { FaPhone, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
                                <span className="logo">Bonbon</span>
                                <br />
                                <span className="logo">Boutique</span>
                            </div>
                        </div>
                    </Col>
                    <Col md={3} className='mt-4 mt-lg-0'>
                        <h5>Meny</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/products">Sortiment</Link></li>
                            <li><Link to="/new-in">Nyheter</Link></li>
                            <li><Link to="/favorites">Favoriter</Link></li>
                        </ul>
                    </Col>
                    <Col md={3}>
                        <h5>Info</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/faq">FAQ</Link></li>
                            <li><Link to="/contacts">Kontakter</Link></li>
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
