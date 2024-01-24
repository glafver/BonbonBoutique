import { Container, Nav, Navbar } from 'react-bootstrap';
import SearchBar from './SearchBar';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SubMenu: React.FC = () => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    const handleLinkClick = (path: string) => {
        setExpanded(false);
        navigate(path);
    };

    return (
        <Navbar expand="lg" id='subnav' expanded={expanded}>
            <Container>
                <div className='toggle-wrapper'>
                    <SearchBar />
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(!expanded)} />
                </div>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Item>
                            <Link to="/products" className="nav-link" onClick={() => handleLinkClick('/products')}>Sortiment</Link>
                        </Nav.Item>
                        <Nav.Item className='d-flex align-items-center'>
                            <img width="30" height="30" src="https://img.icons8.com/parakeet/96/new.png" alt="new" style={{}} className='mx-1' />
                            <Link to="/new-in" className="nav-link" onClick={() => handleLinkClick('/new-in')}>New In</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/faq" className="nav-link" onClick={() => handleLinkClick('/faq')}>FAQ</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/contacts" className="nav-link" onClick={() => handleLinkClick('/contacts')}>Kontakt</Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default SubMenu;