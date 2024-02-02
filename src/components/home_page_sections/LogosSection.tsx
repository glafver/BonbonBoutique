import { Container, Image } from 'react-bootstrap';
import haribo from '../../assets/haribo.png';
import cadbury from '../../assets/cadbury.png';
import mars from '../../assets/mars.png';
import nutella from '../../assets/nutella.png';
import nestle from '../../assets/nestle.png';
import kinder from '../../assets/kinder.png';
import kitkat from '../../assets/kitkat.png';

const LogosSection = () => {
    return (
        <Container>
            <div id='brands-wrapper'>
                <Image fluid src={haribo} alt="Haribo" />
                <Image fluid src={cadbury} alt="Cadbury" />
                <Image fluid src={mars} alt="Mars" />
                <Image fluid src={nutella} alt="Nutella" />
                <Image fluid src={nestle} alt="Nestle" />
                <Image fluid src={kinder} alt="Kinder" />
                <Image fluid src={kitkat} alt="Kitkat" />
            </div>
        </Container>
    );
};

export default LogosSection;