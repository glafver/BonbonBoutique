import React from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { Cart4 } from 'react-bootstrap-icons';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { useNavigate } from 'react-router-dom';

const CartIcon: React.FC = () => {
    const navigate = useNavigate();
    const { badge } = useCart();
    const { resetProductsFilter } = useProducts();

    const handleGoToCart = () => {
        resetProductsFilter();
        navigate('/cart');
    };

    return (
        <Button
            onClick={handleGoToCart}
            variant="light"
            className=''
            style={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                position: 'relative',
                marginRight: '6px',
                marginLeft: '56px'
            }}>
            <Cart4 style={{ fontSize: '25px', color: '#495057' }} />
            {badge ? <Badge id='bk-cart-badge' style={{ position: 'absolute', top: '-4px', right: '-4px' }}>{badge}</Badge> : null}
        </Button>
    );
};

export default CartIcon;