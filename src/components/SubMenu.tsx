import { Container, Nav, Navbar } from 'react-bootstrap';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';

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
                            <Link to="/products" className="nav-link">Sortiment</Link>
                        </Nav.Item>
                        <Nav.Item className='d-flex align-items-center'>
                            <img width="30" height="30" src="https://img.icons8.com/parakeet/96/new.png" alt="new" style={{}} />
                            <Link to="/new-in" className="nav-link">New In</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/faq" className="nav-link">FAQ</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/contacts" className="nav-link">Kontakt</Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default SubMenu;