import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { addItemToCart, removeItemFromCart, clearItemFromCart } from "../../store/cart/cart.action";

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

    const dispatch = useDispatch();

    const cartItems = useSelector(selectCartItems);
    const { name, quantity, imageUrl, price } = cartItem;

    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));
    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));

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