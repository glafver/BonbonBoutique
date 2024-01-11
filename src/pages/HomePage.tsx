import React from 'react';
import { Container } from 'react-bootstrap';
import HeroSection from '../components/HeroSection';
import BenefitsSection from '../components/BenefitsSection';
import NewIn from '../components/NewInSection';

const HomePage = () => {
    return (
        <Container id='home-page' >
            <HeroSection />
            <BenefitsSection />
            <NewIn />
        </Container>
    );
};

export default HomePage;