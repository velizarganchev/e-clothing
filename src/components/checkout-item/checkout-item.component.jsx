import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import {
    CheckoutItemContainer,
    CheckoutItemImageContainer,
    CheckoutItemImage,
    CheckoutItemName,
    CheckoutItemArrow,
    CheckoutItemPrice, CheckoutItemValue,
    CheckoutItemQuantity,
    CheckoutItemRemoveButton,
} from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {

    const { name, quantity, imageUrl, price } = cartItem;

    const {
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart
    } = useContext(CartContext);

    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemFromCart(cartItem);
    const clearItemHandler = () => clearItemFromCart(cartItem);

    return (
        <CheckoutItemContainer>
            <CheckoutItemImageContainer>
                <CheckoutItemImage src={imageUrl} alt={`${name}`} />
            </CheckoutItemImageContainer>
            <CheckoutItemName>{name}</CheckoutItemName>
            <CheckoutItemQuantity>
                <CheckoutItemArrow onClick={removeItemHandler}>
                    &#10094;
                </CheckoutItemArrow>
                <CheckoutItemValue>{quantity}</CheckoutItemValue>
                <CheckoutItemArrow onClick={addItemHandler}>
                    &#10095;
                </CheckoutItemArrow>
            </CheckoutItemQuantity>
            <CheckoutItemPrice> {price}</CheckoutItemPrice>
            <CheckoutItemRemoveButton onClick={clearItemHandler} >
                &#10005;
            </CheckoutItemRemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;