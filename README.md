# EPMS - Employee & Project Management System

This is my first project of my web development field 


# Introduction 
The Employee and Project Management System (EPMS) is a web-based application designed to 
streamline the administration of employees and their assigned projects within an organization or 
academic environment. It allows administrators to manage employee records and project 
assignments while enabling employees to track and update the status of their assigned tasks. This 
system will be built using Node.js, Express.js, EJS, and MongoDB, with role-based access control and 
session-based authentication to ensure secure and personalized experiences.


# Overall Description 
EPMS integrates two core modules—Employee Management and Project Management—within a 
role-based architecture that defines two types of users: Admin and User (Employee). - Admins can manage employee records, assign projects, track progress, and monitor overall system 
activity. - Users can view and update their project status, as well as manage their profile information. 
The system is intended for educational, organizational, or training institute use, where structured 
management of teams and projects is needed. It features a simple UI using EJS templates, secure 
session control, and modular backend logic.


# Admin Functionality & Interface

3.1 Admin Functionalities                      Description
Functionality 
Login & Logout          -------->   Secure, session-based authentication for admins
Dashboard               -------->    Displays total employees, total projects, project statuses, and recent updates.
Employee Management ---------->   CRUD operations (Add, Edit, Delete) on employee records with role assignment. 
Project Management  --------->   Create, assign, update, and delete projects with employee linkage. 
Role Assignment    --------->  Assign or change roles of employees Project Status Monitoring 

# Technology Stack 
Layer                       Technology 
Frontend       -------> HTML5, CSS3, Bootstrap, EJS 
Backend        -------> Node.js with Express.js
Database       ------->MongoDB 
Session        -------> express-session 
Authentication -------> Custom middleware and session logic
 
