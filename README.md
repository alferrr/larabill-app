# Larabill 💰

Larabill is a simple full-stack web application for tracking budgets and subscriptions. It helps you keep an eye on your spending, manage recurring subscriptions, and see your budget overview at a glance.

Built with **Laravel** for the backend and **Vue.js** for the frontend, Larabill is a lightweight, responsive, and easy-to-use application.

---

## Tech Stack

- **Backend:** Laravel, PHP, REST API
- **Frontend:** Vue.js, Vite, Axios
- **Database:** SQLite (local)
- **Tools:** Git, Composer, NPM

---

## Features

- **User Authentication:** Secure register and login system.
- **Monthly Budget Tracking:** Set limits and monitor your spending.
- **Subscription Management:** Keep track of recurring costs like Netflix, Spotify, or Gym memberships.
- **Dashboard Overview:** Visual breakdown of your financial health.
- **Responsive Interface:** Optimized for both desktop and mobile viewing.

---

## Project Structure

```text
larabill/
├── backend/          # Laravel API
│   ├── app/
│   ├── routes/
│   ├── database/
│   └── composer.json
│
├── frontend/         # Vue.js
│   ├── src/
│   ├── package.json
│   └── vite.config.js
```
---

## Getting Started (Local Development)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/larabill.git
cd larabill
```

### 2. Backend Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Create SQLite database file:

```bash
touch database/database.sqlite
```

Run migrations and seeders:

```bash
php artisan migrate --seed
```

Start the backend server:

```bash
php artisan serve
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

The application will be accessible at *http://localhost:5173*.

---

## Architecture Overview

Larabill follows a decoupled architecture:

- **Frontend:** Multi-page Vue.js application that handles the UI and user interactions.  
- **API:** A stateless Laravel backend that serves JSON data via REST endpoints.  
- **Communication:** Axios acts as the bridge between frontend and backend, ensuring smooth, asynchronous updates without full page reloads.

---

## Contributing

1. Fork the project.  
2. Create your feature branch:  
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request.

---

## License

This project is distributed under the MIT License. See the [LICENSE](LICENSE) file for more information.
