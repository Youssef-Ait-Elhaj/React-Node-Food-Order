import {useContext, useState} from "react";
import {CartContext} from "../store/CartContext.jsx";
import {format} from "../utils/format.js";

export default function Cart({ handleModalClose, handleGoToCheckout }) {
    const {items, getCartTotal, updateItemQuantity} = useContext(CartContext);
    const [errorCheckout, setErrorCheckout] = useState(false);

    function handleEmptyCartOnCheckout() {
        setErrorCheckout(true);
    }

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            <ul>
                {items.map(item => {
                    const totalItemPrice = +item.price * item.quantity;

                    return <li className="cart-item" key={item.id}>
                        <p>
                            {item.name} - {item.quantity} x {format(totalItemPrice)}
                        </p>
                        <div className="cart-item-actions">
                            <button onClick={() => updateItemQuantity(item, -1)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateItemQuantity(item, 1)}>+</button>
                        </div>
                    </li>;
                })}
                <p className="cart-total">
                    {format(getCartTotal())}
                </p>
                {errorCheckout && <p className="error-checkout">You must add items to the cart before proceeding to checkout.</p>}
                <div className="modal-actions">
                    <button className="text-button" onClick={handleModalClose}>Close</button>
                    <button className="button" onClick={items.length > 0 ? handleGoToCheckout : handleEmptyCartOnCheckout}>Go to Checkout</button>
                </div>
            </ul>
        </div>
    );
}