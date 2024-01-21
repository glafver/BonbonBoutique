import React from 'react';
import { BsTrash } from "react-icons/bs";
import { Button } from 'react-bootstrap';
import { Product } from '../types/types';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';

interface CartItemProps {
    item: Product;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {

    const { addToCart, removeFromCart } = useCart();
    const { isProductAvailable } = useProducts();

    const handleRemoveFromCart = (id: number) => {
        removeFromCart(id);
    };

    const handleRemoveOneFromCart = (id: number) => {
        removeFromCart(id, 1);
    };

    const handleAddOneToCart = (id: number) => {
        if (isProductAvailable(id, 1)) {
            addToCart(id, 1);
        }
    };

    return (
        <>
            <td style={{ verticalAlign: 'middle' }}>
                <img
                    src={`https://www.bortakvall.se${item.images.thumbnail}`}
                    alt={item.name}
                    style={{ width: '50px' }}
                />
            </td>
            <td style={{ fontWeight: 'bold', verticalAlign: 'middle', color: '#495057' }}>
                <div>{item.name}</div>
            </td>
            <td style={{ verticalAlign: 'middle' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: '120px', width: '30%', color: '#495057' }}>
                        <Button variant="outline-secondary" onClick={() => handleRemoveOneFromCart(item.id)}>-</Button>
                        <span style={{ fontWeight: 'bold' }}> {item.quantity}</span>
                        <Button disabled={!isProductAvailable(item.id, 1)} variant="outline-secondary" onClick={() => handleAddOneToCart(item.id)}>+</Button>
                    </div>
                    <div>
                        <Button
                            variant="light"
                            style={{
                                backgroundColor: 'PowderBlue',
                                borderColor: 'PowderBlue',
                                marginRight: '16px',
                                marginLeft: '16px'
                            }}
                            onClick={() => handleRemoveFromCart(item.id)}
                        >
                            <BsTrash style={{ fontSize: '20px', color: '#495057' }} />
                        </Button>
                    </div>
                </div>
            </td></>
    );
};

export default CartItem;