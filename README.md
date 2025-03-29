# EmployWise User Management Application

## Overview
This React application integrates with the Reqres API to provide basic user management functionalities, including authentication, user listing, editing, and deleting users.

## Features
### Level 1: Authentication
- Login screen with email and password.
- Redirects to the user list page after login.

### Level 2: User List
- Fetches and displays a paginated list of users.
- Shows user details (first name, last name, avatar) in a structured format.
- Implements pagination or lazy loading.

### Level 3: Edit, Delete, and Update Users
- Edit: Allows updating user details using a pre-filled form.
- Delete: Removes the user from the list.

## Technologies Used
- React (Frontend Framework)
- Axios / Fetch API (HTTP Requests)
- React Router (Navigation)
- LocalStorage / SessionStorage (Token Persistence)
- Tailwind CSS / Bootstrap / Custom CSS (Styling)

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/employwise-user-management.git
   ```
2. Navigate to the project folder:
   ```sh
   cd employwise-user-management
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm start
   ```


## Screenshots
### Login Page
![image](https://github.com/user-attachments/assets/e1d5e2d5-8f98-4f1c-a0db-9e4ad83241ea)


### User List Page
![image](https://github.com/user-attachments/assets/f4419109-61b4-49a3-a06a-9b8674c834ba)


### Edit User Page
![image](https://github.com/user-attachments/assets/eb0e047b-c08e-4485-b9bf-2f8614f82ac0)

## Error Handling
- Displays validation messages for invalid login attempts.
- Shows error messages for API failures.
- Redirects users to login if authentication token is missing or expired.


## Bonus Features
- Client-side search and filtering.
- React Router for seamless navigation.


## License
This project is licensed under the MIT License.

