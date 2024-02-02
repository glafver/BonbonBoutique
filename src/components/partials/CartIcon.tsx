import React from 'react';
import Badge from 'react-bootstrap/Badge';
import { BsCart4 } from "react-icons/bs";
import { useCart } from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';

const CartIcon: React.FC = () => {
    const navigate = useNavigate();
    const { badge } = useCart();

    const handleGoToCart = () => {
        navigate('/cart');
    };

    return (
        <div className='position-relative'>
            <BsCart4 onClick={handleGoToCart}
                className='icon-btn cart-icon'
            />
            {badge ? <Badge className='cart-badge'>{badge}</Badge> : null}
        </div>
    );
};

export default CartIcon;