import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/ProductGrid';

const ProductsPage = () => {

    const { error, isLoading } = useProducts();

    if (isLoading) {
        return (
            <Container
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                    height: '90vh'
                }}>
                <Spinner
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        color: 'deeppink'
                    }} />
            </Container>
        );
    }

    if (error) {
        return (
            <Container>Error: {error.message}</Container>
        );
    }

    return (
        <ProductGrid />
    );
};

export default ProductsPage;