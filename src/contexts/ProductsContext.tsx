import { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Product } from '../types/types';
import { fetchProducts } from '../api/api.js';
import { useQuery } from 'react-query';

type ProductsContextType = {
    filteredProducts: Product[] | [];
    error: Error | null;
    isLoading: boolean;
    isProductAvailable: (id: number, quantity?: number) => boolean;
    newProducts: Product[];
    changeCategories: (id: number, checked: boolean) => void;
    changeSortOption: (option: string) => void;
    changePriceRange: (name: string, value: string) => void;
    categories: { [key: string]: boolean; };
    priceRange: { from: string; to: string; };
    products: Product[] | [];
};

type ProductsProviderProps = {
    children: ReactNode;
};

export const ProductsContext = createContext<ProductsContextType | null>(null);

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
    const { data, error, isLoading } = useQuery<Product[], Error>('products', fetchProducts);

    const [products, setProducts] = useState<Product[] | []>([]);
    const [categories, setCategories] = useState<{ [key: string]: boolean; }>({});
    const [sortOption, setSortOption] = useState<string>('priceLow');
    const [priceRange, setPriceRange] = useState({ from: '', to: '' });

    const changeCategories = (id: number, checked: boolean) => {
        setCategories(prev => ({
            ...prev,
            [id]: checked
        }));
    };

    const changeSortOption = (selectedOption: string) => {
        setSortOption(selectedOption);
    };

    const changePriceRange = (name: string, value: string) => {
        setPriceRange(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const filterProducts = useCallback(() => {
        let filtered = [...products];

        // Filter by category
        const selectedCategoryIds = Object.entries(categories)
            .filter(([, checked]) => checked)
            .map(([id]) => parseInt(id));
        if (selectedCategoryIds.length > 0) {
            filtered = filtered.filter(product =>
                selectedCategoryIds.every(categoryId =>
                    product.tags.some(tag => tag.id === categoryId)
                )
            );
        }

        // Filter by price
        if (priceRange.from || priceRange.to) {
            const fromPrice = parseFloat(priceRange.from) || 0;
            const toPrice = parseFloat(priceRange.to) || Infinity;
            filtered = filtered.filter(product =>
                product.price >= fromPrice && product.price <= toPrice
            );
        }

        // Sort filtered products
        switch (sortOption) {
            case 'priceLow':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'priceHigh':
                filtered.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        return filtered;
    }, [products, categories, sortOption, priceRange]);

    const getNewProducts = () => {
        const filtered = products.filter((product) =>
            product.tags.find(tag => tag.id === 124)
        );
        return filtered;
    };

    const isProductAvailable = (productId: number, newQuantity: number = 1): boolean => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const cartProduct = cart.find((item: { id: number; }) => item.id === productId);
        const selectedProduct = products.find((item: { id: number; }) => item.id === productId);

        if (selectedProduct && selectedProduct.stock_status === 'outofstock') {
            return false;
        }

        if (selectedProduct && !cartProduct) {
            if (newQuantity > selectedProduct.stock_quantity) {
                return false;
            }
        }

        if (cartProduct && selectedProduct) {
            if (cartProduct.quantity >= selectedProduct.stock_quantity) {
                return false;
            }
        }

        if (cartProduct && selectedProduct) {
            const totalQuantity = cartProduct.quantity + newQuantity;
            if (totalQuantity > selectedProduct.stock_quantity) {
                return false;
            }
        }

        return true;
    };

    const newProducts = getNewProducts();
    const filteredProducts = filterProducts();

    useEffect(() => {
        if (data) {
            data.sort((a, b) => a.price - b.price);
            setProducts(data);
        }
    }, [data]);

    return (
        <ProductsContext.Provider
            value={{
                filteredProducts,
                error,
                isLoading,
                isProductAvailable,
                newProducts,
                changeSortOption,
                changeCategories,
                changePriceRange,
                categories,
                priceRange,
                products
            }}>
            {children}
        </ProductsContext.Provider>
    );
};