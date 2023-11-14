// Importing the displayMealDetails function from 'meal-details.js' module
import { displayMealDetails } from './meal-details.js';

// Array to store all fetched meals
let allMeals = [];

// Function to fetch meals based on the search term
const fetchMeals = async searchTerm => {
  // Clear the allMeals array
  allMeals = [];
  // Define the base API URL
  let apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?';
  // Append the search term to the API URL if provided, otherwise default to 'f=a' (fetch all meals)
  if (searchTerm) {
    apiUrl += `s=${searchTerm}`;
  } else {
    apiUrl += 'f=a';
  }

  try {
    // Fetch data from the API using the constructed URL
    const response = await fetch(apiUrl);

    // Check if response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Convert response to JSON format
    const data = await response.json();
    return data;
  } catch (error) {
    // Log and return an error if fetching data fails
    console.error('Error fetching data:', error);
    return null;
  }
};

// Function to display meals based on the search term
const displayMeals = async (searchTerm = null) => {
  // Get the meals list container element
  const mealsList = document.getElementById('meals-list');
  // Clear the existing content in the meals list container
  mealsList.innerHTML = '';

  try {
    // Fetch meals data based on the search term
    const mealsData = await fetchMeals(searchTerm);
    // Store fetched meals in the allMeals array
    allMeals.push(mealsData.meals);
    if (mealsData && mealsData.meals) {
      // Iterate through fetched meals and display them in the list
      allMeals[0].forEach(meal => {
        const listItem = document.createElement('li');
        listItem.textContent = meal.strMeal;
        listItem.setAttribute('data-meal-id', meal.idMeal); // Store meal ID as data attribute
        mealsList.appendChild(listItem);
      });
    } else {
      // If no meals are found, display a message
      mealsList.textContent = 'No meals found.';
    }
  } catch (error) {
    // Log an error if displaying meals fails and show a message in the meals list
    console.error('Error displaying meals:', error);
    mealsList.textContent = 'Failed to fetch meals.';
  }
};

// Event listener for the search button click
const searchButton = document.getElementById('search-btn');
searchButton.addEventListener('click', () => {
  const searchTerm = document.getElementById('search-input').value.trim();
  displayMeals(searchTerm || null); // Display meals based on the entered search term
});

// Event listener for clicks on the meals list items
document.getElementById('meals-list').addEventListener('click', event => {
  if (event.target.tagName === 'LI') {
    const mealId = event.target.getAttribute('data-meal-id');
    displayMealDetails(mealId); // Display details of the clicked meal
    redirectToMealDetailsPage(mealId); // Redirect to the meal details page
  }
});

// Event listener for the 'Favourites Items List' button click
const fvtMealPage = document.getElementById('favourites-items-from-local-storage-btn');
fvtMealPage.addEventListener('click', () => {
  window.location.href = `favourite-meal-items.html`; // Redirect to the favorites page
});

// Function to redirect to the meal details page based on the meal ID
const redirectToMealDetailsPage = mealId => {
  window.location.href = `meal-details.html?mealId=${mealId}`;
};

// Event listener when the window is fully loaded, displaying meals by default
window.onload = () => {
  displayMeals(null); // Display meals (default: all meals)
};
