import { useContext } from "react";
import { FavContext } from '../contexts/FavContext.tsx';

export const useFav = () => {
    const favContext = useContext(FavContext);

    if (!favContext) {
        throw new Error("Trying to use FavContext outside of FavContextProvider");
    }

    return favContext;
};