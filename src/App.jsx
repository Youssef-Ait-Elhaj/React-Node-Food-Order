import Header from "./components/Header.jsx";
import Products from "./components/Products.jsx";
import Modal from "./components/Modal.jsx";
import {useState} from "react";
import Cart from "./components/Cart.jsx";
import CartContextProvider, {CartContext} from "./store/CartContext.jsx";
import Checkout from "./components/Checkout.jsx";

function App() {
    const [cartModalIsOpen, setCartModalIsOpen] = useState(false);
    const [checkoutModalIsOpen, setCheckoutModalIsOpen] = useState(false);

    function handleCartModalOpen() {
        setCartModalIsOpen(true);
    }

    function handleCartModalClose() {
        setCartModalIsOpen(false);
    }

    function handleCheckoutModalOpen() {
        setCheckoutModalIsOpen(true);
    }

    function handleCheckoutModalClose() {
        setCheckoutModalIsOpen(false);
    }

    function handleGoToCheckout() {
        setCartModalIsOpen(false);
        setCheckoutModalIsOpen(true);
    }

    return (
        <CartContextProvider>
            <Header handleModalOpen={handleCartModalOpen}/>
            <Products />
            <Modal open={cartModalIsOpen}>
                <Cart handleModalClose={handleCartModalClose} handleGoToCheckout={handleGoToCheckout} />
            </Modal>
            <Modal open={checkoutModalIsOpen}>
                <Checkout handleModalClose={handleCheckoutModalClose} />
            </Modal>
        </CartContextProvider>
    );
}

export default App;