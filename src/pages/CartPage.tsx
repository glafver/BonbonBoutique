import { Table, Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { useCart } from '../hooks/useCart';
import { useState } from 'react';
import OrderModal from '../components/OrderModal';

const CartPage: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const { cartItems } = useCart();

    const navigate = useNavigate();

    return (
        <Container
            style={{
                backgroundColor: '#ffffff96',
                height: '100vh',
                padding: '20px',
                paddingLeft: '120px',
                paddingRight: '120px',
                textAlign: 'center',
                color: '#495057'
            }}>

            <Table>
                <tbody>
                    {cartItems.map((item, index) => (
                        <tr key={index}>
                            <CartItem item={item} />
                        </tr>
                    ))}
                </tbody>
            </Table>
            {cartItems.length ?
                <Button
                    variant="light"
                    style={{
                        backgroundColor: 'deeppink',
                        borderColor: 'deeppink',
                        color: 'white'
                    }}
                    onClick={handleShowModal}
                >
                    Place order
                </Button>
                : <Button
                    variant="light"
                    style={{
                        backgroundColor: 'deeppink',
                        borderColor: 'deeppink',
                        color: 'white'
                    }}
                    onClick={() => { navigate('/'); }}
                >
                    Go shopping!
                </Button>}
            <OrderModal showModal={showModal} handleCloseModal={handleCloseModal} cartItems={cartItems} />
        </Container>
    );
};

export default CartPage;