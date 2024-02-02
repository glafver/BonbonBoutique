import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchProduct } from '../api/api.js';
import { ExtandedProduct } from '../types/types';
import { useQuery } from 'react-query';
import { Container, Row, Col, Image, Button, Modal, Breadcrumb } from 'react-bootstrap';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { useFav } from '../hooks/useFav';
import StarRating from '../components/products/StarRating.js';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';
import { Fade } from "react-awesome-reveal";
import { IoAdd, IoRemove, IoCloseOutline } from "react-icons/io5";
import { BsHeart, BsFillHeartFill } from "react-icons/bs";
import ProductStickers from '../components/products/ProductStickers.js';

const ProductPage: React.FC = () => {
    const { id } = useParams();
    const { data: product, isLoading, error } = useQuery<ExtandedProduct, Error>(`product-${id}`, () => fetchProduct(Number(id) || 0));

    const { addToCart } = useCart();
    const { changeCategories, isProductAvailable } = useProducts();
    const { addFav, removeFav, isProductFav } = useFav();

    const [quantity, setQuantity] = useState<number>(1);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const handleTagClick = (id: number) => {
        setQuantity(1);
        changeCategories(id, true);
        navigate('/products');
    };

    const handleRemoveQuantity = () => {
        quantity > 1 ? setQuantity(quantity - 1) : null;
    };

    const handleAddQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleImageClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAddToCart = (product: ExtandedProduct) => {
        addToCart(product.id, quantity);
        toast(<div>
            <img src={`https://www.bortakvall.se` + product.images.thumbnail} alt={product.name} style={{ width: '50px', height: '50px' }} />
            <strong style={{ marginLeft: '10px' }}>{product.name}</strong>
            <br /> har lagts till i kundvagnen
        </div>);
    };

    const handleAddFav = (id: number) => {
        addFav(id);
    };

    const handleRemoveFav = (id: number) => {
        removeFav(id);
    };

    return (
        <Container id='product-page' className='my-4 page-wrapper'>
            <Breadcrumb className='ps-2'>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Hem</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/products" }}>Produkter</Breadcrumb.Item>
                <Breadcrumb.Item active>{product?.name}</Breadcrumb.Item>
            </Breadcrumb>
            <Container className="py-4 rounded bg-bg" >
                {isLoading ? (
                    <Container className="d-flex justify-content-center position-relative" style={{ height: '70vh' }}>
                        <Spinner className='loading-spinner' />
                    </Container>
                ) : error ? (
                    <p>Error: {error.message}</p>
                ) : product ? (
                    <Fade triggerOnce>
                        <Row >
                            <Col lg={5} md={12} sm={12} className='mb-4 mb-lg-0 h-100'>

                                <div className='modal-img p-4 rounded position-relative h-100'>
                                    <Image
                                        src={`https://www.bortakvall.se${product.images.large}`}
                                        onClick={handleImageClick}
                                        alt={product.name}
                                        style={{
                                            filter: !isProductAvailable(product.id)
                                                ? 'opacity(20%)' : ''
                                        }}
                                        fluid
                                    />
                                    {!isProductAvailable(product.id) &&
                                        <div className='out-of-stock'>
                                            Out of stock
                                        </div>
                                    }
                                    <ProductStickers product={product} />
                                    {isProductFav(product.id)
                                        ? <BsFillHeartFill onClick={() => handleRemoveFav(product.id)} className='icon-btn card-fav-icon' />
                                        : <BsHeart onClick={() => handleAddFav(product.id)} className='icon-btn card-fav-icon' />}
                                </div>
                            </Col>
                            <Col lg={7} md={12} sm={12} >
                                <div className='modal-text p-4 rounded'>
                                    <h3 >{product.name}</h3>
                                    <StarRating rating={product.rating} />
                                    <div className='my-3'>
                                        {product.tags.map((tag, index) => (
                                            <div key={tag.id}>
                                                <span
                                                    key={tag.id}
                                                    style={{ fontSize: '12px', fontStyle: 'italic', cursor: 'pointer', textDecoration: 'underline' }}
                                                    onClick={() => handleTagClick(tag.id)}
                                                >
                                                    {tag.name}
                                                </span>
                                                {index !== product.tags.length - 1 && <span>, </span>}
                                            </div>
                                        ))}
                                    </div>
                                    <div className='modal-description' dangerouslySetInnerHTML={{ __html: product.description }} />
                                    <div className='modal-add-wrapper'>
                                        <div >
                                            <b>{product.price} kr</b>  / 100g
                                        </div>
                                        {isProductAvailable(product.id) ?
                                            <>
                                                <div className="d-flex justify-content-between align-items-center" style={{ width: '100px' }}>
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
                                                    onClick={() => handleAddToCart(product)}
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
                        <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
                            <IoCloseOutline className='product-page icon-btn close position-absolute' onClick={handleCloseModal} />
                            <Modal.Body className="d-flex justify-content-center">
                                <Image src={`https://www.bortakvall.se${product?.images.large}`} fluid />
                            </Modal.Body>
                        </Modal>
                    </Fade>
                ) : null}
            </Container>
        </Container>
    );
};

export default ProductPage;