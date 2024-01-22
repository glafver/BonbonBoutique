import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { IoArrowUpCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

import CartIcon from './CartIcon';
import FavIcon from './FavIcon';
import SubMenu from './SubMenu';

const NavbarComponent: React.FC = () => {
    const navigate = useNavigate();

    const handleGoToHome = () => {
        navigate('/');
    };

    return (
        <>
            <Navbar expand="lg" id='nav'>
                <Container>
                    <Navbar.Brand
                        onClick={handleGoToHome}
                        style={{
                            display: 'flex',
                            cursor: 'pointer'
                        }}>
                        <div>
                            <span className="logo logo-lg">BonbonBoutique</span>
                            <span className="logo logo-sm">BB</span>
                        </div>
                    </Navbar.Brand>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FavIcon />
                        <CartIcon />
                    </div>
                </Container>
            </Navbar>
            <SubMenu />
            <a href='#nav'>
                <IoArrowUpCircle id='up-button' className='icon-btn' />
            </a>
        </>
    );
};

export default NavbarComponent;
