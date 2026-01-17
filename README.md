# 💰 Expense Tracker

A full-stack expense tracking application built with the MERN stack, designed to help you manage your finances with ease and visualize your spending patterns.

**Live Demo:** [https://mern-expense-tracker-frontend-nine.vercel.app/](https://mern-expense-tracker-frontend-nine.vercel.app/)

## ✨ Features

- **User Authentication** - Secure login and registration with JWT tokens
- **Expense Management** - Add, edit, and delete expenses with categories
- **Visual Analytics** - Interactive charts to visualize spending patterns
- **Category Tracking** - Organize expenses by custom categories
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Secure Sessions** - Cookie-based authentication for enhanced security

## 🛠️ Tech Stack

### Frontend
- **React + Vite** - Fast build tool and UI library
- **Lucide React** - Beautiful icon library
- **Chart.js** - Data visualization and charting
- **Axios** - HTTP client for API requests
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Cookie Parser** - Cookie handling middleware

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/ram0050/MERN_EXPENSE_TRACKER.git
cd MERN_EXPENSE_TRACKER
```

2. Install backend dependencies
```bash
cd server
npm install
```

3. Install frontend dependencies
```bash
cd ../client
npm install
```

4. Create a `.env` file in the server directory
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

5. Create a `.env` file in the client directory
```env
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

1. Start the backend server
```bash
cd server
npm start
```

2. Start the frontend development server (Vite)
```bash
cd client
npm run dev
```

The application will open at `http://localhost:5173`

## 📱 Usage

1. **Register/Login** - Create an account or log in to access your dashboard
2. **Add Expenses** - Click the add button to record new expenses with amount, category, and description
3. **View Analytics** - Check your spending patterns through interactive charts
4. **Manage Categories** - Organize expenses by creating custom categories
5. **Track History** - View all your expenses in a detailed list

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

**Ram Sharma**

## 🎨 Acknowledgments

- UI Design inspiration by **Pedro**
- All functionality and backend implementation by **Ram Sharma**

---

Made with ❤️ using the MERN stack + Vite
