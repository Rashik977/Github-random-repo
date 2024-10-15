# Custom Dropdown

This project is a simple implementation of a task tracker app using HTML, CSS, and JavaScript.  
It was completed as part of a project from [roadmap.sh](https://roadmap.sh/).

## Features

- Select a programming language from a dropdown
- Fetch random repositories from GitHub based on the selected language
- Refresh button to get a different repo from the same language.
- Null state, loading state and error states.
- Display repository name, description, stars, and a link to the GitHub page
- Responsive and clean UI for a smooth user experience

## Technologies Used

- **HTML**: Structure of the task tracker
- **CSS**: Custom styling and animations for a smooth user experience
- **JavaScript**: Interactivity, including adding, deleting, and toggling tasks, as well as storing tasks in local storage

## Installation

To run this project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/Rashik977/Github-random-repo.git
   ```

2. Add API key (Optional):

   ```bash
   ADD the API key to the APIKey.js file to get more requests per hour.
   const API_KEY = "";
   ```

3. Open the `index.html` file in your browser:
   ```bash
   open index.html
   ```

## Usage

- Select a programming language from the dropdown menu
- The app will fetch a random repository from GitHub matching the selected language
- The repository details (name, description, stars, and a link) will be displayed in the UI
- Click the refresh button to get another repo randomly

## Project URL

https://roadmap.sh/projects/github-random-repo
