import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/products/ProductGrid';
import { Breadcrumb, Container, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductsPage: React.FC = () => {

    const { error, isLoading } = useProducts();

    if (isLoading) {
        return (
            <Container id='products-page' className='my-4 page-wrapper'>
                <Container
                    className="my-5 pt-4 rounded bg-bg d-flex justify-content-center position-relative">
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
        <Container id='products-page page-wrapper' className='my-4'>
            <Breadcrumb className='ps-2'>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Hem</Breadcrumb.Item>
                <Breadcrumb.Item active>Produkter</Breadcrumb.Item>
            </Breadcrumb>
            <ProductGrid />
        </Container>
    );
};

export default ProductsPage;