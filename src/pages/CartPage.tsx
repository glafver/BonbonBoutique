import { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { AttentionSeeker } from 'react-awesome-reveal';
import { useNavigate } from 'react-router-dom';

import CartItem from '../components/CartItem';
import CartItemSmall from '../components/CartItemSmall';
import OrderModal from '../components/OrderModal';
import { useCart } from '../hooks/useCart';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
        <Container id='cart-page' className='my-5'>
            <Breadcrumb className='ps-2'>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Hem</Breadcrumb.Item>
                <Breadcrumb.Item active>Kundvagn</Breadcrumb.Item>
            </Breadcrumb>
            <Container className='p-4 rounded bg-bg'>
                <div className="cart-container">
                    {cartItems.map((item, index) => (
                        <>
                            <Row className="cart-row rounded d-none d-lg-flex" key={index}>
                                <CartItem item={item} />
                            </Row>
                            <Row className="cart-row rounded d-flex d-lg-none" key={index}>
                                <CartItemSmall item={item} />
                            </Row>
                        </>
                    ))}
                </div>
                {cartItems.length ?
                    <div className='mb-3 text-center'>
                        <Row className="justify-content-end mb-3 fs-4" >
                            <Col xs={6} lg={2} >
                                <div>Total: </div>
                            </Col>
                            <Col xs={6} lg={2} className='fw-bold'>
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
                    <div className='mb-3 text-center'>
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