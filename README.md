# Event Planner Project

Welcome to the Event Planner Project! This repository contains the source code for an event planning application built with Node.js, Express.js, Handlebars.js, PostgreSQL, and Sequelize. The application allows users to create and manage events, RSVP, and delete events.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and authentication
- Dashboard for viewing and managing events
- Create, view, edit, and delete events
- RSVP to events
- Responsive and polished UI using Bulma
- Secure handling of sensitive information with environment variables

## Technologies Used

- Node.js
- Express.js
- Handlebars.js
- PostgreSQL
- Sequelize
- Bulma
- bcrypt (for password hashing)

## Installation

1. Clone the repository:

   git clone https://github.com/domspinn/Event-Planner-Project.git
   cd Event-Planner-Project

2. Install Dependencies:

   npm install

3. Create .env:

   DB_NAME=your_db_name
   DB_USER=your_db_user
   DB_PASS=your_db_password
   DB_HOST=your_db_host
   SESSION_SECRET=your_session_secret

4. Start The Server:

   npm start
