import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/ProductGrid';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductsPage: React.FC = () => {

    const { error, isLoading } = useProducts();

    if (isLoading) {
        return (
            <Container id='products-page' className='my-5'>

                <Container id='products-page'
                    className="my-5 pt-4 rounded bg-bg d-flex justify-content-center position-relative"
                    style={{ height: '90vh' }}>
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
            <Breadcrumb className='ps-2'>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Hem</Breadcrumb.Item>
                <Breadcrumb.Item active>Produkter</Breadcrumb.Item>
            </Breadcrumb>
            <ProductGrid />
        </Container>
    );
};

export default ProductsPage;