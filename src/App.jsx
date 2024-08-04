import Header from "./components/Header.jsx";
import Products from "./components/Products.jsx";
import Modal from "./components/Modal.jsx";
import {useState} from "react";
import Cart from "./components/Cart.jsx";
import CartContextProvider, {CartContext} from "./store/shopping-cart-context.jsx";

function App() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function handleModalOpen() {
        setModalIsOpen(true);
    }

    function handleModalClose() {
        setModalIsOpen(false);
    }

    return (
        <CartContextProvider>
            <Header handleModalOpen={handleModalOpen}/>
            <Products />
            <Modal open={modalIsOpen}>
                <Cart handleModalClose={handleModalClose} />
            </Modal>
        </CartContextProvider>
    );
}

export default App;