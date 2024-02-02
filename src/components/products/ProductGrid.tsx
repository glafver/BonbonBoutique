import React, { useState } from 'react';
import { Container, Col, Row, Dropdown } from 'react-bootstrap';
import ProductCard from './ProductCard';
import ProductsFilter from './ProductsFilter';
import { useProducts } from '../../hooks/useProducts';
import { Product } from '../../types/types';

const ProductGrid: React.FC = () => {

    const { filteredProducts, changeSortOption } = useProducts();

    const [selectedOption, setSelectedOption] = useState('Pris: lågt till högt');

    const handleSelect = (eventKey: string | null) => {
        if (eventKey) {
            changeSortOption(eventKey);
            setSelectedOption(eventKey);
        }
    };

    const getDisplayText = (key: string) => {
        switch (key) {
            case 'priceLow': return 'Pris: lågt till högt';
            case 'priceHigh': return 'Pris: högt till lågt';
            case 'ratingLow': return 'Betyg: lågt till högt';
            case 'ratingHigh': return 'Betyg: högt till lågt';
            default: return 'Pris: lågt till högt';
        }
    };

    return (
        <Container className="pt-4 rounded bg-bg" >
            <div id="sort-select">
                <h3>Vår sortiment</h3>
                <Dropdown onSelect={handleSelect}>
                    <Dropdown.Toggle>{getDisplayText(selectedOption)}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="priceLow">Pris: lågt till högt</Dropdown.Item>
                        <Dropdown.Item eventKey="priceHigh">Pris: högt till lågt</Dropdown.Item>
                        <Dropdown.Item eventKey="ratingLow">Betyg: lågt till högt</Dropdown.Item>
                        <Dropdown.Item eventKey="ratingHigh">Betyg: högt till lågt</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <Row >
                <Col md={3} >
                    <div id='products-filter-wrapper' className='rounded mb-4'>
                        <ProductsFilter />
                    </div>
                </Col>
                <Col md={9} className='p-0'>
                    <Row>
                        {filteredProducts.map((product: Product) => (
                            <Col key={product.id} xs={6} md={4} lg={3} className="mb-4">
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductGrid;