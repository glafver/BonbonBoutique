import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { OrderDataType } from '../types/types';
import { CartItemType } from '../types/types';
import { postOrder } from '../api/api';
import Spinner from 'react-bootstrap/Spinner';
import OrderForm from './OrderForm';
import Navbar from 'react-bootstrap/Navbar';

interface OrderModalProps {
    showModal: boolean;
    handleCloseModal: () => void;
    cartItems: CartItemType[];
}

type InputChangeEvent = ChangeEvent<HTMLInputElement>;

type FormSubmitEvent = FormEvent<HTMLFormElement>;

const OrderModal: React.FC<OrderModalProps> = ({ showModal, handleCloseModal, cartItems }) => {
    const [formData, setFormData] = useState<OrderDataType>({
        customer_first_name: '',
        customer_last_name: '',
        customer_address: '',
        customer_postcode: '',
        customer_city: '',
        customer_email: '',
        customer_phone: ''
    });

    const [result, setResult] = useState<{ status: string, data: { id: number; }; } | null>(null);
    const [isPostingOrder, setIsPostingOrder] = useState<boolean | null>(null);

    useEffect(() => {
        const savedData = localStorage.getItem('customerData');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    const handleFormChange = (e: InputChangeEvent) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        localStorage.setItem('customerData', JSON.stringify(formData));
    };

    const handleFormSubmit = async (e: FormSubmitEvent) => {
        e.preventDefault();

        formData.order_items = cartItems.map((item) => ({
            product_id: item.id,
            qty: item.quantity,
            item_price: item.price,
            item_total: item.quantity * item.price,
        }));
        formData.order_total = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
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

    return (
        <Modal show={showModal} onHide={() => {
            resetResult();
            handleCloseModal();
        }}>
            <Modal.Header closeButton
                style={{
                    backgroundColor: 'LightGoldenrodYellow'
                }}>
                <Modal.Title></Modal.Title>
            </Modal.Header>

            {isPostingOrder ?
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.7)',
                }}>
                </div>
                : null}

            {result ?
                (<>
                    <Modal.Body style={{ minHeight: '626px' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(255, 255, 255, 0.7)',
                        }}>
                            {result.status === 'success'
                                ? <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '30px', marginBottom: '30px' }}>Thank you for shopping at</div>
                                    <Navbar.Brand
                                        style={{
                                            display: 'flex',
                                            cursor: 'pointer'
                                        }}>
                                        <img
                                            width="64"
                                            height="64"
                                            src="https://img.icons8.com/arcade/64/sweets.png"
                                            alt="sweets"
                                            style={{
                                                marginRight: '10px'
                                            }} />
                                        <div style={{
                                            fontFamily: "'Modak', sans-serif",
                                            fontSize: '50px',
                                            color: 'deeppink'
                                        }}>
                                            <span className="bk-color-changing"> BORTAKVÄLL</span>
                                        </div>
                                    </Navbar.Brand>
                                    <div style={{ fontSize: '30px', marginTop: '30px' }}>Your order number is: <b>#{result.data.id}</b></div>
                                </div>
                                : <div style={{ fontSize: '30px' }}>Something went wrong!!!</div>}
                        </div>
                    </Modal.Body>
                    <Modal.Footer
                        style={{
                            backgroundColor: 'LightGoldenrodYellow'
                        }}>
                        <Button variant="light"
                            style={{
                                backgroundColor: 'pink',
                                borderColor: 'pink'
                            }} onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </>)
                :
                (<OrderForm
                    handleFormChange={handleFormChange}
                    handleFormSubmit={handleFormSubmit}
                    formData={formData}
                />)
            }
        </Modal>
    );
};

export default OrderModal;