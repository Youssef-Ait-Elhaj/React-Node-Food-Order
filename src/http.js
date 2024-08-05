const RESOURCES_URL = 'http://localhost:3000/';

export async function getMeals() {
    const response = await fetch(RESOURCES_URL + 'meals');
    const data = await response.json();

    if (!response.ok) {
        throw new Error("Failed to retrieve meals, please try again later.");
    }

    return data;
}

export async function submitOrder(orderData) {
    const response = await fetch(RESOURCES_URL + 'orders', {
       method: 'POST',
       body: JSON.stringify({
           order: orderData
       }),
       headers: {
           'Content-Type': 'application/json',
       }
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error("Failed to submit order, please try again later.");
    }

    return data;
}