# Scheduler Application

## Introduction
Scheduler is a robust web-based scheduling application designed to serve multiple user roles, including Super Admin, Admin, Staff, Doctor, and Patient. The application is structured to handle appointment creation, cancellation, provider scheduling, and boasts a user-friendly calendar interface, all while focusing on security, scalability, and performance optimization.

### User Roles
- **Super Admin**: Overarching control across all locations.
- **Admin**: Manage specific locations.
- **Staff**: Access and manage appointments for permitted locations.
- **Doctor**: Update availability and manage appointments.
- **Patient**: Book appointments with available providers.

## Features
- Microservices architecture for role-based access control.
- Flexible scheduling options based on provider availability, location, and services.
- Database storage for user profiles, appointment details, and documents.
- Security with emphasis on protecting sensitive data.
- Real-time notifications for bookings, cancellations, and schedule changes.

## Technology Stack
- Backend: Node.js with Express
- Database: MongoDB with Mongoose ODM
- Frontend: React with Redux state management
- Styling: Bootstrap, HTML5, CSS3
- Real-time communication: Socket.io
- Client-Server communication: axios
- Utilities: FullCalendar, moment, lodash
- Authentication: bcrypt, jsonwebtoken
- Environment configuration: dotenv
- Task scheduling: node-cron

## Installation & Setup
1. Clone the repository from `github.com/M-Elsaied/scheduler`
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/scheduler
   JWT_SECRET=replace_with_your_secret
   ```
   Save these in a `.env` file in the root directory of the project.
4. Start the server:
   ```sh
   npm start
   ```

## Usage
After starting the server, different user roles can perform actions as defined by their user stories. The front-end application, once set up, will provide a user interface to interact with the scheduling functionalities.

## Contributing
Contributors are advised to follow the feature-based branching strategy for development. Please adhere to the code of conduct and maintain the ethos of collaborative development.

## License
The Scheduler application is open-sourced under the ISC license.