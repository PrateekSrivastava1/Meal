// Function to display the list of favorite meals with delete buttons
const displayFavouriteMeals = () => {
  // Get the list container element
  const favouriteMealsList = document.getElementById('favourite-meals-list');
  // Clear the existing content in the list
  favouriteMealsList.innerHTML = '';

  // Retrieve favorite meals from local storage or initialize an empty array
  const favourites = JSON.parse(localStorage.getItem('favourites')) || [];

  // Loop through each favorite meal and create list items with delete buttons
  favourites.forEach((meal, index) => {
    // Create a list item element
    const listItem = document.createElement('li');
    // Set the text content of the list item to the meal name
    listItem.textContent = meal.strMeal;
    // Set a data attribute to hold the meal ID
    listItem.setAttribute('data-meal-id', meal.idMeal);
    // Add a CSS class to the list item for styling purposes
    listItem.classList.add('meal-item');

    // Create a delete button for each meal
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.setAttribute('data-index', index);

    // Append the delete button to the list item
    listItem.appendChild(deleteButton);
    // Append the list item to the favorite meals list
    favouriteMealsList.appendChild(listItem);
  });

  // Event listener for clicks on the favorite meals list
  favouriteMealsList.addEventListener('click', event => {
    // If a meal item is clicked, redirect to its details page
    if (event.target.classList.contains('meal-item')) {
      const mealId = event.target.getAttribute('data-meal-id');
      window.location.href = `meal-details.html?mealId=${mealId}`;
    }

    // If a delete button is clicked, remove the corresponding meal from local storage
    if (event.target.classList.contains('delete-btn')) {
      const index = event.target.getAttribute('data-index');
      removeFromLocalStorage(index);
    }
  });

  // Event listener for the Home button click
  const homePage = document.getElementById('home-page');
  homePage.addEventListener('click', () => {
    redirectToDifferentPage('index.html');
  });
};

// Function to remove a meal from local storage by index
const removeFromLocalStorage = index => {
  let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
  // Remove the selected meal from the array
  favourites.splice(index, 1);
  // Update the local storage with the modified array
  localStorage.setItem('favourites', JSON.stringify(favourites));
  // Re-render the list after deletion
  displayFavouriteMeals();
};

// Function to redirect to a different page
const redirectToDifferentPage = url => {
  window.location.href = url;
};

// Load the favorite meals list when the window is fully loaded
window.onload = () => {
  displayFavouriteMeals();
};
