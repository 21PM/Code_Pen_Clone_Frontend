# CodePen Clone #
Overview
The CodePen Clone project is a full-stack web application that replicates the core functionalities of CodePen. Users can write, edit,delete, code snippets, follow other users, and view their codes . This project is built using React.js for the frontend and Node.js, Express, and MongoDB for the backend, along with a variety of additional libraries to enhance functionality and user experience.

##Features##
User Authentication:

*Secure sign-up and login using email and password.*
*JWT-based authentication for maintaining user sessions..*
*Code Snippet Management:.*

*Create, save, edit, and delete code snippets..*
*Share code snippets publicly for others to view and save..*
*Social Features:.*

*Follow and unfollow other users..*
*Search for following users by name and explore their code snippets..*
*View followers and following lists on your profile..*
*Search Functionality:.*

*Search for code snippets by title..*
*Search for users by name in the following section..*
*Profile Management:.*

*View and manage your profile*
*Securely log out from the application..*
*Technology Stack.*

#Backend#
Node.js: JavaScript runtime for building the server-side application.
Express: Web framework for Node.js to handle routing and API creation.
MongoDB: NoSQL database for storing user data and code snippets.
Mongoose: ODM (Object Data Modeling) library for MongoDB.
bcryptjs: Library for hashing passwords.
jsonwebtoken: For generating and verifying JSON Web Tokens.
dotenv: For loading environment variables from a .env file.
cors: Middleware to enable Cross-Origin Resource Sharing.
cookie-parser: Middleware to parse cookies attached to client requests.


#Frontend#
React.js: JavaScript library for building user interfaces.
@mui/material: Material-UI components for a modern, responsive design.
@emotion/react & @emotion/styled: Libraries for writing CSS styles with JavaScript.
React Router DOM: For managing navigation and routing in the application.
React Redux & @reduxjs/toolkit: For managing application state.
Axios: For making HTTP requests to the backend.
React Hot Toast: For displaying notifications and toast messages.
React Icons: Collection of popular icons to use within the application.
##Installation##
##Prerequisites##
Node.js and npm installed on your machine.
A MongoDB instance (local or cloud).

Steps
** .Clone the Frontend repository: **
git clone https://github.com/21PM/Code_Pen_Clone_Frontend.git
cd codepen-clone

** .Clone the Backend repository: **
git clone https://github.com/21PM/Code_Pen_Clone_Backend.git

2.Backend Setup:
*Navigate to the backend directory:*
cd backend

3.Install the dependencies:
npm install


*Set up your environment variables by creating a .env file in the backend directory with the following content:*
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret-key

*Start the backend server:*
npm start


##Frontend Setup:##
Navigate to the frontend directory:
cd ../frontend

Install the dependencies:
npm install

Start the frontend server:
npm start


$Project Structure
backend/: Contains the Node.js server, API routes, and MongoDB models.
frontend/: Contains the React application, including components, pages, and styles.


#Deployment#
This project is deployed using:

Frontend: Vercel
Backend: Render

Contributing
Contributions are welcome! If you'd like to improve the project, feel free to fork the repository and submit a pull request. You can also open an issue if you find any bugs or have suggestions for new features.

ScreenShots

1. signup page
![image](https://github.com/user-attachments/assets/17c9adeb-faca-4955-a69a-14759c96fe47)

2.Login page
![image](https://github.com/user-attachments/assets/da7feb51-47f6-4b75-b160-46562a5d0046)

3. Your Work page
![image](https://github.com/user-attachments/assets/8d589863-0bf8-4cb5-821b-be9b280f3981)

4.Following page where you can see the codes of the users whom you are following
![image](https://github.com/user-attachments/assets/0bb2d50f-4579-4336-ac5d-ab82b2346e35)

5.Trending page
![image](https://github.com/user-attachments/assets/d1eda469-33cd-4ccc-9c09-60185079b8d8)

6.Pen page
![image](https://github.com/user-attachments/assets/658f1f01-0a47-4329-9dfb-ac76de07d6d5)

7. Profile Page
![image](https://github.com/user-attachments/assets/8f45427f-3444-4561-8625-90b1c361efd8)

8. View Followers and Search followers
![image](https://github.com/user-attachments/assets/a4cc56f1-b964-4f93-8e36-27cbc58d21a3)

9. View following and Search following
![image](https://github.com/user-attachments/assets/3f334082-4ba5-40a8-a3f1-e67f83304432)

10.Go to pen and  menu path
![image](https://github.com/user-attachments/assets/e2518a39-471e-4f7a-81ea-3562c84b614b)




License
This project is licensed under the MIT License. See the LICENSE file for details.


