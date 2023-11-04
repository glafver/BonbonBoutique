import React, { ChangeEvent, FormEvent } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
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
        <Modal.Body style={{ minHeight: '684px' }}>
            <Form onSubmit={handleFormSubmit} id='bk-order-form'>
                <Form.Group style={{ marginBottom: '20px' }}>
                    <Form.Label>First Name *</Form.Label>
                    <Form.Control
                        className='bk-form-control'
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
                <Button type="submit" style={{ backgroundColor: 'powderblue', borderColor: 'powderblue' }}>
                    Submit Order
                </Button>
            </Form>
        </Modal.Body>
    );
};

export default OrderForm;