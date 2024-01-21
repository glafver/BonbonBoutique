import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Product } from '../types/types';
import ProductModal from './ProductModal';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { FaBasketShopping } from "react-icons/fa6";
import { BsHeart, BsFillHeartFill } from "react-icons/bs";
import StarRating from './StarRating';
import { useFav } from '../hooks/useFav';
import { toast } from 'react-toastify';
import { Fade } from "react-awesome-reveal";
import { useLocation, useNavigate } from 'react-router-dom';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

    const { addToCart } = useCart();
    const { addFav, removeFav, isProductFav } = useFav();
    const { isProductAvailable } = useProducts();
    const location = useLocation();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState<boolean>(false);

    const handleAddToCart = (product: Product) => {
        if (isProductAvailable(product.id, 1)) {
            addToCart(product.id, 1);
            toast(<div>
                <img src={`https://www.bortakvall.se` + product.images.thumbnail} alt={product.name} style={{ width: '50px', height: '50px' }} />
                <strong style={{ marginLeft: '10px' }}>{product.name}</strong>
                <br /> har lagts till i kundvagnen
            </div>);
        }
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate(location.pathname);
    };

    const handleAddFav = (id: number) => {
        addFav(id);
    };

    const handleRemoveFav = (id: number) => {
        removeFav(id);
    };

    useEffect(() => {
        if (location.state?.productId === product.id) {
            setShowModal(true);
        }
    }, [location.state?.productId, product.id]);

    return (
        <Fade triggerOnce>
            <Card className='card'>
                <div className="position-relative">
                    <Card.Img
                        variant="top"
                        src={`https://www.bortakvall.se` + product.images.thumbnail}
                        alt={product.name}
                        style={{
                            filter: !isProductAvailable(product.id)
                                ? 'opacity(20%)' : ''
                        }}
                    />
                    {!isProductAvailable(product.id) &&
                        <div className='out-of-stock'>
                            Out of stock
                        </div>
                    }
                </div>
                <Card.Body
                    style={{ paddingTop: '0px' }}
                >
                    <Card.Text
                        className='product-name'
                        onClick={handleShowModal}
                        style={{
                            height: '48px',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        {product.name}
                    </Card.Text>
                    <StarRating />
                    <div className='d-flex justify-content-between align-items-center'>
                        <div >
                            <b>{product.price} kr</b>  / 100g
                        </div>
                        {isProductAvailable(product.id) ? <FaBasketShopping onClick={() => handleAddToCart(product)} className='shop-icon icon-btn' /> : null}
                    </div>
                </Card.Body>
                {showModal &&
                    <ProductModal
                        show={showModal}
                        handleClose={handleCloseModal}
                        product={product}
                    />
                }
                {product.tags.find(tag => tag.id === 124) ? <img width="40" height="40" src="https://img.icons8.com/parakeet/96/new.png" alt="new" style={{ position: 'absolute', left: '5px', top: '5px' }} /> : null}
                {isProductFav(product.id) ? <BsFillHeartFill onClick={() => handleRemoveFav(product.id)} className='icon-btn card-fav-icon' /> : <BsHeart onClick={() => handleAddFav(product.id)} className='icon-btn card-fav-icon' />}
            </Card>
        </Fade>
    );
};

export default ProductCard;