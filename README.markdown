# Stamurai Task Management Application

## Overview
This is a full-stack task management application built as part of the Stamurai coding challenge. The application allows users to register, log in, manage tasks, collaborate with team members, and view a personalized dashboard. It includes features like task creation, assignment, search, filtering, and notifications, with a focus on secure authentication and a user-friendly interface.

## Core Features
- **User Authentication**:
  - Secure registration and login with hashed passwords (using bcrypt).
  - Session-based authentication with JSON Web Tokens (JWT) for secure user sessions.
- **Task Management**:
  - Create, edit, view, and delete tasks with title, description, due date, priority (High, Medium, Low), and status (To Do, In Progress, Done).
- **Team Collaboration**:
  - Assign tasks to team members.
  - Email notifications sent to assignees upon task assignment (using Nodemailer).
- **Dashboard**:
  - Displays tasks assigned to the user, tasks created by the user, and overdue tasks.
- **Search and Filter**:
  - Search tasks by title or description.
  - Filter tasks by status, priority, and due date.

## Bonus Features (Optional Implemented)
- **Roles and Permissions**: Basic role system (Admin, User) to control task management access.
- **Activity Log**: Tracks task creation, updates, and deletions.
- **Automated Tests**: Unit tests for backend API endpoints using Jest.
- **Email Notifications**: Customizable notification settings for task assignments.

## Tech Stack
- **Frontend**: Next.js (React framework for server-side rendering and static site generation).
- **Backend**: Node.js with Express (RESTful API for handling server logic).
- **Database**: MongoDB (NoSQL database for storing users, tasks, and logs).
- **Authentication**: JWT for session management, bcrypt for password hashing.
- **Version Control**: Git with a public GitHub repository.
- **Deployment**: Vercel for frontend and backend hosting.
- **Other Tools**:
  - Mongoose for MongoDB object modeling.
  - Nodemailer for email notifications.
  - Jest for testing.
  - Tailwind CSS for responsive UI styling.

## Setup Instructions
### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance, e.g., MongoDB Atlas)
- Git
- A mail service (e.g., Gmail) for sending notifications

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/stamurai-task.git
   cd stamurai-task
   ```

2. **Install Dependencies**:
   - For the backend:
     ```bash
     cd backend
     npm install
     ```
   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the `backend` directory with the following:
     ```env
     MONGO_URI=your-mongodb-connection-string
     JWT_SECRET=your-jwt-secret
     EMAIL_USER=your-email-address
     EMAIL_PASS=your-email-password
     ```
   - Create a `.env.local` file in the `frontend` directory:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:5000/api
     ```

4. **Run the Application**:
   - Start the backend:
     ```bash
     cd backend
     npm run start
     ```
   - Start the frontend:
     ```bash
     cd frontend
     npm run dev
     ```
   - The app will be available at `http://localhost:3000`.

5. **Run Tests** (optional):
   ```bash
   cd backend
   npm run test
   ```

## Deployment
- **Frontend**: Deployed on Vercel at `https://stamurai-task.vercel.app`.
- **Backend**: Deployed on Vercel at `https://stamurai-task-backend.vercel.app`.
- **Public Repository**: [GitHub Repository](https://github.com/your-username/stamurai-task)

## Development Decisions
- **MongoDB**: Chosen for its flexibility with unstructured data and scalability for task management.
- **Express**: Used for its simplicity and robust ecosystem for building RESTful APIs.
- **Next.js**: Selected for its server-side rendering capabilities and seamless integration with Vercel.
- **JWT Authentication**: Implemented for secure, stateless session management.
- **Tailwind CSS**: Used for rapid, responsive UI development with minimal custom CSS.
- **Email Notifications**: Integrated Nodemailer for task assignment notifications, with plans to support customizable settings.

## Compromises
- **Real-Time Notifications**: Skipped WebSockets due to time constraints; used email notifications instead.
- **Offline Support**: PWA implementation was not prioritized to focus on core features.
- **Recurring Tasks**: Omitted to ensure robust implementation of core functionality.
- **Analytics**: Limited to basic dashboard stats due to scope constraints.

## Future Improvements
- Add WebSocket-based real-time notifications.
- Implement recurring tasks with a cron-like scheduler.
- Enhance analytics with charts using a library like Chart.js.
- Add offline support via Service Workers for PWA functionality.
- Expand roles and permissions for more granular access control.

## How to Use
1. **Register**: Create an account with a valid email and password.
2. **Log In**: Use your credentials to access the dashboard.
3. **Manage Tasks**: Create, edit, or delete tasks from the task management page.
4. **Assign Tasks**: Assign tasks to team members and trigger email notifications.
5. **Filter/Search**: Use the search bar and filters to find specific tasks.
6. **View Dashboard**: Check your assigned, created, and overdue tasks.

## Notes for Reviewers
- The code follows clean architecture principles with modular components and services.
- Input validation is handled using Joi on the backend and React Hook Form on the frontend.
- Error handling covers edge cases like empty inputs, invalid data, and server errors.
- Commit messages are descriptive, following the format: `[type]: short description` (e.g., `feat: add task creation endpoint`).
- The UI is responsive, tested on mobile, tablet, and desktop devices.
- Tests cover critical backend endpoints (user auth, task CRUD).

For any issues or questions, please contact [your-email@example.com].