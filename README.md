# 📝 NotesAPI

<div align="center">

![NotesAPI Logo](https://via.placeholder.com/200x80/4A90E2/FFFFFF?text=NotesAPI)

**A Modern Full-Stack Notes Management System**

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.0+-brightgreen?style=for-the-badge&logo=springboot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Java](https://img.shields.io/badge/Java-17+-orange?style=for-the-badge&logo=java)](https://www.oracle.com/java/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)

[✨ Features](#-features) • [🚀 Quick Start](#-quick-start) • [📖 API Documentation](#-api-documentation) • [🛠️ Tech Stack](#️-tech-stack)

</div>

---

## 🌟 Overview

**NotesAPI** is a sleek, full-stack web application that revolutionizes how you manage your personal notes. Built with cutting-edge technologies, it offers a seamless experience across all devices.

### ✨ What Makes It Special?

- 🎯 **Intuitive Design** - Clean, modern interface that gets out of your way
- ⚡ **Lightning Fast** - Optimized performance for instant note management
- 📱 **Fully Responsive** - Perfect experience on desktop, tablet, and mobile
- 🔄 **Real-time Updates** - See your changes instantly across all components

---

## 🚀 Features

<table>
<tr>
<td width="50%">

### 🎨 Frontend Magic
- ⚛️ **React 18+** with modern hooks
- 🎭 **Material-UI** components
- 📡 **Axios** for seamless API calls
- 🎨 **Responsive Design** for all devices
- ⚡ **Real-time UI updates**

</td>
<td width="50%">

### 🔧 Backend Power
- 🍃 **Spring Boot 3.0+** framework
- 🗄️ **RESTful API** architecture
- 🔒 **Robust error handling**
- 📊 **H2 Database** (easily configurable)
- 🧪 **Comprehensive testing**

</td>
</tr>
</table>

---

## 📁 Project Architecture

```
notes-api/
├── 🔧 backend/                 # Spring Boot REST API
│   ├── src/main/java/
│   │   └── com/notesapi/
│   │       ├── controller/     # REST Controllers
│   │       ├── model/          # Data Models
│   │       ├── service/        # Business Logic
│   │       └── repository/     # Data Access Layer
│   └── src/main/resources/
├── ⚛️ frontend/                # React Frontend
│   ├── public/
│   └── src/
│       ├── components/         # React Components
│       ├── services/           # API Services
│       └── styles/             # CSS/SCSS Files
├── 🛠️ Makefile                # Development Automation
└── 📖 README.md               # This awesome file!
```

---

## 🚀 Quick Start

### 📋 Prerequisites

Make sure you have these installed:

- ☕ **Java 17+** 
- 📦 **Node.js 16+** & npm
- 🔨 **Maven** (bundled with Spring Boot)
- ⚙️ **Make** (pre-installed on macOS/Linux)

### 🎯 One-Command Setup

```bash
# Clone the magic ✨
git clone https://github.com/oualidhassani/NotesAPI.git
cd notes-api

# Install all dependencies 📦
make install

# Launch the entire stack 🚀
make run
```

### 🎛️ Manual Setup (If You Prefer)

<details>
<summary>Click to expand manual setup instructions</summary>

#### Backend Setup
```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

</details>

---

## 🌐 Access Your Application

<div align="center">

| Service | URL | Description |
|---------|-----|-------------|
| 🎨 **Frontend** | [`http://localhost:3000`](http://localhost:3000) | Beautiful React UI |
| 🔧 **Backend API** | [`http://localhost:8080`](http://localhost:8080) | RESTful API Server |
| 📊 **API Docs** | [`http://localhost:8080/api/notes`](http://localhost:8080/api/notes) | Live API Testing |

</div>

---

## 📖 API Documentation

### 🛣️ Available Endpoints

<table>
<tr>
<th>Method</th>
<th>Endpoint</th>
<th>Description</th>
<th>Example</th>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/api/notes</code></td>
<td>📋 Fetch all notes</td>
<td><code>curl -X GET http://localhost:8080/api/notes</code></td>
</tr>
<tr>
<td><code>POST</code></td>
<td><code>/api/notes</code></td>
<td>✏️ Create new note</td>
<td><code>curl -X POST -H "Content-Type: application/json" -d '{"title":"My Note","content":"Hello World"}' http://localhost:8080/api/notes</code></td>
</tr>
<tr>
<td><code>PUT</code></td>
<td><code>/api/notes/{id}</code></td>
<td>📝 Update existing note</td>
<td><code>curl -X PUT -H "Content-Type: application/json" -d '{"title":"Updated","content":"New content"}' http://localhost:8080/api/notes/1</code></td>
</tr>
<tr>
<td><code>DELETE</code></td>
<td><code>/api/notes/{id}</code></td>
<td>🗑️ Delete note</td>
<td><code>curl -X DELETE http://localhost:8080/api/notes/1</code></td>
</tr>
</table>

### 📝 Request/Response Examples

<details>
<summary>📊 Sample JSON Payloads</summary>

**Create Note Request:**
```json
{
  "title": "My Awesome Note",
  "content": "This is the content of my note with **markdown** support!"
}
```

**Sample Response:**
```json
{
  "id": 1,
  "title": "My Awesome Note",
  "content": "This is the content of my note with **markdown** support!",
  "createdAt": "2024-03-15T10:30:00Z",
  "updatedAt": "2024-03-15T10:30:00Z"
}
```

</details>

---

## 🛠️ Tech Stack

<div align="center">

### Backend Technologies
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![Maven](https://img.shields.io/badge/Apache%20Maven-C71A36?style=for-the-badge&logo=Apache%20Maven&logoColor=white)
![H2 Database](https://img.shields.io/badge/H2-Database-blue?style=for-the-badge)

### Frontend Technologies
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

</div>

---

## 🎮 Makefile Commands

<div align="center">

| Command | Action | Description |
|---------|--------|-------------|
| `make run` | 🚀 | Start both backend & frontend |
| `make run-backend` | 🔧 | Start only the backend server |
| `make run-frontend` | ⚛️ | Start only the frontend app |
| `make install` | 📦 | Install all dependencies |
| `make clean` | 🧹 | Clean build artifacts |
| `make test` | 🧪 | Run all tests |

</div>

---

## 🧪 Testing & Development

### 🔍 Testing the API
- **Postman**: Import our collection for instant API testing
- **cURL**: Use the examples provided above
- **Frontend**: Built-in testing through the React interface
- **Browser DevTools**: Monitor network calls in real-time

### 🐛 Debugging Tips
```bash
# Backend logs
tail -f backend/logs/application.log

# Frontend debugging
# Open browser console (F12) → Network tab
```

---

## 🤝 Contributing

We love contributions! Here's how you can help:

1. 🍴 **Fork** the repository
2. 🌟 **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. 📤 **Push** to the branch (`git push origin feature/amazing-feature`)
5. 🎯 **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙋‍♂️ Support & Contact

<div align="center">

**Need help?** We're here for you!

[![GitHub Issues](https://img.shields.io/badge/GitHub-Issues-red?style=for-the-badge&logo=github)](https://github.com/oualidhassani/NotesAPI/issues)
[![Email](https://img.shields.io/badge/Email-Contact-blue?style=for-the-badge&logo=gmail)](mailto:your-email@example.com)

</div>

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with ❤️ by [Oualid Hassani](https://github.com/oualidhassani)

</div>
