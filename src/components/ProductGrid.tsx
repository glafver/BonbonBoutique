import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ProductCard from './ProductCard';
import { Product } from '../types/types';
import Col from 'react-bootstrap/Col';
import { useProducts } from '../hooks/useProducts';

const ProductGrid: React.FC = () => {

    const { filteredProducts } = useProducts();

    return (
        <Container style={{
            padding: '0',
            paddingTop: '20px'
        }}>
            <Row className="row-appear">
                {filteredProducts.map((product: Product) => (
                    <Col key={product.id} xs={12} md={4} lg={3} style={{ marginBottom: '20px' }}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductGrid;
