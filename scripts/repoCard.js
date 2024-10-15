import APIKey from "./APIKey.js";
import getSelectedItem from "./dropDown.js";

const card = document.querySelector(".repo-card");

const button = document.querySelector(".btn");

const loading = document.createElement("div");

const createCard = (data) => {
  //create elements
  const link = document.createElement("a");
  const header = document.createElement("div");
  const headerText = document.createElement("h2");
  const desc = document.createElement("div");
  const descText = document.createElement("h6");
  const footer = document.createElement("div");

  //add classes for styling
  header.classList.add("card__item");
  desc.classList.add("card__item");
  footer.classList.add("card__item");
  footer.classList.add("card__footer");
  link.target = "_blank";

  //adding the data
  const languageSection = createFooterElement(
    "./icons/coding.png",
    `${data.language}`
  );
  const ratingSection = createFooterElement(
    "./icons/star.png",
    `${data.stargazers_count}`
  );
  const forksSection = createFooterElement("./icons/git.png", `${data.forks}`);
  const openIssuesSection = createFooterElement(
    "./icons/exclamation.png",
    `${data.open_issues}`
  );

  headerText.innerText = `${data.name}`;
  descText.innerText = `${data.description}`;
  link.href = data.html_url;

  //appending all the elements to the DOM
  header.appendChild(headerText);

  desc.appendChild(descText);

  footer.appendChild(languageSection);
  footer.appendChild(ratingSection);
  footer.appendChild(forksSection);
  footer.appendChild(openIssuesSection);

  link.appendChild(header);
  link.appendChild(desc);
  link.appendChild(footer);

  card.appendChild(link);
};

const createFooterElement = (src, text) => {
  const footerElement = document.createElement("div");
  footerElement.classList.add("card__footer__item");
  footerElement.innerHTML = `
    <figure class='footer__icon'>
        <img src=${src} />
    </figure>
    <p>${text}</p>
    `;
  return footerElement;
};

const getRepo = async (getSelectedItem) => {
  if (card.classList.contains("error")) {
    card.classList.remove("error");
  }
  const randomPage = getRandomNumber();
  let language = "";
  if (getSelectedItem()) {
    let headers = {};

    if (APIKey === "") {
      headers = {
        "Content-Type": "application/json",
      };
    } else {
      headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${APIKey}`,
      };
    }

    language = getSelectedItem().innerText;
    const url = `https://api.github.com/search/repositories?q=language:${language}&per_page=1&page=${randomPage}`;
    try {
      const response = await fetch(url, {
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();

      if (!json.items) {
        throw new Error("no data");
      }
      return json;
    } catch {
      card.classList.add("error");
      card.innerText = "Error fetching repo";
    }
  } else {
    card.classList.add("card-empty");
    card.innerText = "Select a language";
  }
};

const getRandomNumber = () => {
  const number = Math.floor(Math.random() * 100);
  return number;
};

const toggleLoading = () => {
  if (loading.classList.contains("loader")) {
    loading.classList.remove("loader");
    loading.classList.add("hidden");
  } else {
    loading.classList.add("loader");
    loading.classList.remove("hidden");
  }
};

const app = async (getSelectedItem) => {
  card.innerHTML = "";
  button.innerText = "Refresh";

  if (button.classList.contains("btn-error")) {
    button.classList.remove("btn-error");
  }

  if (card.classList.contains("card-empty")) {
    card.classList.remove("card-empty");
  }

  card.appendChild(loading);
  toggleLoading();

  try {
    const json = await getRepo(getSelectedItem);

    toggleLoading();

    if (getSelectedItem()) {
      const data = json.items[0];
      createCard(data);
    }
  } catch {
    button.innerText = "Click to retry";
    button.classList.add("btn-error");
    card.classList.add("error");
    card.innerText = "Error fetching repo";
  }
};

button.addEventListener("click", () => app(getSelectedItem));

export default app;
