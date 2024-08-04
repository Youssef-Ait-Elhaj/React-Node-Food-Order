import logo from '../assets/logo.jpg';
import {useContext} from "react";
import {CartContext} from "../store/shopping-cart-context.jsx";

export default function Header({handleModalOpen}) {
    const {items} = useContext(CartContext);

    const totalItems = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} />
                <h1>REACTFOOD</h1>
            </div>
            <button className="text-button" onClick={handleModalOpen}>Cart ({totalItems})</button>
        </header>
    );
}