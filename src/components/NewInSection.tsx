import React, { useState } from 'react';
import { Col, Button, Container } from 'react-bootstrap';
import { useProducts } from '../hooks/useProducts';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ProductCard from './ProductCard';

const NewIn: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const { newProducts: products } = useProducts();

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 4 : 0));
    };

    const handleNext = () => {
        if (currentIndex < products.length - 4) {
            setCurrentIndex((prevIndex) => prevIndex + 4);
        }
    };

    const renderPaginationDots = () => {
        const numberOfDots = Math.ceil(products.length / 4);
        return [...Array(numberOfDots)].map((_, idx) => (
            <span
                key={idx}
                onClick={() => setCurrentIndex(idx * 4)}
                className={`dot ${currentIndex / 4 === idx ? 'active' : ''}`}
                style={{ cursor: 'pointer' }}
            ></span>
        ));
    };

    const cardWrapperStyle = {
        transform: `translateX(-${currentIndex / 4 * 100}%)`,
        transition: 'transform 0.5s ease',
        display: 'flex',
    };

    return (
        <Container id='new-in-section' className='my-5 py-5 rounded'>
            <h3 style={{ paddingLeft: '10px', marginBottom: '36px' }}>Prova Våra Söta Nyheter</h3>
            <div style={{ position: 'relative' }}>
                <div style={{ overflow: 'hidden' }}>
                    <div style={cardWrapperStyle}>
                        {products.map((product, index) => (
                            <Col key={index} md={3} className='border-none px-1'>
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </div>
                </div>
                <Button variant="primary" onClick={handlePrev} disabled={currentIndex === 0} className='rounded-circle arrow-button' style={{ left: '-55px' }}>
                    <IoIosArrowBack />
                </Button>
                <Button variant="primary" onClick={handleNext} disabled={currentIndex >= products.length - 4} className='rounded-circle arrow-button' style={{ right: '-55px' }}>
                    <IoIosArrowForward />
                </Button>
            </div>
            <div className="pagination-dots-container">
                {renderPaginationDots()}
            </div>
        </ Container>
    );
};

export default NewIn;
