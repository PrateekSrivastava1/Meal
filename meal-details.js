// Array to store favorite meals
const favouriteMeal = [];
// Object to store current meal data
let currentMealData = {};

// Function to fetch meal details by ID using an API call
const fetchMealDetails = async id => {
  let apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching meal details:', error);
    return null;
  }
};

// Function to display meal details on the page
export const displayMealDetails = async mealId => {
  console.log({ mealId });
  try {
    const mealDetails = await fetchMealDetails(mealId);
    const mealDetailsContainer = document.getElementById('meal-details-container');

    // Check if meal details exist and the container is available
    if (
      mealDetails &&
      mealDetails.meals &&
      mealDetails.meals.length > 0 &&
      mealDetailsContainer
    ) {
      const mealData = mealDetails.meals[0];
      currentMealData = mealData;

      // Creating elements for meal title, image, instructions, and ingredients
      const mealTitle = document.createElement('h2');
      mealTitle.textContent = mealData.strMeal;

      const mealImage = document.createElement('img');
      mealImage.src = mealData.strMealThumb;
      mealImage.alt = mealData.strMeal;

      const mealInstructions = document.createElement('p');
      mealInstructions.textContent = mealData.strInstructions;

      const mealIngredients = document.createElement('ul');
      for (let i = 1; i <= 20; i++) {
        const ingredient = mealData[`strIngredient${i}`];
        const measure = mealData[`strMeasure${i}`];
        if (ingredient && measure) {
          const ingredientItem = document.createElement('li');
          ingredientItem.textContent = `${measure} - ${ingredient}`;
          mealIngredients.appendChild(ingredientItem);
        }
      }

      // Appending meal details to the container
      mealDetailsContainer.appendChild(mealTitle);
      mealDetailsContainer.appendChild(mealImage);
      mealDetailsContainer.appendChild(mealInstructions);
      mealDetailsContainer.appendChild(mealIngredients);
    } else {
      // If meal details are not available, display a message
      if (mealDetailsContainer) {
        mealDetailsContainer.textContent = 'Meal details not found.';
      }
    }
  } catch (error) {
    console.error('Error displaying meal details:', error);
  }
};

// Function to add a meal to favorites and store in local storage
const addToFavourites = mealData => {
  favouriteMeal.push(mealData);
  let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
  favourites.push(mealData);
  localStorage.setItem('favourites', JSON.stringify(favourites));
  alert('Meal added to Favourites!');
};

// Function called when window is fully loaded
window.onload = () => {
  // Get meal ID from URL parameters and display meal details
  const mealId = new URLSearchParams(window.location.search).get('mealId');
  displayMealDetails(mealId);

  // Event listeners for favorite meal buttons
  const fvtMealButton = document.getElementById('add-to-favourites-btn');
  const fvtMealPageButton = document.getElementById(
    'favourites-items-from-local-storage-btn'
  );

  fvtMealPageButton.addEventListener('click', () => {
    redirectToDifferentPage('favourite-meal-items.html');
  });

  fvtMealButton.addEventListener('click', () => {
    addToFavourites(currentMealData);
  });

  // Event listener for Home button click
  const homePage = document.getElementById('home-page');
  homePage.addEventListener('click', () => {
    redirectToDifferentPage('index.html');
  });
};

// Function to redirect to a different page
const redirectToDifferentPage = url => {
  window.location.href = url;
};
