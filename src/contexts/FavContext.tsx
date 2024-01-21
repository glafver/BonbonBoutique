import { createContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types/types';
import { useProducts } from '../hooks/useProducts';

type FavContext = {
    addFav: (id: number) => void;
    removeFav: (productId: number) => void;
    fav: { id: number; }[];
    favItems: Product[];
    isProductFav: (id: number) => boolean;
};

type FavProviderProps = {
    children: ReactNode;
};

export const FavContext = createContext<FavContext | null>(null);

export const FavProvider: React.FC<FavProviderProps> = ({ children }) => {
    const { products } = useProducts();

    const [fav, setFav] = useState<{ id: number; }[]>([]);

    const addFav = (id: number) => {
        const fav = JSON.parse(localStorage.getItem('fav') || '[]');
        fav.push({ id });

        localStorage.setItem('fav', JSON.stringify(fav));
        window.dispatchEvent(new Event('storage'));
    };

    const removeFav = (id: number) => {
        const fav = JSON.parse(localStorage.getItem('fav') || '[]');
        const updatedFav = fav.filter((item: { id: number; }) => item.id !== id);

        localStorage.setItem('fav', JSON.stringify(updatedFav));
        window.dispatchEvent(new Event('storage'));
    };

    const filterProductsById = (ids: Array<{ id: number; }>) => {
        return products.filter((product: Product) => ids.some((item) => item.id === product.id));
    };

    const favItems = filterProductsById(fav);

    const isProductFav = (id: number) => fav.some((item: { id: number; }) => item.id === id);

    useEffect(() => {
        const updateFavFromStorage = () => {
            const fav = localStorage.getItem('fav');
            if (fav) {
                const parsedFav = JSON.parse(fav);
                setFav(parsedFav);
            }
        };

        window.addEventListener('storage', updateFavFromStorage);

        updateFavFromStorage();

        return () => {
            window.removeEventListener('storage', updateFavFromStorage);
        };
    }, []);

    return (
        <FavContext.Provider
            value={{
                addFav,
                removeFav,
                fav,
                favItems,
                isProductFav
            }}>
            {children}
        </FavContext.Provider>
    );
};
