# flashPay

## Description:
flashPay is a Paytm-clone web application that allows users to send and receive money seamlessly. The platform provides a secure and user-friendly interface for making financial transactions, offering features like account management and transaction history.

## Features:
- Send and receive money securely
- User authentication for secure transactions
- View transaction history and account details

## Technologies Used:
- React.js (Frontend)
- Express.js (Backend)
- MongoDB Atlas (Database)
- Tailwind CSS (Styling)

## Project Structure:
```
.
├── backend
│   └── Contains all the backend code, including routes, controllers, and database models
└── frontend
    └── Contains all the frontend code for the user interface
```

## How to Run:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ShaikhAman01/flashPay
   ```

2. **Navigate into the project directory**:
   ```bash
   cd flashPay
   ```

### Backend Setup:

3. **Navigate into the backend directory**:
   ```bash
   cd backend
   ```

4. **Set up environment variables for backend**:
   - Create a `.env` file in the `backend` directory with the following:
     ```bash
     MONGO_URI=your-mongo-db-uri
     JWT_SECRET=your-jwt-secret
     ```

   - Replace `your-mongo-db-uri` with your MongoDB Atlas URI and `your-jwt-secret` with a secret key for JWT authentication.

5. **Install backend dependencies**:
   ```bash
   npm install
   ```

6. **Run the backend server**:
   ```bash
   npm run server
   ```

### Frontend Setup:

7. **Navigate into the frontend directory**:
   ```bash
   cd ../frontend
   ```

8. **Install frontend dependencies**:
   ```bash
   npm install
   ```

9. **Run the frontend**:
   ```bash
   npm start
   ```

10. Open `http://localhost:3000` in your browser to view the app.
