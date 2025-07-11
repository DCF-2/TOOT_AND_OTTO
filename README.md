# TOOT AND OTTO GameS
This is an academic project developed for the Web Systems Development course. It is a complete implementation of the "Toot and Otto" board game, featuring PWA (Progressive Web App) capabilities, allowing it to be installed on devices and to function offline.

# 🚀 Features
Complete Rules: A faithful implementation of the "Toot and Otto" rules, including word formation horizontally, vertically, and diagonally.

*Interactive Gameplay: A clean and intuitive interface for selecting pieces ('T' or 'O') and columns.
*Persistent Scoreboard: The win counter is saved in the browser's localStorage and persists between sessions.
*Progressive Web App (PWA):
*Installable: The game can be "added to the home screen" on mobile devices and desktops.
*Offline Functionality: It uses a Service Worker to cache all necessary files, allowing the game to be played even without an internet connection.

Responsive Layout: The design adapts to different screen sizes.

# 🛠️ Technologies Used
-HTML5: Semantic structure of the application
-CSS3: Modern styling, using Flexbox for the layout.
-JavaScript (ES6+): Game logic, DOM manipulation, and PWA feature implementation.
-Service Workers: For cache control and offline functionality.
-Web App Manifest: To make the application installable.

# ⚙️ How to Run the Project
Prerequisites: You need a local web server to serve the files. The Live Server extension for Visual Studio Code is an excellent choice.

# 👣 Steps:

1.Clone or download this repository.

2.Open the project folder in Visual Studio Code.

3.With the Live Server extension installed, right-click the index.html file and select "Open with Live Server".

4.The game will open in your default browser.

# 📁Project Structure
````
/
|-- conf/                 # PWA configuration files
|   |-- images/
|   |   |-- icon-192.png
|   |   `-- icon-512.png
|   |-- imgs/
|   |   `-- icon.webp
|   `-- manifest.webmanifest
|-- js/                     # JavaScript scripts
|   |-- app.js              # Service Worker registration
|   |-- GUI.js              # Graphical User Interface logic
|   |-- sw.js               # The Service Worker
|   `-- ...                 # Game logic modules
|-- style/
|   `-- style.css           # Stylesheet
|-- index.html              # Main application file
`-- README.MD               # This file
````