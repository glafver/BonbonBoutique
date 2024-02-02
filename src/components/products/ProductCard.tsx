import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { FaBasketShopping } from "react-icons/fa6";
import { BsHeart, BsFillHeartFill } from "react-icons/bs";
import { Fade } from "react-awesome-reveal";
import { toast } from 'react-toastify';
import { Product } from '../../types/types';
import { useCart } from '../../hooks/useCart';
import { useProducts } from '../../hooks/useProducts';
import { useFav } from '../../hooks/useFav';
import StarRating from './StarRating';
import ProductStickers from './ProductStickers';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

    const { addToCart } = useCart();
    const { addFav, removeFav, isProductFav } = useFav();
    const { isProductAvailable } = useProducts();
    const navigate = useNavigate();

    const handleAddToCart = (product: Product) => {
        if (isProductAvailable(product.id, 1)) {
            addToCart(product.id, 1);
            toast(<div>
                <img src={`https://www.bortakvall.se` + product.images.thumbnail} alt={product.name} width="50" height="50" />
                <strong className='ms-2' >{product.name}</strong>
                <br /> har lagts till i kundvagnen
            </div>);
        }
    };

    const handleShowProductPage = () => {
        navigate(`/product/${product.id}`);
    };

    const handleAddFav = (id: number) => {
        addFav(id);
    };

    const handleRemoveFav = (id: number) => {
        removeFav(id);
    };

    return (
        <Fade triggerOnce>
            <Card className='card'>
                <div className="position-relative" onClick={handleShowProductPage}>
                    <Card.Img
                        variant="top"
                        src={`https://www.bortakvall.se` + product.images.thumbnail}
                        alt={product.name}
                        style={{
                            cursor: 'pointer',
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
                <Card.Body className='pt-0'>
                    <Card.Text
                        className='product-name'
                        onClick={handleShowProductPage}
                        style={{
                            height: '48px',
                            fontSize: '14px'
                        }}
                    >
                        {product.name}
                    </Card.Text>
                    <StarRating rating={product.rating} />
                    <div className='d-flex justify-content-between align-items-center'>
                        <div >
                            <b>{product.price} kr</b>  / 100g
                        </div>
                        {isProductAvailable(product.id) ? <FaBasketShopping onClick={() => handleAddToCart(product)} className='shop-icon icon-btn' /> : null}
                    </div>
                </Card.Body>
                <ProductStickers product={product} />
                {isProductFav(product.id)
                    ? <BsFillHeartFill onClick={() => handleRemoveFav(product.id)} className='icon-btn card-fav-icon' />
                    : <BsHeart onClick={() => handleAddFav(product.id)} className='icon-btn card-fav-icon' />}
            </Card>
        </Fade>
    );
};

export default ProductCard;