import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Cart4 } from 'react-bootstrap-icons';
import Badge from 'react-bootstrap/Badge';
import NavbarProductSelect from './NavbarProductSelect';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { ArrowUpCircleFill } from 'react-bootstrap-icons';

const NavbarComponent: React.FC = () => {

    const { badge } = useCart();
    const { resetProductsFilter } = useProducts();

    const navigate = useNavigate();

    const handleGoToCart = () => {
        resetProductsFilter();
        navigate('/cart');
    };

    const handleGoToHome = () => {
        resetProductsFilter();
        navigate('/');
    };

    return (
        <>
            <Navbar expand="lg" id='nav'
                style={{
                    backgroundColor: 'LightGoldenrodYellow'
                }}>
                <Container>
                    <Navbar.Brand
                        onClick={handleGoToHome}
                        style={{
                            display: 'flex',
                            cursor: 'pointer'
                        }}>
                        <img
                            width="64"
                            height="64"
                            src="https://img.icons8.com/arcade/64/sweets.png"
                            alt="sweets"
                            style={{
                                marginRight: '10px'
                            }} />
                        <div style={{
                            fontFamily: "'Modak', sans-serif",
                            fontSize: '50px',
                            color: 'deeppink'
                        }}>
                            <span className="bk-color-changing bk-navbar-logo-lg">BonbonBoutique</span>
                            <span className="bk-color-changing bk-navbar-logo-sm">BB</span>
                        </div>
                    </Navbar.Brand>
                    <NavbarProductSelect />
                    <Button
                        onClick={handleGoToCart}
                        variant="light"
                        style={{
                            backgroundColor: 'pink',
                            borderColor: 'pink',
                            position: 'relative',
                            marginRight: '6px'
                        }}>
                        <Cart4 style={{ fontSize: '25px', color: '#495057' }} />
                        {badge ? <Badge id='bk-cart-badge' style={{ position: 'absolute', top: '-12px', right: '-12px' }}>{badge}</Badge> : null}
                    </Button>
                </Container>
            </Navbar>
            <a href='#nav'>
                <ArrowUpCircleFill
                    className='bk-color-changing'
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
