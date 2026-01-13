Task Manager
Candidate Info

Name: Ahtesham Shakeel
Phone / WhatsApp: +923425477337
Backend: Laravel
GitHub: https://github.com/ahtesham345/Task-Manager
Time Taken: Around 3 hours

Project Overview

Mini Task Management app with authentication.
Users can log in, create tasks, toggle completion, delete tasks, and filter tasks.

Features

JWT-based login

Persist authentication

Fetch, create, update, delete tasks

Filter tasks: all / completed / pending

Frontend: Nuxt 4, TypeScript, Pinia

Backend: Laravel, REST API, JWT

Tech Stack

Frontend: Nuxt 4, Composition API, TypeScript, Pinia
Backend: Laravel 12, JWT Auth
Database: MySQL 

Setup Instructions
Backend

Clone backend repository

Install dependencies: composer install

Copy .env.example → .env and configure DB

Generate app key: php artisan key:generate

Generate JWT secret: php artisan jwt:secret

Run migrations: php artisan migrate

Start backend server: php artisan serve

Frontend

Clone frontend repository

Install dependencies: npm install

Start dev server: npm run dev

Open in browser: http://localhost:3000/login

Architecture

Stores: auth and task Pinia stores manage state and API calls

Composables: useApi handles API requests with token and error handling

Middleware: Auth middleware protects task pages

Components: Login.vue, Tasks.vue
