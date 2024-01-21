import { Container } from 'react-bootstrap';
import HeroSection from '../components/HeroSection';
import BenefitsSection from '../components/BenefitsSection';
import NewIn from '../components/NewInSection';
import LogosSection from '../components/LogosSection';
import SubscribeSection from '../components/SubscribeSection';
import { Fade, Slide } from "react-awesome-reveal";

const HomePage = () => {
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