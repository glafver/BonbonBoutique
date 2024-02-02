import React from 'react';
import { BsTrash } from "react-icons/bs";
import { Col } from 'react-bootstrap';
import { Product } from '../../types/types';
import { useCart } from '../../hooks/useCart';
import { useProducts } from '../../hooks/useProducts';
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

interface CartItemProps {
    item: Product;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {

    const navigate = useNavigate();

    const handleShowProductPage = () => {
        navigate(`/product/${item.id}`);
    };

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
            <Col xs={2} onClick={handleShowProductPage}>
                <img
                    src={`https://www.bortakvall.se${item.images.thumbnail}`}
                    alt={item.name}
                    style={{ width: '50px', cursor: 'pointer' }}
                />
            </Col>

            <Col xs={3}>
                <div onClick={handleShowProductPage} className='product-name'>{item.name}</div>
            </Col>

            <Col xs={3}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <BsTrash className='cart-remove-icon' onClick={() => handleRemoveFromCart(item.id)} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100px' }}>
                        <IoIosRemove className='icon-btn'
                            onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
                            onClick={() => handleRemoveOneFromCart(item.id)}
                        />
                        <span style={{ fontWeight: 'bold' }}>{item.quantity}</span>
                        <IoIosAdd
                            className='icon-btn'
                            style={{
                                color: !isProductAvailable(item.id, 1) && 'lightgrey',
                                cursor: !isProductAvailable(item.id, 1) && 'none',
                                pointerEvents: !isProductAvailable(item.id, 1) && 'none'
                            }}
                            onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
                            onClick={() => handleAddOneToCart(item.id)}
                        />
                    </div>
                </div>
            </Col>
            <Col xs={2}>
                <div style={{ fontSize: '12px' }}><b> {item.price} kr</b> /  {100} g  </div>
            </Col>
            <Col xs={2} style={{ fontWeight: 'bolder' }}>
                <div>{item.price * (item.quantity || 1)} kr</div>
            </Col>
        </>
    );
};

export default CartItem;