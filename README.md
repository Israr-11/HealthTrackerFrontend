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


## Folder Descriptions

- **`components`**: Contains reusable components and feature-specific components.
  - **`common`**: Shared components like `Footer.vue` and `Navbar.vue`.
  - **`dashboard`**: Components used in the dashboard, such as `FeatureCard.vue`.
  - **`diet`**: Contains components specific to diet-related features, including `DietDashboard.vue` and `PerformanceChart.vue`.

- **`exercise`, `health`, `mentalhealth`, `screentime`, `sleep`, `walk`**: Placeholders for feature-related files.

- **`pages`**: Main pages of the application, including `Dashboard.vue`, `Diet.vue`, and `HomePage.vue`.

- **`router`**: Manages application routes (`index.js`).

- **`services`**: API service files for various features like `diet.js`, `exercise.js`, and `water.js`.

- **`utils`**: Utility components and functions, such as `Toaster.vue` and `ToastManager.js`.

## Configuration and Entry Files

- **`App.vue`**: The root application component.
- **`main.js`**: Entry point for the application.
- **`vite.config.js`**: Configuration for Vite build tool.
- **`index.html`**: Main HTML file for the app.
- **`package.json`**: Lists project dependencies and scripts.
- **`package-lock.json`**: Lock file ensuring consistent dependency versions.
- **`.gitignore`**: Specifies files to be ignored by Git.

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

