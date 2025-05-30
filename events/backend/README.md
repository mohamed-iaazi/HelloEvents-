# Events Management System Backend

This is the backend service for the Events Management System, built with Spring Boot 3.x.

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- MySQL 8.0 or higher
- Your favorite IDE (IntelliJ IDEA, Eclipse, VS Code)

## Setup & Running

1. Clone the repository
2. Configure MySQL:
   - Make sure MySQL is running on port 3306
   - Default credentials in application.yml are:
     - username: root
     - password: root
   - The database 'events_db' will be created automatically

3. Navigate to the backend directory:
   ```bash
   cd backend
   ```
4. Build the project:
   ```bash
   mvn clean install
   ```
5. Run the application:
   ```bash
   mvn spring-boot:run
   ```

The server will start on `http://localhost:8080/api`

## Features

- User Authentication (JWT)
- Event Management (CRUD operations)
- Event Booking System
- Role-based Access Control
- MySQL Database with JPA/Hibernate

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login and get JWT token

### Events
- GET `/api/events` - Get all events (with optional category and search parameters)
- GET `/api/events/{id}` - Get event by ID
- POST `/api/events` - Create new event (Admin only)
- PUT `/api/events/{id}` - Update event (Admin only)
- DELETE `/api/events/{id}` - Delete event (Admin only)
- POST `/api/events/{id}/book` - Book event tickets (Authenticated users)

## Database Configuration

The application uses MySQL database with the following default configuration:
- URL: `jdbc:mysql://localhost:3306/events_db`
- Username: `root`
- Password: `root`

You can modify these settings in `application.yml`

## Security

- JWT-based authentication
- Role-based authorization (USER, ADMIN)
- Password encryption using BCrypt
- CORS configuration for frontend integration

## Integration with Frontend

The backend is configured to work with the Angular frontend running on `http://localhost:4200`. CORS is configured accordingly.

## Error Handling

The application includes comprehensive error handling for:
- Invalid requests
- Authentication/Authorization errors
- Resource not found
- Business logic violations (e.g., overbooking)

## Database Schema

The application will automatically create the following tables:
- users
- user_roles
- events

The schema is managed by JPA/Hibernate with auto-update functionality enabled. 