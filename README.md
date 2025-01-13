# Welcome to JAMMMING web application! 
## This app allows you to search for songs on Spotify, browse the results, and create new playlists with your favorite tracks.

## About the Project

This project was created as a pet project to learn and practice modern front-end development technologies, such as TypeScript, React, Redux, and integration with external APIs.

**Key Features:**

* Search for songs by title, artist, or album.
* Display search results with album art, song title, and artist.
* Create new Spotify playlists.
* Add songs to playlists.
* **Secure Spotify Authorization:**  Utilizes the Authorization Code Grant with PKCE flow for secure client-side authorization, with `codeVerifier` encryption and user ID verification to prevent access token interception in CSRF attacks.

## Technologies Used

* **TypeScript:** Programming language that provides static typing and improves code maintainability.
* **React (Create React App):** JavaScript library for building user interfaces with a component-based approach. Create React App provides a convenient development environment.
* **React Router:** Library for managing routing in React applications, enabling navigation between different views.
* **Redux:**  Library for managing application state, simplifying data handling and component interaction.
* **React-Toastify:** Library for displaying notifications in the application, providing a user-friendly way to inform the user.
* **Spotify API:** Used for searching songs and creating playlists.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RusKrus/Jammming.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Jamming
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the application:
   ```bash
   npm start
   ```
### Note: This application uses my Spotify client ID for authorization purposes. You do not need to provide your own ID.

## Future Development
* Responsive Design: Make the app adaptable for mobile devices.
* Enhanced Search Results: Enable viewing more than 20 songs per search query.

   
