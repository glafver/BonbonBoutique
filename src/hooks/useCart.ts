import { useContext } from "react";
import { CartContext } from '../contexts/CartContext.tsx';

export const useCart = () => {
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error("Trying to use CartContext outside of CartContextProvider");
    }

    return cartContext;
};