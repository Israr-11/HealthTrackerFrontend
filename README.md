# Health Tracker Frontend

This repository contains the frontend application for the **Health Tracker** project, developed using Vue 3. It contains the functionalities of setting various kinds of health goals, logging the actual goal achieved, and track the performance.

## Features

The application includes the following key functionalities:

- **Activity Tracking**: Monitor workouts, exercises, and daily physical activity to evaluate progress.
- **Health Goal Setting**: Set personalized health goals and track progress over time.
- **Diet Tracking**: Log meals, track daily nutrition intake, and set dietary goals to encourage healthier eating habits.
- **Sleep Tracking**: Record sleep duration and quality while setting goals for better sleep hygiene.
- **Screen Time Tracking**: Track daily screen time usage, set limits, and promote healthier digital habits.
- **Water Intake Tracking**: Set daily water intake goals, log consumption, and evaluate hydration performance.
- **Mental Health Monitoring**: Define mental health goals and track progress to improve emotional well-being.
- **Walking Goals**: Set walking targets (steps), log actual steps, and measure performance.

## Overview

The application is organized into several key directories: `components`, `pages`, `router`, `services`, and `utils`. Each directory serves a specific purpose, contributing to the overall architecture of the application.

## Folder Structure

Conversation with Gemini

Write down this folder structure for me




Google Workspace

2.0 Flash Experimental. Might not work as expected.
├── components
│   ├── common
│   │   ├── Footer.vue
│   │   └── Navbar.vue
│   ├── dashboard
│   │   └── FeatureCard.vue
│   └── diet
│       ├── DietDashboard.vue
│       ├── GoalsList.vue
│       ├── LogList.vue
│       └── PerformanceChart.vue
├── exercise
├── health
├── mentalhealth
├── screentime
├── sleep
└── walk
└── pages
    ├── Dashboard.vue
    ├── Diet.vue
    ├── Exercise.vue
    ├── Health.vue
    ├── HomePage.vue
    ├── MentalHealth.vue
    └── ScreenTime.





This is also continuity:




2.0 Flash Experimental. Might not work as expected.
├── router
│   └── index.js
├── services
│   ├── diet.js
│   ├── exercise.js
│   ├── health.js
│   ├── mentalhealth.js
│   ├── screenTime.js
│   ├── sleep.js
│   ├── user.js
│   ├── walk.js
│   └── water.js
├── utils
│   ├── Toaster.vue
│   └── ToastManager.js
├── App.vue
├── main.js
├── .gitignore
├── index.html
├── jsconfig.json
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js





Combine two of them actually write that this is the structure of folder for health tracker app. services contain api calls for all features, router contain the routes to the pages and pages are the pages on which the compoennets render, utils contain the toaster compoents and all the compoentns for features have one modal for creating the target, one for logging ctual value, two sections namely GoalList and LogList for logs and a chart to display the data:::Please write this




2.0 Flash Experimental. Might not work as expected.
This is the folder structure for a health tracker application.

├── components
│   ├── common
│   │   ├── Footer.vue
│   │   └── Navbar.vue
│   ├── dashboard
│   │   └── FeatureCard.vue
│   └── diet
│       ├── DietDashboard.vue
│       ├── GoalsList.vue
│       ├── LogList.vue
│       └── PerformanceChart.vue
├── exercise
├── health
├── mentalhealth
├── screentime
├── sleep
└── walk
├── pages
│   ├── Dashboard.vue
│   ├── Diet.vue
│   ├── Exercise.vue
│   ├── Health.vue
│   ├── HomePage.vue
│   ├── MentalHealth.vue
│   └── ScreenTime.vue
├── router
│   └── index.js
├── services
│   ├── diet.js
│   ├── exercise.js
│   ├── health.js
│   ├── mentalhealth.js
│   ├── screenTime.js
│   ├── sleep.js
│   ├── user.js
│   ├── walk.js
│   └── water.js
├── utils
│   ├── Toaster.vue
│   └── ToastManager.js
├── App.vue
├── main.js
├── .gitignore
├── index.html
├── jsconfig.json
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
Explanation:

