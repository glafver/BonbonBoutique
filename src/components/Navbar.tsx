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
        <Navbar expand="lg" style={{
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
                        <span className="bk-color-changing"> BORTAKVÄLL</span>

                    </div>
                </Navbar.Brand>
                <NavbarProductSelect />
                <Button
                    onClick={handleGoToCart}
                    variant="light"
                    style={{
                        backgroundColor: 'pink',
                        borderColor: 'pink',
                        position: 'relative'
                    }}>
                    <Cart4 style={{ fontSize: '25px', color: '#495057' }} />
                    {badge ? <Badge id='bk-cart-badge' style={{ position: 'absolute', top: '-12px', right: '-12px' }}>{badge}</Badge> : null}
                </Button>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
