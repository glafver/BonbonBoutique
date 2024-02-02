import { useCart } from '../../hooks/useCart';
import { Row, Col } from 'react-bootstrap';

const OrderSummary = () => {

    const { cartItems } = useCart();
    const totalAmount = cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

    return (
        <div className='rounded p-1 bg-light'>
            {cartItems.map((item, index) => (

                <Row className="cart-row m-0 d-flex px-0 " key={index}>
                    <Col xs={2} >
                        <img
                            src={`https://www.bortakvall.se${item.images.thumbnail}`}
                            alt={item.name}
                            style={{ width: '50px', cursor: 'pointer' }}
                        />
                    </Col>
                    <Col xs={6}>
                        <div className='product-name' style={{ fontSize: '12px' }}>{item.name}</div>
                    </Col>
                    <Col xs={3} className='fw-bold'>
                        <div>{item.price * (item.quantity || 1)} kr</div>
                    </Col>
                </Row>

            ))}
            <Row className="justify-content-end my-4 fs-4" >
                <Col xs={8} >
                    <div>Total: </div>
                </Col>
                <Col xs={4} className='fw-bold'>
                    <div>{totalAmount} kr</div>
                </Col>
            </Row>
        </div>
    );
};

export default OrderSummary;