import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Product } from '../types/types';
import ProductModal from './ProductModal';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

    const { addToCart } = useCart();
    const { isProductAvialiable } = useProducts();

    const [isAvailable, setIsAvailable] = useState<boolean>(isProductAvialiable(product.id));
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isAdded, setIsAdded] = useState<boolean>(false);

    const handleAddToCart = (product: Product) => {
        if (isProductAvialiable(product.id)) {
            addToCart(product);
            if (!isProductAvialiable(product.id)) {
                setIsAvailable(false);
            }
            setIsAdded(true);
            setTimeout(() => {
                setIsAdded(false);
            }, 700);
        } else {
            setIsAvailable(false);
        }
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Card style={{
            height: '100%',
            alignItems: 'center',
            boxShadow: '0 6px 10px rgba(0,0,0,.11)',
            border: '0'
        }}>
            <div style={{ position: 'relative', width: '100%' }}>
                <Card.Img
                    variant="top"
                    src={`https://www.bortakvall.se` + product.images.thumbnail}
                    alt={product.name}
                    style={{
                        filter: (!isAvailable)
                            ? 'opacity(20%)' : ''
                    }} />
                {!isAvailable &&
                    <div
                        style={{
                            position: 'absolute',
                            fontSize: '25px',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center'
                        }}>
                        Out of stock
                    </div>
                }
            </div>
            <Card.Body style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                backgroundColor: 'pink',
                filter: (!isAvailable)
                    ? 'opacity(20%)' : '',
                textAlign: 'center',
                borderBottomLeftRadius: '5px',
                borderBottomRightRadius: '5px'
            }}>
                <Card.Title onClick={handleShowModal}
                    className='bk-card-title'
                    style={{
                        marginBottom: '0',
                        height: '48px',
                        cursor: 'pointer'
                    }}>{product.name}</Card.Title>
                <Card.Text style={{ fontWeight: 'bold' }}>
                    {product.price} kr
                </Card.Text>
                <Button
                    disabled={!isAvailable || isAdded}
                    variant="light"
                    onClick={() => handleAddToCart(product)}
                    style={{
                        width: '160px',
                        backgroundColor: isAdded ? 'deeppink' : 'powderblue',
                        borderColor: isAdded ? 'deeppink' : 'powderblue',
                        color: isAdded ? 'white' : '',
                    }}
                >
                    {isAdded ? 'Added To Cart' : 'Add to Cart'}
                </Button>
            </Card.Body>
            {showModal &&
                <ProductModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    product={product}
                    handleAddToCart={handleAddToCart}
                    isAvailable={isAvailable}
                    isAdded={isAdded}
                />
            }
            {product.tags.find(tag => tag.id === 124) ? <img width="70" height="70" src="https://img.icons8.com/parakeet/96/new.png" alt="new" style={{ position: 'absolute', left: '0' }} /> : null}
        </Card>
    );
};

export default ProductCard;