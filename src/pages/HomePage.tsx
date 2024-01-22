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
            <Fade duration={500} triggerOnce cascade>
                <HeroSection />
                <Slide direction='right' triggerOnce><BenefitsSection /></Slide>
                <NewIn />
                <Slide direction='left' triggerOnce><LogosSection /></Slide>
                <SubscribeSection />
            </Fade>
        </Container>
    );
};

export default HomePage;