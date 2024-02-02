import { useState, ChangeEvent, useEffect } from 'react';
import { Form, FormControl, ListGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { Product } from '../../types/types';
import { useProducts } from '../../hooks/useProducts';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<Product[]>([]);

    const { products } = useProducts();
    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleGoToProduct = (product: Product) => {
        navigate(`/product/${product.id}`);
        setQuery('');
    };

    useEffect(() => {
        if (query.length > 0) {
            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filteredProducts);
        } else {
            setResults([]);
        }
    }, [query, products]);

    return (
        <div id='search-bar'>
            <Form>
                <FormControl
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={handleChange}
                />
                <span className='search-icon-wrapper'>
                    <FaSearch />
                </span>
            </Form>
            {results.length > 0 && (
                <ListGroup >
                    {results.map(product => (
                        <ListGroup.Item key={product.id}>
                            <img
                                src={`https://www.bortakvall.se${product.images.thumbnail}`}
                                alt={product.name} />
                            <div className='product-name' onClick={() => handleGoToProduct(product)}>
                                {product.name}
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
};

export default SearchBar;
