import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { OrderDataType } from '../../types/types';
import { FaTruck } from 'react-icons/fa';
import { FaBoxesPacking } from "react-icons/fa6";
import { BsCreditCard } from 'react-icons/bs';
import { shippingMethods, paymentMethods } from '../../helpers/data';

interface OrderReviewProps {
    formData: OrderDataType;
    sendOrder: () => void;
}

const OrderReviewBlock: React.FC<OrderReviewProps> = ({ formData, sendOrder }) => {
    const shippingMethod = shippingMethods.find(method => method.value === formData.shipping_method);
    const paymentMethod = paymentMethods.find(method => method.value === formData.payment_method);

    return (
        <div>
            <Row className='mt-4'>
                <Col md={6}>
                    <p className='fw-bold'> <FaTruck className='me-md-2' /> Leverans information</p>
                    <p>{formData.customer_first_name} {formData.customer_last_name}</p>
                    <p>{formData.customer_address} </p>
                    <p>{formData.customer_city} {formData.customer_postcode}</p>
                    <p>{formData.customer_email}</p>
                    <p>{formData.customer_phone}</p>
                </Col>
                <Col md={6}>
                    <p className='fw-bold'> <FaBoxesPacking className='me-md-2' /> Leverans metod</p>
                    <div className='d-flex align-items-center mb-3'>
                        {shippingMethod?.image && <img src={shippingMethod.image} alt={shippingMethod.label} style={{ height: '15px' }} className="me-3 align-self-center" />}
                        <div>{shippingMethod?.label}</div>
                    </div>
                    <p className='fw-bold'> <BsCreditCard className='me-2' /> Betalnings information</p>
                    <p>{formData.name_on_card}</p>
                    <div className='d-flex align-items-center mb-3'>
                        {paymentMethod?.image && <img src={paymentMethod.image} alt={paymentMethod.label} style={{ height: '40px' }} className="me-3 align-self-center" />}
                        <div>*** **** **** {formData.card_number ? formData.card_number.slice(-4) : ''}</div>
                    </div>
                    <p>{formData.due_date}</p>
                </Col>
            </Row>
            <div className='d-flex justify-content-center mt-4'>
                <Button onClick={sendOrder}>Beställ</Button>
            </div>
        </div>
    );
};

export default OrderReviewBlock;