import React, { ChangeEvent, FormEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import { OrderDataType } from '../types/types';

type InputChangeEvent = ChangeEvent<HTMLInputElement>;
type FormSubmitEvent = FormEvent<HTMLFormElement>;

interface OrderFormProps {
    handleFormChange: (e: InputChangeEvent) => void;
    handleFormSubmit: (e: FormSubmitEvent) => void;
    formData: OrderDataType;
}

const OrderForm: React.FC<OrderFormProps> = ({ handleFormChange, handleFormSubmit, formData }) => {
    return (
        <Form onSubmit={handleFormSubmit} id='order-form'>
            <Form.Group style={{ marginBottom: '20px' }}>
                <Form.Label>First Name *</Form.Label>
                <Form.Control
                    className='form-control'
                    defaultValue={formData.customer_first_name}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="First Name"
                    name="customer_first_name"
                    maxLength={255}
                    required
                />
            </Form.Group>

            <Form.Group style={{ marginBottom: '20px' }}>
                <Form.Label>Last Name *</Form.Label>
                <Form.Control
                    defaultValue={formData.customer_last_name}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Last Name"
                    name="customer_last_name"
                    maxLength={255}
                    required
                />
            </Form.Group>

            <Form.Group style={{ marginBottom: '20px' }}>
                <Form.Label>Address *</Form.Label>
                <Form.Control
                    defaultValue={formData.customer_address}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Address"
                    name="customer_address"
                    maxLength={255}
                    required
                />
            </Form.Group>

            <Form.Group style={{ marginBottom: '20px' }}>
                <Form.Label>Postcode *</Form.Label>
                <Form.Control
                    defaultValue={formData.customer_postcode}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Postcode"
                    name="customer_postcode"
                    maxLength={6}
                    required
                />
            </Form.Group>

            <Form.Group style={{ marginBottom: '20px' }}>
                <Form.Label>City *</Form.Label>
                <Form.Control
                    defaultValue={formData.customer_city}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="City"
                    name="customer_city"
                    maxLength={255}
                    required
                />
            </Form.Group>

            <Form.Group style={{ marginBottom: '20px' }}>
                <Form.Label>Email *</Form.Label>
                <Form.Control
                    defaultValue={formData.customer_email}
                    onChange={handleFormChange}
                    type="email"
                    placeholder="Email"
                    name="customer_email"
                    maxLength={255}
                    required
                />
            </Form.Group>

            <Form.Group style={{ marginBottom: '20px' }}>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                    defaultValue={formData.customer_phone}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Phone"
                    name="customer_phone"
                    maxLength={255}
                />
            </Form.Group>

            <Form.Label className='mt-5'>Paying details</Form.Label>
            <div className="credit-card mb-5">
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
                            onChange={(e) => {
                                let value = e.target.value;
                                if (value.length === 2 && formData.due_date && formData.due_date.length === 1) {
                                    value += '/';
                                }
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

            <div className='d-flex justify-content-center'>
                <Button type="submit">
                    Submit Order
                </Button>
            </div>

        </Form>
    );
};

export default OrderForm;