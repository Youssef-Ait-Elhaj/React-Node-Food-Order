import {useContext, useState} from "react";
import {CartContext} from "../store/shopping-cart-context.jsx";
import {format} from "../utils/format.js";
import {submitOrder} from "../http.js";
import Error from "./Error.jsx";

export default function Checkout({ handleModalClose }) {
    const {items, getCartTotal} = useContext(CartContext);
    const [error, setError] = useState();
    const [orderSuccess, setOrderSuccess] = useState(false);

    async function handleSubmit() {
        event.preventDefault();
        const fd = new FormData(event.target);
        const customer = Object.fromEntries(fd.entries());
        const orderData = {items, customer};

        try {
            const response = await submitOrder(orderData);
            // show success
            setOrderSuccess(true);
        } catch (error) {
            setError({
                message: error.message || 'Failed to submit order, Please try again later.',
            });
        }
    }

    if (error) {
        return <Error title="Failed to submit order" message={error.message} />;
    }

    if (orderSuccess) {
        return (
            <div>
                <h2>Success!</h2>
                <p>Your order was submitted successfully.</p>
                <p>We will get back to you with more details within the next few minutes via email.</p>
                <div className="modal-actions">
                    <button className="button" onClick={handleModalClose}>Okay</button>
                </div>
            </div>
        )
    }

    return (
        <form className="checkout" onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: {format(getCartTotal())}</p>
            <div className="control">
                <label htmlFor="name">Full Name</label>
                <input id="name" type="text" name="name" required minLength={3} />
            </div>
            <div className="control">
                <label htmlFor="email">E-Mail Address</label>
                <input id="email" type="email" name="email" required minLength={3} />
            </div>
            <div className="control">
                <label htmlFor="street">Street</label>
                <input id="street" type="text" name="street" required minLength={3} />
            </div>
            <div className="control-row">
                <div className="control">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input id="postalCode" type="text" name="postal-code" required minLength={3} />
                </div>
                <div className="control">
                    <label htmlFor="city">City</label>
                    <input id="city" type="text" name="city" required minLength={3} />
                </div>
            </div>
            <div className="modal-actions">
                <button className="text-button" onClick={handleModalClose}>Close</button>
                <button type="submit" className="button">Submit Order</button>
            </div>
        </form>
    );
}