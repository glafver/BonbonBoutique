import { Container } from 'react-bootstrap';
import { Fade, Slide } from "react-awesome-reveal";
import BenefitsSection from '../components/home_page_sections/BenefitsSection';
import HeroSection from '../components/home_page_sections/HeroSection';
import LogosSection from '../components/home_page_sections/LogosSection';
import NewIn from '../components/home_page_sections/NewInSection';
import SubscribeSection from '../components/home_page_sections/SubscribeSection';

const HomePage: React.FC = () => {
    return (
        <Container id='home-page' className='page-wrapper' >
            <Fade duration={1000} triggerOnce> <HeroSection /></Fade>

            <Slide direction='right' triggerOnce><BenefitsSection /></Slide>
            <Fade duration={1000} triggerOnce><NewIn /></Fade>

            <Slide direction='left' triggerOnce><LogosSection /></Slide>
            <Fade duration={1000} triggerOnce><SubscribeSection /></Fade>

        </Container>
    );
};

export default HomePage;