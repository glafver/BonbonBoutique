import { createContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types/types';
import { useProducts } from '../hooks/useProducts';

type CartContextType = {
    addToCart: (productId: number, quantity: number) => void;
    removeFromCart: (productId: number, quantity?: number) => void;
    badge: number;
    cart: { id: number, quantity: number; }[] | [];
    cartItems: Product[];
};

type CartProviderProps = {
    children: ReactNode;
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const { products } = useProducts();

    const [badge, setBadge] = useState<number>(0);
    const [cart, setCart] = useState<{ id: number, quantity: number; }[] | []>([]);

    const addToCart = (productId: number, quantity: number = 1) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const productIndex = cart.findIndex((item: { id: number; }) => item.id === productId);

        if (productIndex !== -1) {
            cart[productIndex].quantity += quantity;
        } else {
            cart.push({ id: productId, quantity: quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        window.dispatchEvent(new Event('storage'));
    };

    const removeFromCart = (productId: number, quantity?: number) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const productIndex = cart.findIndex((item: { id: number; }) => item.id === productId);

        if (quantity) {
            if (productIndex !== -1) {
                const updatedCart = [...cart];

                if (updatedCart[productIndex].quantity > 1) {
                    updatedCart[productIndex].quantity--;
                } else {
                    updatedCart.splice(productIndex, 1);
                }

                localStorage.setItem('cart', JSON.stringify(updatedCart));
                setCart(updatedCart);

                window.dispatchEvent(new Event('storage'));
            }
        } else {
            const updatedCart = cart.filter((item: { id: number; }) => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setCart(updatedCart);
            window.dispatchEvent(new Event('storage'));
        }
    };

    const filterProductsById = (ids: Array<{ id: number; quantity: number; }>) => {
        return products.map((product: Product) => {
            const matchedItem = ids.find((item) => item.id === product.id);
            return matchedItem ? { ...product, quantity: matchedItem.quantity } : product;
        }).filter((product: Product) => ids.some((item) => item.id === product.id));
    };

    const cartItems = filterProductsById(cart);

    useEffect(() => {
        const updateCartFromStorage = () => {
            const cart = localStorage.getItem('cart');
            if (cart) {
                const parsedCart = JSON.parse(cart);
                const totalQuantity = parsedCart.reduce((total: number, item: { quantity: number; }) => total + item.quantity, 0);
                setBadge(totalQuantity);
                setCart(parsedCart);
            }
        };

        window.addEventListener('storage', updateCartFromStorage);

        updateCartFromStorage();

        return () => {
            window.removeEventListener('storage', updateCartFromStorage);
        };
    }, []);

    return (
        <CartContext.Provider
            value={{
                addToCart,
                removeFromCart,
                badge,
                cart,
                cartItems
            }}>
            {children}
        </CartContext.Provider>
    );
};
