import {useContext} from "react";
import {CartContext} from "../store/shopping-cart-context.jsx";
import {format} from "../utils/format.js";

export default function Cart({ handleModalClose }) {
    const {items, getCartTotal, addItemToCart, updateItemQuantity} = useContext(CartContext);

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
                <div className="modal-actions">
                    <button className="text-button" onClick={handleModalClose}>Close</button>
                    <button className="button">Go to Checkout</button>
                </div>
            </ul>
        </div>
    );
}