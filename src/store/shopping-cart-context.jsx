import {createContext, useReducer, useState} from "react";


export const CartContext = createContext({
    items: [],
    getCartTotal: () => {
    },
    addItemToCart: () => {
    },
    updateItemQuantity: () => {
    }
});

function shoppingCartReducer(state, action) {
    if (action.type === "ADD_ITEM") {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(cartItem => cartItem.id === action.payload.id);
        const existingCartItem = updatedItems[updatedItemIndex];

        if (existingCartItem) {
            updatedItems[updatedItemIndex] = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
        } else {
            updatedItems.push({
                ...action.payload,
                quantity: 1,
            });
        }

        return {
            ...state,   // not needed cuz we only have items in our state
            items: updatedItems
        };
    }
    if (action.type === "UPDATE_ITEM") {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(cartItem => cartItem.id === action.payload.id);
        const cartItem = updatedItems[updatedItemIndex];

        const newQuantity = cartItem.quantity + action.payload.quantity;
        if (newQuantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = {
                ...cartItem,
                quantity: cartItem.quantity + action.payload.quantity,
            };
        }

        return {
            ...state,
            items: updatedItems
        };
    }

    return state;
}

// Context using state
// export default function CartContextProvider({children}) {
//     const [items, setItems] = useState([]);
//
//     function getCartTotal() {
//         return items.reduce((total, item) => total + item.price * item.quantity, 0);
//     }
//
//     function addItemToCart(item) {
//         const itemExistsInCart = items.find(cartItem => cartItem.id === item.id);
//
//         if (itemExistsInCart) {
//             // add it to cart with quantity of 1
//             setItems(items.map(cartItem => cartItem.id === item.id ? {
//                 ...cartItem,
//                 quantity: cartItem.quantity + 1
//             } : cartItem));
//         } else {
//             setItems([
//                 ...items,
//                 {...item, quantity: 1}
//             ]);
//         }
//     }
//
//     function updateItemQuantity(item, quantity) {
//         // update item quantity: add or sub
//         const currentItem = items.filter(cartItem => cartItem.id === item.id)[0];
//         const newQuantity = currentItem.quantity + quantity;
//
//         if (newQuantity > 0) {
//             setItems(items.map(cartItem => (cartItem.id === item.id) ?
//                 {
//                     ...cartItem,
//                     quantity: cartItem.quantity + quantity
//                 } : cartItem
//             ));
//         } else {
//             setItems(items.filter(cartItem => cartItem.id !== item.id));
//         }
//     }
//
//     const ctxValue = {items, getCartTotal, addItemToCart, updateItemQuantity};
//
//     return (
//         <CartContext.Provider value={ctxValue}>
//             {children}
//         </CartContext.Provider>
//     );
// }

// Context using useReducer Hook
export default function CartContextProvider({children}) {
    const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, {
        items: [],
    });

    function getCartTotal() {
        return shoppingCartState.items.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    function addItemToCart(item) {
        shoppingCartDispatch({
            type: "ADD_ITEM",
            payload: item,
        });
    }

    function updateItemQuantity(item, quantity) {
        // update item quantity: add or sub
        shoppingCartDispatch({
            type: "UPDATE_ITEM",
            payload: {
                id: item.id,
                quantity: quantity,
            },
        });
    }

    const ctxValue = {items: shoppingCartState.items, getCartTotal, addItemToCart, updateItemQuantity};

    return (
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    );
}