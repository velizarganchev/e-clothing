import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import {
    CartIconContainer,
    ShopinIconComponent,
    ItemCount,
} from "./cart-icon.styles";

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShopinIconComponent />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
};
export default CartIcon;