import { useContext } from "react";
import { ProductsContext } from '../contexts/ProductsContext.tsx';

export const useProducts = () => {
    const productsContext = useContext(ProductsContext);

    if (!productsContext) {
        throw new Error("Trying to use ProductsContext outside of ProductsContextProvider");
    }

    return productsContext;
};