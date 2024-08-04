import {useContext} from "react";
import {CartContext} from "../store/shopping-cart-context.jsx";
import {format} from "../utils/format.js";

export default function Checkout({ handleModalClose }) {
    const {getCartTotal} = useContext(CartContext);

    return (
        <div className="checkout">
            <h2>Checkout</h2>
            <p>Total Amount: {format(getCartTotal())}</p>
            <div className="control">
                <label htmlFor="fullName">Full Name</label>
                <input id="fullName" type="text"/>
            </div>
            <div className="control">
                <label htmlFor="email">E-Mail Address</label>
                <input id="email" type="text"/>
            </div>
            <div className="control">
                <label htmlFor="street">Street</label>
                <input id="street" type="text"/>
            </div>
            <div className="control-row">
                <div className="control">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input id="postalCode" type="text"/>
                </div>
                <div className="control">
                    <label htmlFor="city">City</label>
                    <input id="city" type="text"/>
                </div>
            </div>
            <div className="modal-actions">
                <button className="text-button" onClick={handleModalClose}>Close</button>
                <button className="button">Submit Order</button>
            </div>
        </div>
    );
}