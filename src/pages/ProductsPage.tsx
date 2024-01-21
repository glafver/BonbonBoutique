import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/ProductGrid';

const ProductsPage: React.FC = () => {

    const { error, isLoading } = useProducts();

    if (isLoading) {
        return (
            <Container id='products-page' className='my-5'>
                <Container id='products-page'
                    className='my-5 pt-4 rounded bg-bg'
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        position: 'relative',
                        height: '90vh'
                    }}>
                    <Spinner className='loading-spinner' />
                </Container>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>Error: {error.message}</Container>
        );
    }

    return (
        <Container id='products-page' className='my-5'>
            <ProductGrid />
        </Container>
    );
};

export default ProductsPage;