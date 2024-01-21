import React from 'react';
import Badge from 'react-bootstrap/Badge';
import { BsCart4 } from "react-icons/bs";
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

const CartIcon: React.FC = () => {
    const navigate = useNavigate();
    const { badge } = useCart();

    const handleGoToCart = () => {
        navigate('/cart');
    };

    return (
        <div style={{ position: 'relative' }} >
            <BsCart4 onClick={handleGoToCart}
                id='cart-icon'
                className='icon-btn'
            />
            {badge ? <Badge id='cart-badge'>{badge}</Badge> : null}
        </div>
    );
};

export default CartIcon;