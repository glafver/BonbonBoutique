// NotFoundPage.tsx
import React from 'react';
import { Container, Breadcrumb, Image, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Fade } from "react-awesome-reveal";
import not_found from '../assets/not_found.png';

const NotFoundPage: React.FC = () => {
    return (
        <Container id='not-found-page' className='my-5'>
            <Breadcrumb className='ps-2'>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Hem</Breadcrumb.Item>
                <Breadcrumb.Item active>Sida hittades inte</Breadcrumb.Item>
            </Breadcrumb>
            <Fade duration={1000} triggerOnce >
                <Container className="rounded secondary-bg p-4">
                    <Row className="align-items-center justify-content-between">
                        <Col md={3} className="align-items-center m-auto">
                            <h1>Sida hittades inte</h1>
                            <p>Vi beklagar, men sidan du letade efter finns inte.</p>
                        </Col>
                        <Col md={6}>
                            <Image src={not_found} fluid style={{ maxWidth: '100%' }} />
                        </Col>
                    </Row>
                </Container>
            </Fade>
        </Container>
    );
};

export default NotFoundPage;