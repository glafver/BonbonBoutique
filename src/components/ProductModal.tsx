import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { IoCloseOutline, IoAdd, IoRemove } from "react-icons/io5";
import { BsHeart, BsFillHeartFill } from "react-icons/bs";
import { Fade } from "react-awesome-reveal";
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import { fetchProduct } from '../api/api.js';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { useFav } from '../hooks/useFav';
import { Product, ExtandedProduct } from '../types/types';
import StarRating from './StarRating.js';

interface ProductModalProps {
    show: boolean;
    handleClose: () => void;
    product: Product;
}

const ProductModal: React.FC<ProductModalProps> = ({ show, handleClose, product }) => {

    const { addToCart } = useCart();
    const { changeCategories, isProductAvailable } = useProducts();
    const { addFav, removeFav, isProductFav } = useFav();

    const { data, isLoading, error } = useQuery<ExtandedProduct, Error>(`product-${product.id}`, () => fetchProduct(product.id));

    const [quantity, setQuantity] = useState<number>(1);

    const navigate = useNavigate();

    const handleCloseModal = () => {
        setQuantity(1);
        handleClose();
    };

    const handleTagClick = (id: number) => {
        setQuantity(1);
        handleClose();
        changeCategories(id, true);
        navigate('/products');
    };

    const handleRemoveQuantity = () => {
        quantity > 1 ? setQuantity(quantity - 1) : null;
    };

    const handleAddQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleAddToCart = () => {
        addToCart(product.id, quantity);
        toast(<div>
            <img src={`https://www.bortakvall.se` + product.images.thumbnail} alt={product.name} style={{ width: '50px', height: '50px' }} />
            <strong style={{ marginLeft: '10px' }}>{product.name}</strong>
            <br /> har lagts till i kundvagnen
        </div>);
        handleCloseModal();
    };

    const handleAddFav = (id: number) => {
        addFav(id);
    };

    const handleRemoveFav = (id: number) => {
        removeFav(id);
    };

    return (
        <Modal show={show} onHide={handleCloseModal} id='product-modal'  >
            <Modal.Body className='rounded py-4 px-3'>
                <IoCloseOutline className='icon-btn close position-absolute' onClick={handleCloseModal} />
                {isLoading ? (
                    <Container style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                        <Spinner className='loading-spinner' />
                    </Container>
                ) : error ? (
                    <p>Error: {error.message}</p>
                ) : data ? (
                    <Row >
                        <Col lg={5} md={12} sm={12} className='mb-4 mb-lg-0'>
                            <Fade triggerOnce>
                                <div className='modal-img p-4 rounded position-relative'>
                                    <Image
                                        src={`https://www.bortakvall.se${data.images.large}`}
                                        alt={data.name}
                                        style={{
                                            filter: !isProductAvailable(product.id)
                                                ? 'opacity(20%)' : '',
                                            maxWidth: '100%',
                                            objectFit: 'contain'
                                        }}
                                        fluid
                                    />
                                    {!isProductAvailable(product.id) &&
                                        <div className='out-of-stock'>
                                            Out of stock
                                        </div>
                                    }
                                    <div style={{ position: 'absolute', left: '5px', top: '5px', display: 'flex', gap: '5px' }}>
                                        {product.on_sale ? <img width="40" height="40" src="https://img.icons8.com/parakeet/96/sale.png" alt="sale" /> : null}
                                        {product.tags.find(tag => tag.id === 124) ? <img width="40" height="40" src="https://img.icons8.com/parakeet/96/new.png" alt="new" /> : null}
                                    </div>
                                    {isProductFav(product.id) ? <BsFillHeartFill onClick={() => handleRemoveFav(product.id)} className='icon-btn card-fav-icon' /> : <BsHeart onClick={() => handleAddFav(product.id)} className='icon-btn card-fav-icon' />}
                                </div>
                            </Fade>
                        </Col>
                        <Col lg={7} md={12} sm={12} >
                            <div className='modal-text p-4 rounded'>
                                <h3 >{data.name}</h3>
                                <StarRating />
                                <div style={{ fontSize: '12px', height: '18px', marginBottom: '16px', marginTop: '10px', userSelect: 'none' }}>
                                    {product.tags.map((tag, index) => (
                                        <>
                                            <span
                                                key={tag.id}
                                                style={{ fontStyle: 'italic', cursor: 'pointer', textDecoration: 'underline' }}
                                                onClick={() => handleTagClick(tag.id)}
                                            >
                                                {tag.name}
                                            </span>
                                            {index !== product.tags.length - 1 && <span>, </span>}
                                        </>
                                    ))}
                                </div>
                                <div className='modal-description' dangerouslySetInnerHTML={{ __html: data.description }} />
                                <div className='modal-add-wrapper'>
                                    <div >
                                        <b>{product.price} kr</b>  / 100g
                                    </div>
                                    {isProductAvailable(product.id) ?
                                        <>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100px' }}>
                                                <IoRemove className='icon-btn add' onMouseDown={(e: React.MouseEvent) => e.preventDefault()} onClick={() => handleRemoveQuantity()} />
                                                <span style={{ fontWeight: 'bold' }}>{quantity}</span>
                                                <IoAdd
                                                    className={`icon-btn add`}
                                                    style={{
                                                        color: !isProductAvailable(product.id, quantity + 1) && 'lightgrey',
                                                        cursor: !isProductAvailable(product.id, quantity + 1) && 'none',
                                                        pointerEvents: !isProductAvailable(product.id, quantity + 1) && 'none'
                                                    }}
                                                    onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
                                                    onClick={() => handleAddQuantity()} />
                                            </div>

                                            <Button
                                                onClick={() => handleAddToCart()}
                                                className='add-to-cart-btn'
                                            >
                                                {'Lägg till i korgen'}
                                            </Button>
                                        </>
                                        : null
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                ) : null}
            </Modal.Body>
        </Modal >
    );
};

export default ProductModal;