import { Container, Nav, Navbar } from 'react-bootstrap';
import SearchBar from './SearchBar';

const SubMenu: React.FC = () => {
    return (
        <Navbar expand="lg" id='subnav'>
            <Container>
                <div className='toggle-wrapper'>
                    <SearchBar />
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                </div>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Item>
                            <Nav.Link href="/products">Sortiment</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='d-flex align-items-center'>
                            <img width="30" height="30" src="https://img.icons8.com/parakeet/96/new.png" alt="new" style={{}} />
                            <Nav.Link href="/new-in" eventKey="link-1">New In</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/faq" eventKey="link-2">FAQ</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/contacts" eventKey="link-2">Kontakt</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default SubMenu;