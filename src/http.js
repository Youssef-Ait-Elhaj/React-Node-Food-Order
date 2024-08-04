const RESOURCES_URL = 'http://localhost:3000/';

export async function getMeals() {
    const response = await fetch(RESOURCES_URL + 'meals');
    const data = await response.json();

    if (!response.ok) {
        throw new Error("Failed to retrieve meals, please try again later.");
    }

    return data;
}