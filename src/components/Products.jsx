import {useEffect, useState} from "react";
import {getMeals} from "../http.js";
import Product from "./Product.jsx";
import Error from "./Error.jsx";

export default function Products() {
    const [isFetching, setIsFetching] = useState(false);
    const [mealData, setMealData] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        async function getMealsData() {
            setIsFetching(true);
            try {
                const meals = await getMeals();
                setMealData(meals);
            } catch (error) {
                setError({
                    message: error.message || 'Failed to load meals.',
                });
            }

            setIsFetching(false);
        }

        getMealsData();
    }, []);

    if (error) {
        return <Error title="Failed to load data" message={error.message} />
    }

    return (
        <div id="meals">
            {isFetching && <h1 className="loading">Loading meals, please wait...</h1>}
            {!isFetching && mealData.map(meal => <Product key={meal.id} mealData={meal} />) }
        </div>
    );
}