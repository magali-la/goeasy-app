# GoEasy Full Stack Application
### A flexible budget travel planning tool built for local-first exploration with spending estimates
### https://goeasy-travel.vercel.app


## Description
GoEasy is a travel planning application designed to help budget-conscious travelers explore cities without getting caught in overpriced tourist traps. Instead of requiring fixed dates or booked flights, GoEasy focuses on travel ideation, allowing users to curate activities by city, build trips around experiences, and calculate projected spending before committing.

Users can browse curated activities, create and edit trips, add activities to their itinerary, and see how their choices impact their personal budget. The goal is simple: plan smarter and make meaningful trips without overspending.

This app leverages React and TypeScript for dynamic state management and TailwindCSS for styling, and Motion for animations. The backend is hosted on Render.
To view the backend repo go here: https://github.com/magali-la/goeasy-backend 

## Table of Contents
* [Tech Stack](#techstack)
* [Features](#features)
* [Design & Development Process](#design)
* [Project Reflections](#reflections)
    * [Authentication](#auth)
    * [Dev vs. Production Environment](#environment)
* [Deployment](#deployment)
* [About the Author](#author)

## <a name="techstack"></a>Tech Stack
### Languages
* TypeScript/JavaScript

### Libraries & Frameworks
* React
* React Router
* Axios

* Tailwind CSS
* Motion (prev Framer Motion): https://motion.dev
* Tailwind Variants API: https://www.tailwind-variants.org 

### Build Tools
* Vite
* Vercel (deployment)

### State Management
* React `useState`, `useEffect`

## <a name="features"></a>Features
Users can:
1. Signup and login using both local authentication (email + password) and Google via OAuth 2.0
2. Create trips
3. Edit trip details
4. Overview of trips via Boarding Passes
5. Browse a selection of activities for New York, Atlanta, and Lyon, France and average prices
6. Add activities to trips
7. Remove activities from trips
8. Delete trips
9. View estimated spending data per trip

### Future Features
Planned features include:
- Adding GoBuddies, other users, to a trip
- Assigning participants of a trip to specific activities
- Manual individual budget creation per trip
- Visual breakdown of budgets and estimated spending data
- Collaborative trip planning experience
- Filter activities by their tags (e.g. art, food, music)

## <a name="design"></a>Design Process & Backend Planning
GoEasy was designed around the idea of flexible, budget-first travel planning. Instead of centering the experience around booking logistics, the design focuses on exploration of curated activities. The design focused on the end-user experience in visualizing what a trip could look like and how affordable it can be before committing.

In addition, the design process also informed the required data models and the backend routes. In the process, I created an ERD and a list of backend routes before building.

The user interface emphasizes clarity and simplicity.

Link to Figma wireframes: https://www.figma.com/design/jzLFBe5uMSci9YYeS0dggb/Per-Scholas-Final-Capstone?node-id=99-1178&t=0Od6BkAqGbUwjibM-1

### Key Steps:
* **User Goals**: Identified target users as budget-conscious travelers who want to avoid overpriced tourist attractions
* **Components**: Designed tag and label components in Figma
* **Visual Branding**: Created logo, selected a playful color palette and font.
* **Wireframes**: Built high-fidelity wireframes, considering various states.
* **Iteration**: As MVP scope evolved, features such as participant management and advanced budgeting were deprioritized. The design was refined to ensure the core experience of trip creation, activity selection, and projected spending remained clear and intuitive.

### Tools used
* Figma
* Coolors
* Trello

### Font used
* [Dela Gothic One](https://fonts.google.com/specimen/Dela+Gothic+One) 
* [Kanit](https://fonts.google.com/specimen/Kanit) 

### Assets used
* All images are from Unsplash

## <a name="reflections"></a>Project Reflections
### <a name="auth"></a>Authentication Strategy
One of the main tradeoffs in this project involved how authentication tokens were stored on the client.

* Initially, I avoided using `localStorage` or `sessionStorage` to reduce exposure of JWTs to potential XSS vulnerabilities. I experimented with storing tokens in memory only, which included writing a token store file with callback functions to act as a middle layer between the React tree and the `axios.ts` service
* This initial approach improved security but resulted in users being logged out on page refresh.
* To improve user experience while maintaining security, I transitioned to `httpOnly` cookie-based authentication. This approach allows the browser to automatically include the token in requests while preventing JavaScript access to it. It simplified the frontend logic and axios configurations and provided a more seamless login experience.

### <a name="environment"></a>Development vs Production Environment
During development, I used Vite’s proxy configuration to simulate same-origin API requests. Later, I introduced a `baseURL` environment variable in my Axios instance to better support the cookie-based authentication strategy I chose.

Doing this early on allowed me better understand how to properly configure `CORS` in the backend and made it easier to transition to a production-ready application.

## <a name="deployment"></a>Deployment
This app is hosted on Vercel
[Live Site](https://goeasy-travel.vercel.app/)

## <a name="author"></a>About The Author
Hi, I'm Magali. I'm a design-minded engineer with strengths in front-end development, accessibility, and UX design. I'm a recent graduate of Per Scholas full stack engineering bootcamp. I enjoy building products with accessibility in mind so that everyone can have access to information. This project allowed me to develop key skills in full stack development and database management and reinforce skills in React, TypeScript, and Tailwind CSS.