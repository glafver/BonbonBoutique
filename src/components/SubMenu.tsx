import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import SearchBar from './SearchBar';

const SubMenu = () => {
    return (
        <Navbar expand="lg" id='subnav'
            className='bk-primary-bg bk-secondary-color'>
            <Container>
                <Nav>
                    <Nav.Item>
                        <SearchBar onSearch={() => { console.log('searchin...'); }} />
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/products">Sortiment</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='d-flex align-items-center'>
                        <img width="30" height="30" src="https://img.icons8.com/parakeet/96/new.png" alt="new" style={{}} />
                        <Nav.Link eventKey="link-1">New In</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2">FAQ</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2">Kontakt</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default SubMenu;