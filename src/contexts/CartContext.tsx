import { createContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types/types';
import { CartItemType } from '../types/types';

type CartContextType = {
    addToCart: (product: Product) => void;
    addOneToCart: (productId: number) => void;
    removeFromCart: (productId: number) => void;
    removeOneFromCart: (productId: number) => void;
    badge: number;
    cartItems: CartItemType[];
};

type CartProviderProps = {
    children: ReactNode;
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [badge, setBadge] = useState<number>(0);
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);

    const addToCart = (product: Product) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const productIndex = cart.findIndex((item: { id: number; }) => item.id === product.id);

        if (productIndex !== -1) {
            cart[productIndex].quantity = (cart[productIndex].quantity || 1) + 1;
        } else {
            cart.push({ id: product.id, quantity: 1, img: product.images.thumbnail, name: product.name, price: product.price });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('storage'));
    };

    const addOneToCart = (productId: number) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const productIndex = cart.findIndex((item: { id: number; }) => item.id === productId);

        cart[productIndex].quantity++;

        localStorage.setItem('cart', JSON.stringify(cart));

        window.dispatchEvent(new Event('storage'));
    };

    const removeFromCart = (productId: number) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const updatedCart = cart.filter((item: { id: number; }) => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
        window.dispatchEvent(new Event('storage'));
    };

    const removeOneFromCart = (productId: number) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const productIndex = cart.findIndex((item: { id: number; }) => item.id === productId);

        if (productIndex !== -1) {
            const updatedCart = [...cart];

            if (updatedCart[productIndex].quantity > 1) {
                updatedCart[productIndex].quantity--;
            } else {
                updatedCart.splice(productIndex, 1);
            }

            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setCartItems(updatedCart);

            window.dispatchEvent(new Event('storage'));
        }
    };

    useEffect(() => {
        const updateCartFromStorage = () => {
            const cart = localStorage.getItem('cart');
            if (cart) {
                const parsedCart = JSON.parse(cart);
                const totalQuantity = parsedCart.reduce((total: number, item: { quantity: number; }) => total + item.quantity, 0);
                setBadge(totalQuantity);
                setCartItems(parsedCart);
            }
        };

        window.addEventListener('storage', updateCartFromStorage);

        updateCartFromStorage();

        return () => {
            window.removeEventListener('storage', updateCartFromStorage);
        };
    }, []);

    return (
        <CartContext.Provider value={{ addToCart, addOneToCart, removeFromCart, removeOneFromCart, badge, cartItems }}>
            {children}
        </CartContext.Provider>
    );
};
