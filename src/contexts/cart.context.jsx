import { createContext, useState } from "react";

export const CatrContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const value = { isCartOpen, setIsCartOpen }

    return <CatrContext.Provider value={value}>{children}</CatrContext.Provider>;
};