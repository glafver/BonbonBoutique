import React, { useState } from 'react';
import { Trash } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import { CartItemType } from '../types/types';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';

interface CartItemProps {
    item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {

    const { addOneToCart, removeFromCart, removeOneFromCart } = useCart();
    const { isProductAvialiable } = useProducts();

    const [isAvailable, setIsAvailable] = useState<boolean>(isProductAvialiable(item.id));

    const handleRemoveFromCart = (id: number) => {
        removeFromCart(id);
    };

    const handleRemoveOneFromCart = (id: number) => {
        removeOneFromCart(id);
        if (isProductAvialiable(id)) {
            setIsAvailable(true);
        }
    };

    const handleAddOneToCart = (id: number) => {
        if (isProductAvialiable(id)) {
            addOneToCart(id);
            if (!isProductAvialiable(id)) {
                setIsAvailable(false);
            }
        } else {
            setIsAvailable(false);
        }
    };

    return (
        <>
            <td style={{ verticalAlign: 'middle' }}>
                <img
                    src={`https://www.bortakvall.se${item.img}`}
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
                        <Button disabled={!isAvailable} variant="outline-secondary" onClick={() => handleAddOneToCart(item.id)}>+</Button>
                    </div>
                    <div>
                        <Button
                            variant="light"
                            style={{
                                backgroundColor: 'PowderBlue',
                                borderColor: 'PowderBlue',
                                marginRight: '16px'
                            }}
                            onClick={() => handleRemoveFromCart(item.id)}
                        >
                            <Trash style={{ fontSize: '20px', color: '#495057' }} />
                        </Button>
                    </div>
                </div>
            </td></>
    );
};

export default CartItem;