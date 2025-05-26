# NotesAPI

📝 NotesAPI Project
📖 Overview
NotesAPI is a full-stack web application designed to manage personal notes effectively. It features:

🔧 A robust Spring Boot backend providing a RESTful API.

🎨 A modern React frontend offering an intuitive user interface.

This project demonstrates seamless integration between backend and frontend technologies while following full-stack development best practices.

🚀 Features
✅ Create, Read, Update, and Delete notes (CRUD).

📱 Responsive and user-friendly interface.

🔗 Backend API built with Spring Boot.

⚛️ Frontend built with React and Axios for smooth API interaction.

📁 Project Structure
graphql
Copy
Edit
notes-api/
├── backend/           # Spring Boot REST API
│   └── src/
├── frontend/          # React frontend application
│   └── src/
├── Makefile           # Automation script for starting services
└── README.md
🖥️ How to Run the Project
✅ Prerequisites
Java 17+

Node.js 16+ and npm

Maven (included with Spring Boot)

Make (pre-installed on macOS/Linux)

🔧 Steps to Run
Clone the Repository

bash
Copy
Edit
git clone https://github.com/oualidhassani/NotesAPI.git
cd notes-api
Install Dependencies

Backend:

bash
Copy
Edit
cd backend
./mvnw clean install
Frontend:

bash
Copy
Edit
cd ../frontend
npm install
Run the Application

Use the Makefile to start both backend and frontend:

bash
Copy
Edit
make run
🌐 Access the Application
Frontend: http://localhost:3000

Backend API: http://localhost:8080/api/notes

⚙️ API Endpoints
Method	Endpoint	Description
GET	/api/notes	Retrieve all notes
POST	/api/notes	Create a new note
PUT	/api/notes/{id}	Update a note by ID
DELETE	/api/notes/{id}	Delete a note by ID

The frontend uses Axios to perform these operations and displays data in real-time.

🧪 Testing
Backend: Test with tools like Postman, cURL, or directly through the frontend.

Frontend: Open the browser console for network/API call debugging.

📂 Makefile Commands
Command	Description
make run	Starts both backend & frontend
make run-backend	Starts only the backend
make run-frontend	Starts only the frontend

