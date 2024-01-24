import { Container } from 'react-bootstrap';
import { Fade, Slide } from "react-awesome-reveal";

import BenefitsSection from '../components/BenefitsSection';
import HeroSection from '../components/HeroSection';
import LogosSection from '../components/LogosSection';
import NewIn from '../components/NewInSection';
import SubscribeSection from '../components/SubscribeSection';

const HomePage: React.FC = () => {
    return (
        <Container id='home-page' >
            <Fade duration={1000} triggerOnce> <HeroSection /></Fade>

            <Slide direction='right' triggerOnce><BenefitsSection /></Slide>
            <Fade duration={1000} triggerOnce><NewIn /></Fade>

            <Slide direction='left' triggerOnce><LogosSection /></Slide>
            <Fade duration={1000} triggerOnce><SubscribeSection /></Fade>

        </Container>
    );
};

export default HomePage;