import React, { ChangeEvent } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { OrderDataType } from '../../types/types';

type InputChangeEvent = ChangeEvent<HTMLInputElement>;

interface OrderFormProps {
    handleFormChange: (e: InputChangeEvent) => void;
    formData: OrderDataType;
}

const OrderFormBlock: React.FC<OrderFormProps> = ({ handleFormChange, formData }) => {
    return (

        <Form id='order-form' className='mt-3' onClick={(e) => e.stopPropagation()}>
            <Row>
                <Col md={6} className='p-0 pe-md-3 mb-md-3'>
                    <Form.Group >
                        <Form.Label>Förnamn *</Form.Label>
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
                </Col>
                <Col md={6} className='p-0'>
                    <Form.Group >
                        <Form.Label>Efternamn *</Form.Label>
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
                </Col>

                <Form.Group className='p-0 mb-md-3'>
                    <Form.Label>Adress *</Form.Label>
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
                <Col md={6} className='p-0 pe-md-3 mb-md-3'>
                    <Form.Group >
                        <Form.Label>Postnummer *</Form.Label>
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
                </Col>
                <Col md={6} className='p-0'>
                    <Form.Group >
                        <Form.Label>Ort *</Form.Label>
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
                </Col>
                <Col md={6} className='p-0 pe-md-3 mb-md-3'>
                    <Form.Group >
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
                </Col>
                <Col md={6} className='p-0'>
                    <Form.Group >
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
                </Col>
            </Row>
        </Form >

    );
};

export default OrderFormBlock;