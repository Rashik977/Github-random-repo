import createDropDown from "./dropDown.js";
import app from "./repoCard.js";

// Initialize the app and set up the dropdown
const initializeApp = () => {
  const selectedItem = createDropDown();

  // Attach event listener to the button and pass the selected item to fetch repos
  const button = document.querySelector(".btn");
  button.addEventListener("click", () => app(selectedItem));
};

export default initializeApp;
