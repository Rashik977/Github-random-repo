import app from "./repoCard.js";

const dropDown = document.querySelector(".dropdown");

let selectedItem = null;
let previousSelectedItem = null;

const createDropDown = async () => {
  const dropDownButton = document.createElement("button");
  const dropDownText = document.createElement("h6");
  const dropDownArrow = document.createElement("h6");
  const dropDownMenu = document.createElement("ul");

  //adding classes
  dropDownButton.classList.add("dropdown-button");
  dropDownText.classList.add("dropdown-text");
  dropDownArrow.classList.add("dropdown-arrow");
  dropDownMenu.classList.add("dropdown-menu");

  //adding data

  dropDownText.innerText = "select language";
  dropDownArrow.innerText = "^";

  const languages = await getLanguages();

  languages.map((data) => {
    const list = document.createElement("li");
    list.classList.add("dropdown-item");
    list.innerText = data.title;
    dropDownMenu.appendChild(list);
  });

  //appending
  dropDownButton.appendChild(dropDownText);
  dropDownButton.appendChild(dropDownArrow);

  dropDown.appendChild(dropDownButton);
  dropDown.appendChild(dropDownMenu);

  const toggleDropdownMenu = () => {
    dropDownMenu.classList.toggle("show");
    dropDownArrow.classList.toggle("rotate");

    if (dropDownMenu.classList.contains("show")) {
      document.addEventListener("keydown", keyboardNavigation);
    } else {
      document.removeEventListener("keydown", keyboardNavigation);
    }
  };

  const selectItem = (event) => {
    // to prevent other items from being selected
    if (!event.target.classList.contains("dropdown-item")) {
      return;
    }

    previousSelectedItem = selectedItem;
    selectedItem = event.target;
    dropDownText.innerText = selectedItem.innerText;
    toggleDropdownMenu();
    selectedItemIconToggle();
    app(getSelectedItem);
  };

  const selectedItemIconToggle = () => {
    selectedItem.classList.add("selected");

    /*case for when previousSelectedItem is null &
      when the previous and selected items are same  */
    if (
      !previousSelectedItem ||
      previousSelectedItem.innerText === selectedItem.innerText
    ) {
      return;
    }

    previousSelectedItem.classList.remove("selected");
  };

  const keyboardNavigation = (event) => {
    if (event.key === "Enter") {
      selectItem(event);
    }
  };

  const closeDropdownOutsideClick = (event) => {
    // Check if the click is outside the dropdown
    if (!dropDown.contains(event.target)) {
      toggleDropdownMenu();
      dropDownMenu.classList.remove("show");
      dropDownArrow.classList.remove("rotate");
    }
  };

  document.addEventListener("click", closeDropdownOutsideClick);
  dropDownMenu.addEventListener("click", selectItem);
  dropDownButton.addEventListener("click", toggleDropdownMenu);
};

const getLanguages = async () => {
  const url = `https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json`;
  const response = await fetch(url);
  return await response.json();
};

createDropDown();
const getSelectedItem = () => {
  return selectedItem;
};

export default getSelectedItem;
