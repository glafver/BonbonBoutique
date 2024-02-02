import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import { OrderDataType } from '../types/types';
import { postOrder } from '../api/api';
import OrderFormBlock from '../components/order_page/OrderFormBlock';
import OrderSummary from '../components/order_page/OrderSummary';
import ShippingBlock from '../components/order_page/ShippingBlock';
import PaymentBlock from '../components/order_page/PaymentBlock';
import OrderReviewBlock from '../components/order_page/OrderReviewBlock';
import {
    Container,
    Breadcrumb,
    Row,
    Col,
    Button,
    Modal,
    Spinner
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import Confetti from 'react-confetti';
import { IoCloseOutline } from "react-icons/io5";
import { FaCircleXmark, FaCircleCheck } from "react-icons/fa6";
import { Bounce, AttentionSeeker } from 'react-awesome-reveal';
import { testData } from '../helpers/data';

type InputChangeEvent = ChangeEvent<HTMLInputElement>;

const OrderPage: React.FC = () => {
    const { cartItems } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<OrderDataType>(testData);

    const [result, setResult] = useState<{ status: string, data: { id: number; }; } | null>(null);
    const [isPostingOrder, setIsPostingOrder] = useState<boolean | null>(null);
    const [openBlock, setOpenBlock] = useState<string | null>('orderInfo');
    const [showConfetti, setShowConfetti] = useState<boolean>(false);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

    const orderInfoRef = useRef<HTMLDivElement>(null);
    const shippingMethodRef = useRef<HTMLDivElement>(null);
    const paymentRef = useRef<HTMLDivElement>(null);

    const handleFormChange = (e: InputChangeEvent) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        localStorage.setItem('customerData', JSON.stringify(formData));
    };

    const sendOrder = async () => {
        formData.order_items = cartItems.map((item) => ({
            product_id: item.id,
            qty: item.quantity ? item.quantity : 1,
            item_price: item.price,
            item_total: (item.quantity ? item.quantity : 1) * item.price,
        }));
        formData.order_total = cartItems.reduce((total, item) => total + (item.quantity ? item.quantity : 1) * item.price, 0);
        setIsPostingOrder(true);
        const result = await postOrder(formData);
        if (result.status === 'success') {
            localStorage.setItem('cart', JSON.stringify([]));
            window.dispatchEvent(new Event('storage'));
        }
        setResult(result);
        setIsPostingOrder(false);
        setResult(result);
    };

    const resetResult = () => {
        setResult(null);
        setIsPostingOrder(null);
    };

    useEffect(() => {
        const savedData = localStorage.getItem('customerData');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    useEffect(() => {
        return () => {
            resetResult();
        };
    }, []);

    useEffect(() => {
        if (result?.status === 'success') {
            setShowConfetti(true);
        }
    }, [result]);

    const updateStepLineHeights = () => {
        const stepLines = document.querySelectorAll('.step-line');

        stepLines.forEach((line, index) => {
            if (index < stepLines.length) {
                let height = 0;

                switch (index) {
                    case 0:
                        height = orderInfoRef.current?.offsetHeight || 0;
                        break;
                    case 1:
                        height = shippingMethodRef.current?.offsetHeight || 0;
                        break;
                    case 2:
                        height = paymentRef.current?.offsetHeight || 0;
                        break;
                    default:
                        break;
                }

                if (height > 0) {
                    (line as HTMLElement).style.height = `${height - 34}px`;
                }
            }
        });
    };

    useEffect(() => {
        updateStepLineHeights();
    }, [openBlock]);

    return (
        <Container id='order-page' className='my-4 page-wrapper'>
            {showConfetti && <Confetti height={1000} colors={['#C27189', '#bdbffa', '#fff2b8']} />}
            <Breadcrumb className='ps-2'>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Hem</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/cart" }}>Kundvagn</Breadcrumb.Item>
                <Breadcrumb.Item >Beställning</Breadcrumb.Item>
            </Breadcrumb>
            <Container className=''>
                {result ?
                    <div className='result'>
                        {result.status === 'success' ?
                            <div className='d-flex flex-column justify-content-center text-center pt-5'>
                                <Bounce className='d-flex justify-content-center'>
                                    <FaCircleCheck className='fs-1 primary-color' />
                                </Bounce>
                                <div className='fw-bold fs-3 mt-3'>Tack för att du handlar hos</div>
                                <div className='logo p-3 logo-lg d-none d-md-block'>
                                    <span> BonbonBoutique</span>
                                </div>
                                <div className='logo p-3 logo-sm d-md-none'>
                                    <span >Bonbon</span>
                                    <br />
                                    <span>Boutique</span>
                                </div>
                                <div className='mb-3 fs-3'>Ditt ordernummer är: <b className='ms-3'>#{result.data.id}</b></div>
                                <div >Du kommer att få orderinformation via e-post</div>
                                <div className='mb-3 text-center'>
                                    <div className='mb-5'>Din kundvagn är tom.</div>
                                    <AttentionSeeker effect="swing" >
                                        <Button
                                            onClick={() => {
                                                setShowConfetti(false);
                                                navigate('/products');
                                            }}
                                        >
                                            Handla nu!
                                        </Button>
                                    </AttentionSeeker>
                                </div>
                            </div>
                            : <div>Något gick fel!!!</div>
                        }
                    </div>
                    :
                    <Row>
                        <Col md={1} className="d-none d-md-flex align-items-start" style={{ paddingTop: '24px' }}>
                            <div className="me-3">
                                <div className="step-indicator">1</div>
                                <div className="step-line"></div>
                                <div className="step-indicator">2</div>
                                <div className="step-line"></div>
                                <div className="step-indicator">3</div>
                                <div className="step-line"></div>
                                <div className="step-indicator">4</div>
                            </div>
                        </Col>
                        <Col xs={12} md={7} className='p-0 pe-md-5 order-2 order-md-1'>
                            <div ref={orderInfoRef}
                                onClick={() => setOpenBlock(openBlock === 'orderInfo' ? null : 'orderInfo')}>
                                <div className='p-4 mb-4 bg-bg rounded' role='button'>
                                    <h3 className='mb-0'>Kund information</h3>
                                    {openBlock === 'orderInfo' &&
                                        <OrderFormBlock
                                            handleFormChange={handleFormChange}
                                            formData={formData}
                                        />
                                    }
                                </div>
                            </div>

                            <div ref={shippingMethodRef}
                                onClick={() => setOpenBlock(openBlock === 'shippingMethod' ? null : 'shippingMethod')}
                                className='p-4 mb-4 rounded bg-bg' role='button'>
                                <h3 className='mb-0'>Leverans metod</h3>
                                {openBlock === 'shippingMethod' &&
                                    <ShippingBlock handleFormChange={handleFormChange} formData={formData} />
                                }
                            </div>

                            <div ref={paymentRef}
                                onClick={() => setOpenBlock(openBlock === 'payment' ? null : 'payment')}
                                className='p-4 mb-4 rounded bg-bg' role='button'>
                                <h3 className='mb-0'>Betalning</h3>
                                {openBlock === 'payment' &&
                                    <PaymentBlock handleFormChange={handleFormChange}
                                        formData={formData}
                                    />}
                            </div>

                            <div
                                onClick={() => setOpenBlock(openBlock === 'review' ? null : 'review')}
                                className='p-4 mb- rounded bg-bg' role='button'>
                                <h3 className='mb-0'>Granska och lägg beställning</h3>
                                {openBlock === 'review' &&
                                    <OrderReviewBlock formData={formData} sendOrder={sendOrder} />
                                }
                            </div>
                        </Col>

                        <Col xs={12} md={4} className='secondary-bg rounded p-4 order-1 order-md-2 mb-3 mb-md-0'>
                            <OrderSummary />
                        </Col>
                    </Row>
                }

                {isPostingOrder ?
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.7)',
                        zIndex: 9999
                    }}>
                        <Container className='d-flex justify-content-center position-relative'>
                            <Spinner className='loading-spinner' />
                        </Container>
                    </div>
                    : null
                }
                <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)} className=''>
                    <Modal.Body className='position-relative text-center d-flex flex-column align-items-center justify-content-center pb-5'>
                        <IoCloseOutline className='icon-btn close position-absolute' onClick={() => setShowErrorModal(false)} />
                        <Bounce className='d-flex justify-content-center'>
                            <FaCircleXmark className='fs-1 primary-color mt-3 mb-5' />
                        </Bounce>
                        Något gick fel, prova igen
                    </Modal.Body>
                </Modal>
            </Container>
        </Container>
    );
};

export default OrderPage;