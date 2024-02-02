import React, { ChangeEvent } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { OrderDataType } from '../../types/types';
import { shippingMethods } from '../../helpers/data';

type InputChangeEvent = ChangeEvent<HTMLInputElement>;

interface ShippingMethodProps {
    handleFormChange: (e: InputChangeEvent) => void;
    formData: OrderDataType;
}

const ShippingBlock: React.FC<ShippingMethodProps> = ({ handleFormChange, formData }) => {

    const assignShippingMethod = (value: string) => {
        const e = { target: { name: 'shipping_method', value } };
        handleFormChange(e as InputChangeEvent);
    };

    return (
        <Form onClick={(e) => e.stopPropagation()}>
            {shippingMethods.map((method) => (
                <div key={method.value} className="mt-3">
                    <Form.Check
                        type="radio"
                        name="shipping_method"
                        id={method.value}
                        onChange={() => assignShippingMethod(method.value)}
                        checked={formData.shipping_method === method.value}
                        label={
                            <Row className='' style={{ width: '300px' }}>
                                <Col xs={4} className='me-2'><img src={method.image} alt={method.label} style={{ height: '15px' }} /></Col>
                                <Col xs={4} className="me-2 d-none d-md-block"><span>{method.label}</span></Col>
                                <Col xs={4} className="me-2 fw-bold"><span>{method.price} kr</span></Col>
                            </Row>
                        }
                    />
                </div>
            ))}
        </Form>
    );
};

export default ShippingBlock;