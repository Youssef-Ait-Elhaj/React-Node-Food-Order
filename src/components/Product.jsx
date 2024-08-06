import {format} from "../utils/format.js";
import {useContext} from "react";
import {CartContext} from "../store/CartContext.jsx";

export default function Product({mealData}) {

    const {items, addItemToCart} = useContext(CartContext);

    return (
        <li className="meal-item">
            <article>
                <img src={`http://localhost:3000/${mealData.image}`}/>
                <div>
                    <h3>{mealData.name}</h3>
                    <p className="meal-item-price">{format(mealData.price)}</p>
                    <p className="meal-item-description">{mealData.description}</p>
                </div>
                <p className="meal-item-actions">
                    <button className="meal-item-actions button" onClick={() => addItemToCart(mealData)}>Add to Cart</button>
                </p>
            </article>
        </li>
    );
}