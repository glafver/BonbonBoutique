import React from 'react';
import { Accordion, Container, Breadcrumb } from 'react-bootstrap';
import { Fade } from "react-awesome-reveal";
import { Link } from 'react-router-dom';
import { faqItems } from '../helpers/data';

const FaqPage: React.FC = () => {
    return (
        <Container id='faq-page' className='my-4 page-wrapper'>
            <Breadcrumb className='ps-2'>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Hem</Breadcrumb.Item>
                <Breadcrumb.Item active>FAQ</Breadcrumb.Item>
            </Breadcrumb>
            <Container className="rounded bg-bg pt-5" >
                <Fade duration={1000} triggerOnce >
                    {faqItems.map((category, index) => (
                        <div className='mb-5' key={index}>
                            <h4 className='mb-'>{category.category}</h4>
                            <Accordion >
                                {category.questions.map((item, idx) => (
                                    <Accordion.Item eventKey={String(idx)} key={idx}>
                                        <Accordion.Header style={{ fontWeight: '900' }}>{item.question}</Accordion.Header>
                                        <Accordion.Body style={{ fontSize: '14px' }}>{item.answer}</Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Accordion>
                        </div>
                    ))}
                </Fade>
            </Container>
        </Container>
    );
};

export default FaqPage;
