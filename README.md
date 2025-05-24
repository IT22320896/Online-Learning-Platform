# Online Learning Platform with GPT Integration

A full-stack MERN application for an online learning platform with GPT-powered course recommendations.

## 🌟 Features

### Student Features

- User authentication (sign up and login)
- Browse available courses with filtering and search
- View detailed course information
- Enroll in courses
- View enrolled courses
- Get AI-powered course recommendations using OpenAI's GPT

### Instructor Features

- Create and manage courses
- View enrolled students
- Edit course details

### Technical Features

- JWT-based authentication
- Role-based access control
- MongoDB database integration
- API request logging for GPT usage
- Responsive UI with Tailwind CSS

## 🔧 Tech Stack

### Frontend

- React with Vite
- React Router for navigation
- Tailwind CSS for styling
- Axios for API requests
- JWT decode for token handling

### Backend

- Node.js and Express
- MongoDB
- JWT for authentication
- bcrypt for password hashing
- OpenAI API for GPT integration

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- OpenAI API key

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/IT22320896/Online-Learning-Platform.git
   cd Online-Learning-Platform
   ```

2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:

   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   OPENAI_API_KEY=your_openai_api_key

   # Cloudinary credentials
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Install frontend dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

5. Create a `.env` file in the frontend directory:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. Start the backend server:

   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:

   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## 📖 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/profile` - Get current user profile

### Course Endpoints

- `GET /api/courses` - Get all courses (with filtering)
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create a new course (instructors only)
- `PUT /api/courses/:id` - Update a course (course instructor only)
- `DELETE /api/courses/:id` - Delete a course (course instructor only)
- `POST /api/courses/:id/enroll` - Enroll in a course (students only)
- `GET /api/courses/instructor/my-courses` - Get instructor's courses
- `GET /api/courses/:id/students` - Get enrolled students for a course

### GPT Endpoints

- `POST /api/gpt/recommendations` - Get course recommendations
- `GET /api/gpt/stats` - Get API usage statistics (admin only)

## 📊 Database Schema

### User

- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, required)
- `role` (String, enum: ['student', 'instructor', 'admin'])
- `enrolledCourses` (Array of Course references)
- `createdCourses` (Array of Course references)
- `profileImage` (String)
- `bio` (String)
- `isActive` (Boolean)
- `timestamps` (createdAt, updatedAt)

### Course

- `title` (String, required)
- `description` (String, required)
- `instructor` (Reference to User)
- `thumbnail` (String)
- `content` (String, required)
- `duration` (Number)
- `level` (String, enum: ['beginner', 'intermediate', 'advanced'])
- `category` (String, required)
- `tags` (Array of Strings)
- `enrolled` (Array of User references)
- `rating` (Object with average and count)
- `reviews` (Array of Objects with user, rating, comment)
- `isPublished` (Boolean)
- `timestamps` (createdAt, updatedAt)

### ApiLog

- `endpoint` (String)
- `userId` (Reference to User)
- `prompt` (String)
- `tokensUsed` (Number)
- `requestTime` (Number)
- `success` (Boolean)
- `errorMessage` (String)
- `timestamps` (createdAt, updatedAt)

## 🙏 Acknowledgements

- [OpenAI](https://openai.com/) for GPT API
- [MongoDB](https://www.mongodb.com/) for database
- [Express](https://expressjs.com/) for backend framework
- [React](https://reactjs.org/) for frontend library
- [Node.js](https://nodejs.org/) for JavaScript runtime
- [Tailwind CSS](https://tailwindcss.com/) for styling
