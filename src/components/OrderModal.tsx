import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Modal } from 'react-bootstrap';
import { OrderDataType, Product } from '../types/types';
import { postOrder } from '../api/api';
import OrderForm from './OrderForm';
import { IoCloseOutline } from "react-icons/io5";

interface OrderModalProps {
    showModal: boolean;
    handleCloseModal: () => void;
    cartItems: Product[];
}

type InputChangeEvent = ChangeEvent<HTMLInputElement>;

type FormSubmitEvent = FormEvent<HTMLFormElement>;

const OrderModal: React.FC<OrderModalProps> = ({ showModal, handleCloseModal, cartItems }) => {
    const [formData, setFormData] = useState<OrderDataType>({
        customer_first_name: 'test',
        customer_last_name: 'test',
        customer_address: 'test',
        customer_postcode: 'test',
        customer_city: 'test',
        customer_email: 'test@test.test',
        customer_phone: '123456789',
        card_number: '1111222233334444',
        name_on_card: 'test',
        due_date: '11/22',
        cvc: '123'
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

    return (
        <Modal show={showModal} id='order-modal'
            onHide={() => {
                resetResult();
                handleCloseModal();
            }}>
            <Modal.Body className='rounded'>
                <IoCloseOutline className='icon-btn close position-absolute' onClick={handleCloseModal} />
                {result ?
                    <div className='result-modal'>
                        {result.status === 'success' ?
                            <div>
                                <div>Tack för att du handlar hos</div>
                                <div className='order-brand mb-5'>
                                    <span> BonbonBoutique</span>
                                </div>
                                <div className='mb-5'>Ditt ordernummer är: <b>#{result.data.id}</b></div>
                                <div >Du kommer att få orderinformation via e-post</div>
                            </div>
                            : <div>Något gick fel!!!</div>}
                    </div>
                    :
                    <OrderForm
                        handleFormChange={handleFormChange}
                        handleFormSubmit={handleFormSubmit}
                        formData={formData}
                    />
                }

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
                    : null
                }
            </Modal.Body >
        </Modal >
    );
};

export default OrderModal;