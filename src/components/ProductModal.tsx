import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import { useQuery } from 'react-query';
import { Product, ExtandedProduct } from '../types/types';
import { fetchProduct } from '../api/api.js';
import { useProducts } from '../hooks/useProducts';

interface ProductModalProps {
    show: boolean;
    handleClose: () => void;
    product: Product;
    handleAddToCart: (product: Product) => void;
    isAvailable: boolean;
    isAdded: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({ show, handleClose, product, handleAddToCart, isAvailable, isAdded }) => {

    const { filterProducts } = useProducts();
    const { data, isLoading, error } = useQuery<ExtandedProduct, Error>(`product-${product.id}`, () => fetchProduct(product.id));

    const handleTagClick = (id: number, name: string) => {
        handleClose();
        filterProducts(id, name);
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" id='bk-product-modal' >
            <Modal.Header closeButton
                style={{
                    backgroundColor: 'LightGoldenrodYellow'
                }}>
                <Modal.Title>More Information</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: '0' }}>
                {isLoading ? (
                    <Container style={{ display: 'flex', justifyContent: 'center', position: 'relative', height: '50vh' }}><Spinner style={{ position: 'absolute', top: '50%', left: '50%', color: 'deeppink' }} /></Container>
                ) : error ? (
                    <p>Error: {error.message}</p>
                ) : data ? (
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12" style={{ padding: '0', position: 'relative', display: 'flex' }}>
                            <img
                                src={`https://www.bortakvall.se${data.images.large}`}
                                alt={data.name}
                                style={{
                                    filter: (!isAvailable)
                                        ? 'opacity(20%)' : '',
                                    maxWidth: '100%',
                                    objectFit: 'contain'
                                }}
                            />
                            {!isAvailable && <div style={{ position: 'absolute', fontSize: '50px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>Out of stock</div>}
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12" style={{ padding: '24px', backgroundColor: '#f9f7fb' }}>
                            <h3>{data.name}</h3>
                            <div dangerouslySetInnerHTML={{ __html: data.description }} />
                            <p style={{ fontWeight: 'bold' }}>{data.price} kr</p>
                            <div style={{ fontSize: '12px', height: '18px', marginBottom: '16px' }}>
                                {product.tags.map((tag, index) => (
                                    <React.Fragment key={tag.id}>
                                        <span
                                            key={tag.id}
                                            style={{ fontStyle: 'italic', cursor: 'pointer', textDecoration: 'underline' }}
                                            onClick={() => handleTagClick(tag.id, tag.name)}
                                        >
                                            {tag.name}
                                        </span>
                                        {index !== product.tags.length - 1 && <span>, </span>}
                                    </React.Fragment>
                                ))}
                            </div>

                            <Button
                                disabled={!isAvailable || isAdded}
                                variant="light"
                                onClick={() => handleAddToCart(product)}
                                style={{
                                    width: '160px',
                                    backgroundColor: isAdded ? 'deeppink' : '#9ee5c0',
                                    borderColor: isAdded ? 'deeppink' : '#9ee5c0',
                                    color: isAdded ? 'white' : '',
                                }}
                            >
                                {isAdded ? 'Added To Cart' : 'Add to Cart'}
                            </Button>
                        </div>
                    </div>
                ) : null}
            </Modal.Body>
            <Modal.Footer
                style={{
                    backgroundColor: 'LightGoldenrodYellow'
                }}>
                <Button variant="light"
                    style={{
                        backgroundColor: 'pink',
                        borderColor: 'pink'
                    }}
                    onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal >
    );
};

export default ProductModal;
