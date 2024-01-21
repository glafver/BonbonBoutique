import { Dropdown } from 'react-bootstrap';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ProductCard from './ProductCard';
import { Product } from '../types/types';
import Col from 'react-bootstrap/Col';
import { useProducts } from '../hooks/useProducts';
import ProductsFilter from './ProductsFilter';
import { Fade } from "react-awesome-reveal";

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
            default: return 'Pris: lågt till högt';
        }
    };

    return (
        <Container className="my-5 pt-4 rounded bg-bg" >
            <div id="sort-select">
                <div style={{ fontSize: '26px', fontWeight: '500' }}>Vår sortiment</div>
                <Dropdown onSelect={handleSelect}>
                    <Dropdown.Toggle>{getDisplayText(selectedOption)}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="priceLow">Pris: lågt till högt</Dropdown.Item>
                        <Dropdown.Item eventKey="priceHigh">Pris: högt till lågt</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <Row>
                <Col md={3} >
                    <div id='products-filter-wrapper' className='rounded'>
                        <ProductsFilter />
                    </div>
                </Col>
                <Col md={9} style={{ padding: '0' }}>
                    <Row className="row-appear">
                        {filteredProducts.map((product: Product) => (

                            <Col key={product.id} xs={12} md={4} lg={3} style={{ marginBottom: '20px' }}>
                                <Fade triggerOnce>
                                    <ProductCard product={product} />
                                </Fade>
                            </Col>

                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductGrid;
