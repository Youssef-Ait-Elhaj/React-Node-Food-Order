import {createContext, useState} from "react";


export const CartContext = createContext({
    items: [],
    getCartTotal: () => {
    },
    addItemToCart: () => {
    },
    updateItemQuantity: () => {
    }
});


export default function CartContextProvider({children}) {
    const [items, setItems] = useState([]);

    function getCartTotal() {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    function addItemToCart(item) {
        const itemExistsInCart = items.find(cartItem => cartItem.id === item.id);

        if (itemExistsInCart) {
            // add it to cart with quantity of 1
            setItems(items.map(cartItem => cartItem.id === item.id ? {
                ...cartItem,
                quantity: cartItem.quantity + 1
            } : cartItem));
        } else {
            setItems([
                ...items,
                {...item, quantity: 1}
            ]);
        }
    }

    function updateItemQuantity(item, quantity) {
        // update item quantity: add or sub
        const currentItem = items.filter(cartItem => cartItem.id === item.id)[0];
        const newQuantity = currentItem.quantity + quantity;

        if (newQuantity > 0) {
            setItems(items.map(cartItem => (cartItem.id === item.id) ?
                {
                    ...cartItem,
                    quantity: cartItem.quantity + quantity
                } : cartItem
            ));
        } else {
            setItems(items.filter(cartItem => cartItem.id !== item.id));
        }
    }

    const ctxValue = {items, getCartTotal, addItemToCart, updateItemQuantity};

    return (
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    );
}