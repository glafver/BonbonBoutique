import { Button, Row, Col } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { useCart } from '../hooks/useCart';
import { useState } from 'react';
import OrderModal from '../components/OrderModal';
import { AttentionSeeker } from 'react-awesome-reveal';

const CartPage: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const { cartItems } = useCart();

    const navigate = useNavigate();

    const totalAmount = cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

    return (
        <Container>
            <Container id='cart-page' className='my-5 rounded'>
                <div className="cart-container">
                    {cartItems.map((item, index) => (
                        <Row className="cart-row rounded" key={index}>
                            <CartItem item={item} />
                        </Row>
                    ))}
                </div>
                {cartItems.length ?
                    <div className='mb-3'>
                        <Row className="justify-content-end mb-3" style={{ fontSize: '24px' }}>
                            <Col xs={2} >
                                <div>Total: </div>
                            </Col>
                            <Col xs={2} style={{ fontWeight: 'bolder', paddingRight: '24px' }}>
                                <div>{totalAmount} kr</div>
                            </Col>
                        </Row>
                        <Button
                            onClick={handleShowModal}
                        >
                            Place order
                        </Button>
                    </div>
                    :
                    <div className='mb-3'>
                        <div className='mb-5'>Din kundvagn är tom.</div>
                        <AttentionSeeker effect="swing" >
                            <Button
                                onClick={() => { navigate('/products'); }}
                            >
                                Handla nu!
                            </Button>
                        </AttentionSeeker>

                    </div>
                }
                <OrderModal showModal={showModal} handleCloseModal={handleCloseModal} cartItems={cartItems} />
            </Container>
        </Container>
    );
};

export default CartPage;