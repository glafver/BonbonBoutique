import { createContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types/types';
import { fetchProducts } from '../api/api.js';
import { useQuery } from 'react-query';

type ProductsContextType = {
    filteredProducts: Product[] | [];
    productTag: { id: number, name: string; } | null;
    error: Error | null;
    isLoading: boolean;
    filterProducts: (id: number, name: string) => void;
    resetProductsFilter: () => void;
    isProductAvialiable: (id: number) => boolean;
};

type ProductsProviderProps = {
    children: ReactNode;
};

export const ProductsContext = createContext<ProductsContextType | null>(null);

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
    const { data, error, isLoading } = useQuery<Product[], Error>('products', fetchProducts);

    const products = data ? data as Product[] : [];

    const [filteredProducts, setFilteredProducts] = useState<Product[] | []>([]);
    const [productTag, setProductTag] = useState<{ id: number, name: string; } | null>(null);

    const filterProducts = (id: number, name: string) => {
        setProductTag({ id, name });
        const filtered = products.filter((product) =>
            product.tags.some((productTag) => productTag.id === id)
        );
        setFilteredProducts(filtered);
    };

    const resetProductsFilter = () => {
        setFilteredProducts(products);
        setProductTag(null);
    };

    const isProductAvialiable = (productId: number): boolean => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const cartProduct = cart.find((item: { id: number; }) => item.id === productId);
        const selectedProduct = products.find((item: { id: number; }) => item.id === productId);

        if (selectedProduct && selectedProduct.stock_status === 'outofstock') {
            return false;
        }

        if (cartProduct && selectedProduct && (cartProduct.quantity >= selectedProduct.stock_quantity)) {
            return false;
        }
        return true;
    };

    useEffect(() => {
        if (data) {
            setFilteredProducts(data);
        }
    }, [data]);

    return (
        <ProductsContext.Provider value={{ filteredProducts, productTag, error, isLoading, filterProducts, resetProductsFilter, isProductAvialiable }}>
            {children}
        </ProductsContext.Provider>
    );
};