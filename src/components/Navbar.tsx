import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { IoArrowUpCircle } from "react-icons/io5";
import SubMenu from './SubMenu';
import CartIcon from './CartIcon';

const NavbarComponent: React.FC = () => {
    const navigate = useNavigate();
    const { resetProductsFilter } = useProducts();

    const handleGoToHome = () => {
        resetProductsFilter();
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
                        {/* <img
                            width="64"
                            height="64"
                            src="https://img.icons8.com/arcade/64/sweets.png"
                            alt="sweets"
                            style={{
                                marginRight: '10px'
                            }} /> */}
                        <div>
                            <span className="logo logo-lg">BonbonBoutique</span>
                            <span className="logo logo-sm">BB</span>
                        </div>
                    </Navbar.Brand>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ fontSize: '28px', lineHeight: '38px' }}>+46760558355</div>
                        <CartIcon />
                    </div>

                </Container>
            </Navbar>
            <SubMenu />
            <a href='#nav'>
                <IoArrowUpCircle
                    className='bk-primary-color'
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        fontSize: '40px',
                        zIndex: '1'
                    }} />
            </a>
        </>
    );
};

export default NavbarComponent;