services: This directory contains the API calls for all the features of the application.
router: This directory contains the routes to the pages, defining the navigation within the application.
pages: These are the main pages of the application, on which the various components are rendered and displayed to the user.
components: This directory houses the reusable UI components.
common: Contains components used across multiple features (e.g., Footer, Navbar).
Feature-specific folders (e.g., diet) contain components related to that specific feature. Each feature's components typically include:
One modal for creating a target or goal.
One modal for logging the actual value or progress.
Two list sections: GoalList (for displaying targets) and LogList (for displaying logged data).
A chart (e.g., PerformanceChart) to visualize the data.
utils: This directory contains utility components, including the toaster components (Toaster.vue and ToastManager.js) for displaying notifications.
This structure promotes organization and maintainability by separating concerns and providing a clear hierarchy for the application's files.






Can you write for me in the way Github README is arranged so, I can put this there




2.0 Flash Experimental. Might not work as expected.
Markdown

# Health Tracker App - Folder Structure

This document outlines the folder structure of the Health Tracker application. This structure is designed for maintainability, scalability, and clear separation of concerns.

## Overview

The application is organized into several key directories: `components`, `pages`, `router`, `services`, and `utils`. Each directory serves a specific purpose, contributing to the overall architecture of the application.

## Folder Structure

├── components
│   ├── common          # Reusable components used across the app
│   │   ├── Footer.vue
│   │   └── Navbar.vue
│   ├── dashboard       # Components for the main dashboard
│   │   └── FeatureCard.vue
        └── FeatureGrid.vue
│   └── diet            # Components specific to the diet feature
│       ├── DietDashboard.vue
│       ├── GoalsList.vue
│       ├── LogList.vue
│       └── PerformanceChart.vue
├── exercise           # Placeholder for exercise-related files
├── health             # Placeholder for health-related files
├── mentalhealth       # Placeholder for mental health-related files
├── screentime         # Placeholder for screen time-related files
├── sleep              # Placeholder for sleep-related files
└── walk               # Placeholder for walk-related files
├── pages             # Main pages of the application
│   ├── Dashboard.vue
│   ├── Diet.vue
│   ├── Exercise.vue
│   ├── Health.Vue
│   ├── HomePage.vue
│   ├── MentalHealth.vue
│   └── ScreenTime.vue #In the same way all the other pages have same pages
├── router            # Application routes
│   └── index.js
├── services          # API call services
│   ├── diet.js
│   ├── exercise.js
│   ├── health.js
│   ├── mentalhealth.js
│   ├── screenTime.js
│   ├── sleep.js
│   ├── user.js
│   ├── walk.js
│   └── water.js
├── utils             # Utility components and functions
│   ├── Toaster.vue
│   └── ToastManager.js
├── App.vue           # Main application component
├── main.js           # Entry point of the application
├── .gitignore        # Git ignore file
├── index.html        # Main HTML file
├── jsconfig.json     # JavaScript configuration file
├── package.json      # Project dependencies
├── package-lock.json # Lock file for dependencies
├── README.md         # This README file
└── vite.config.js    # Vite configuration file

## Key Directories and Their Purpose

*   **`components`**: Contains reusable UI components.
    *   **`common`**: Components used across multiple features (e.g., header, footer).
    *   Feature-specific folders (e.g., `diet`): Components related to a specific feature. Each feature typically includes:
        *   A modal for creating targets/goals.
        *   A modal for logging actual values/progress.
        *   `GoalList` and `LogList` components for displaying data.
        *   A chart component (e.g., `PerformanceChart`) for data visualization.

*   **`pages`**: Represents the main views or screens of the application. These components orchestrate the rendering of other components to create complete user interfaces.

*   **`router`**: Manages the application's navigation and routing.

*   **`services`**: Contains services responsible for making API calls and handling data fetching/persistence.

*   **`utils`**: Contains utility components and functions, such as the `Toaster` component for displaying notifications.

## Feature Component Structure (Example: `diet`)

Within feature-specific component folders (like `diet`), the following structure is generally followed:

*   `DietDashboard.vue`: The main dashboard or view for the diet feature.
*   `GoalsList.vue`: Displays the user's diet goals.
*   `LogList.vue`: Displays the user's logged diet data.
*   `PerformanceChart.vue`: Visualizes diet data in a chart.
*   (Modal components for creating goals and logging data are also typically present, though not explicitly shown in the simplified structure above).

This structure promotes code reusability, maintainability, and a clear separation

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

