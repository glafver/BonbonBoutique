import { Container, Row, Col } from 'react-bootstrap';

const BenefitsSection = () => {
    return (
        <Container id='benefits-section'>
            <Row>
                <Col md={4}>
                    <div className='benefit'>
                        <h3>Kända smaker</h3>
                        <p>Belgisk choklad, japanska KitKats och mer – en global godisupplevelse!</p>
                        <div className='benefit-circle rounded-circle'></div>
                    </div>
                </Col>

                <Col md={4} >
                    <div className="benefit">
                        <h3>Hållbarhet och kvalitet</h3>
                        <p>Miljövänligt och kvalitetsmedvetet – godis med omtanke!</p>
                        <div className='benefit-circle rounded-circle'></div>
                    </div>
                </Col>

                <Col md={4} >
                    <div className="benefit">
                        <h3>Perfekt för varje tillfälle</h3>
                        <p>Söta överraskningar för alla livets stunder – festligt, roligt och alldeles underbart!</p>
                        <div className='benefit-circle rounded-circle'></div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default BenefitsSection;
