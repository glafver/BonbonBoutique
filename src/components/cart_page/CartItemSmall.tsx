import React from 'react';
import { BsTrash } from "react-icons/bs";
import { Col, Row } from 'react-bootstrap';
import { Product } from '../../types/types';
import { useCart } from '../../hooks/useCart';
import { useProducts } from '../../hooks/useProducts';
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

interface CartItemProps {
    item: Product;
}

const CartItemSmall: React.FC<CartItemProps> = ({ item }) => {

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
            <Row className='p-0 mb-4 align-items-center' style={{ fontSize: '12px' }}>
                <Col xs={3} className='p-0' onClick={handleShowProductPage}>
                    <img
                        src={`https://www.bortakvall.se${item.images.thumbnail}`}
                        alt={item.name}
                        style={{ width: '50px' }}
                    />
                </Col>

                <Col xs={5}>
                    <div onClick={handleShowProductPage} className='product-name'>{item.name}</div>
                </Col>

                <Col xs={4} className='p-0'>
                    <div ><b> {item.price} kr</b> /  {100} g  </div>
                </Col>
            </Row>

            <Row className='p-0 align-items-center'>
                <Col xs={3} className='p-0'>
                    <BsTrash className='cart-remove-icon' onClick={() => handleRemoveFromCart(item.id)} />
                </Col>

                <Col xs={5} className=''>
                    <div className='d-flex align-items-center justify-content-between'>
                        <IoIosRemove className='icon-btn'
                            onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
                            onClick={() => handleRemoveOneFromCart(item.id)}
                        />
                        <span className='fw-bold'>{item.quantity}</span>
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
                </Col>

                <Col xs={4} className='p-0 fw-bold' style={{ fontSize: '20px' }}>
                    <div>{item.price * (item.quantity || 1)} kr</div>
                </Col>
            </Row>
        </>
    );
};

export default CartItemSmall;