# Hair Harmony and Spa

Welcome to **Hair Harmony and Spa**, a sleek, full-stack web application tailored for modern salons. This platform enables customers to explore services, book appointments, and engage with salon offerings seamlessly. Additionally, it features an admin panel for efficient management of appointments, services, and salon details.

---

## Key Features

### Frontend
- **Vite + React**: Optimized development with fast build times and modern React features.
- **Base CSS**: Responsive, clean design using custom CSS styling.
- **Swipe.js**: Smooth and interactive image carousels for showcasing services.
- **React Calendar**: Integrated calendar for intuitive appointment scheduling.

### Backend
- **Node.js + Express**: Lightweight and scalable server-side solution.
- **Authentication**: Secure admin access with password protection.
- **JWT (JSON Web Tokens)**: Robust session management and user authorization.

---

## Installation and Setup Guide

### Prerequisites
Ensure the following are installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)
- A modern web browser

### Frontend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/shirosensei/hairHarmony.git
   ```
2. Navigate to the frontend folder:
   ```bash
   cd hair-harmony-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   # Or use yarn
   yarn install
   ```
4. Start the development server:
   ```bash
   npm run dev
   # Or use yarn
   yarn dev
   ```
5. Open your browser at `http://localhost:5173` to view the application.

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd hair-harmony-backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   # Or use yarn
   yarn install
   ```
3. Configure environment variables:
   Create a `.env` file and add:
   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the backend server:
   ```bash
   npm start
   # Or use yarn
   yarn start
   ```
5. The server runs at `http://localhost:5000`.

---

## Project Structure

### Frontend
```
frontend/
├── public/         # Static assets
├── src/
│   ├── assets/      # Images and resources
│   ├── components/  # Reusable React components
│   ├── pages/       # Application pages
│   ├── styles/      # CSS styling
│   └── App.jsx      # Main app entry point
└── vite.config.js   # Vite configuration
```

### Backend
```
backend/
├── controllers/    # Handles requests
├── middlewares/    # Authentication and error handling
├── models/         # MongoDB schemas
├── routes/         # API endpoints
├── utils/          # Utility functions
└── server.js       # Main server script
```

---

## Technologies Used

### Frontend
- **Vite**: High-performance build tool.
- **React**: Component-based user interface library.
- **Base CSS**: Custom responsive styles.
- **Swipe.js**: For interactive and user-friendly carousels.
- **React Calendar**: Simplified date selection.

### Backend
- **Node.js**: JavaScript runtime for server-side scripting.
- **Express**: Minimal web framework.
- **JWT**: Token-based secure session management.
- **MongoDB**: NoSQL database for flexible data storage.

---

## Admin Features
- **Secure Authentication**: Password-protected admin access.
- **Dashboard Management**:
  - Monitor and manage customer bookings.
  - Control service availability and time slots.
  - Update salon images and promotional content.

---

## Deployment Guide
This project is ready for deployment on the following platforms:

### Frontend
- **Vercel**: Deploy the `dist/` folder for static hosting.
- **Netlify**: Ideal for frontend deployments.

### Backend
- **Heroku**: Free-tier hosting for Node.js applications.
- **Render**: Simple backend hosting.

#### Deployment Steps
1. Build the frontend:
   ```bash
   npm run build
   ```
2. Deploy the `dist/` folder to a static hosting provider.
3. Deploy the backend server to a Node.js hosting platform.
4. Update the API endpoint in the frontend to match the backend’s deployed URL.

---

## Contributing
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "feat: your description here"
   ```
4. Push the changes:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
For queries or support, email me at [codersensei@outlook.com].

