import React, { ChangeEvent, useState } from 'react';
import { OrderDataType } from '../../types/types';
import { Form, Col } from 'react-bootstrap';
import { paymentMethods } from '../../helpers/data';

type InputChangeEvent = ChangeEvent<HTMLInputElement>;

interface OrderFormProps {
    handleFormChange: (e: InputChangeEvent) => void;
    formData: OrderDataType;
}

const Payment: React.FC<OrderFormProps> = ({ handleFormChange, formData }) => {
    const [dueDate, setDueDate] = useState(formData.due_date || '');

    const assignPaymentMethod = (value: string) => {
        const e = { target: { name: 'payment_method', value } };
        handleFormChange(e as InputChangeEvent);
    };

    return (
        <div id='payment-form'>
            <Form onClick={(e) => e.stopPropagation()} className='d-flex'>
                {paymentMethods.map((method) => (
                    <div key={method.value} className="mt-3">
                        <Form.Check
                            type="radio"
                            name="payment_method"
                            id={method.value}
                            onChange={() => assignPaymentMethod(method.value)}
                            checked={formData.payment_method === method.value}
                            label={
                                <Col xs={4}><img src={method.image} alt={method.label} style={{ height: '40px' }} className='me-2' /></Col>
                            }
                        />
                    </div>
                ))}
            </Form>
            <Form className='mt-3' onClick={(e) => e.stopPropagation()}>
                <div className="credit-card">
                    <Form.Group style={{ marginBottom: '20px' }}>
                        <Form.Label>Card Number *</Form.Label>
                        <Form.Control
                            defaultValue={formData.card_number}
                            onChange={handleFormChange}
                            type="text"
                            placeholder="Card Number"
                            name="card_number"
                            maxLength={16}
                            required
                        />
                    </Form.Group>

                    <Form.Group style={{ marginBottom: '20px' }}>
                        <Form.Label>Name on Card *</Form.Label>
                        <Form.Control
                            defaultValue={formData.name_on_card}
                            onChange={handleFormChange}
                            type="text"
                            placeholder="Name on Card"
                            name="name_on_card"
                            maxLength={255}
                            required
                        />
                    </Form.Group>

                    <div className="card-details">
                        <Form.Group style={{ marginBottom: '20px', marginRight: '20px' }}>
                            <Form.Label>Due Date *</Form.Label>
                            <Form.Control
                                defaultValue={formData.due_date}
                                value={dueDate}
                                onChange={(e) => {
                                    let value = e.target.value;
                                    value = value.replace(/\D/g, "");
                                    value = value.replace(/(\d{2})(?=\d)/g, "$1/");
                                    if (value.length === 2 && dueDate[dueDate.length - 1] !== '/') {
                                        value = value + "/";
                                    }
                                    setDueDate(value);
                                    const event = {
                                        target: {
                                            name: e.target.name,
                                            value,
                                        },
                                        preventDefault: () => { },
                                        stopPropagation: () => { },
                                    } as React.ChangeEvent<HTMLInputElement>;
                                    handleFormChange(event);
                                }}
                                type="text"
                                placeholder="MM/YY"
                                name="due_date"
                                maxLength={5}
                                required
                            />
                        </Form.Group>

                        <Form.Group style={{ marginBottom: '20px' }}>
                            <Form.Label>CVC *</Form.Label>
                            <Form.Control
                                defaultValue={formData.cvc}
                                onChange={handleFormChange}
                                type="text"
                                placeholder="CVC"
                                name="cvc"
                                maxLength={3}
                                required
                            />
                        </Form.Group>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default Payment;