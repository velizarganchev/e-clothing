import { createContext, useState, useEffect } from "react";
import { getCategoriesUndDocuments } from "../utils/firebase/firebase.utils.js";

export const ProductsContext = createContext({
    products: [],
});

export const ProductsProvider = ({ children }) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesUndDocuments();
        };

        getCategoriesMap();
    }, [])
    const value = { products };

    return (
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    );
};