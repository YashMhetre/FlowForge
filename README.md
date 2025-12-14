# 🧩 FlowForge – Visual Pipeline Builder

A full-stack web application that allows users to visually design, connect, and execute pipelines using a node-based interface. Built with **React.js** for the frontend and **FastAPI (Python)** for the backend, FlowForge enables intuitive workflow creation, validation, and execution through an interactive canvas.

![React](https://img.shields.io/badge/React-18.x-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-green)
![Python](https://img.shields.io/badge/Python-3.10+-yellow)
![Node Editor](https://img.shields.io/badge/React%20Flow-Enabled-purple)

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Workflow Execution Flow](#workflow-execution-flow)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 About The Project

FlowForge is designed to simplify the creation and execution of pipelines using a **visual, node-based approach**. Instead of writing complex configurations, users can drag, connect, and configure nodes to build workflows.

The backend validates and processes pipeline definitions, while the frontend provides a clean and interactive canvas for pipeline creation.

This project demonstrates:
- Frontend–backend integration
- Visual workflow systems
- API-driven execution
- Clean modular architecture

---

## ✨ Features

### Core Features (MVP)
- ✅ Visual node-based pipeline editor
- ✅ Drag-and-drop node creation
- ✅ Edge-based node connections
- ✅ Pipeline validation via backend
- ✅ Real-time pipeline state updates
- ✅ JSON-based pipeline representation

### Bonus Features
- ✅ Modular backend architecture
- ✅ Scalable node definitions
- ✅ Clear separation of concerns (router, service, models)
- ✅ CORS-enabled frontend–backend communication
- ✅ Developer-friendly API structure

---

## 🛠️ Tech Stack

### Frontend
- **React.js** – UI Framework
- **React Flow** – Visual node editor
- **Axios** – API communication
- **CSS** – Styling

### Backend
- **Python** – Core language
- **FastAPI** – Backend framework
- **Pydantic** – Data validation
- **Uvicorn** – ASGI server
- **CORS Middleware** – Cross-origin support

---

## 📦 Prerequisites

Ensure you have the following installed:

### Backend
- **Python** 3.10 or higher
- **pip**

### Frontend
- **Node.js** 18+
- **npm** or **yarn**

Check versions:
```bash
python --version
node -v
npm -v
```

### 🚀 Installation
1. Clone the Repository

```
git clone https://github.com/<your-username>/flowforge.git
cd flowforge
```

### 2. Backend Setup (FastAPI)
```
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Run the backend:
```
uvicorn main:app --reload
```
📍 Backend runs on: http://localhost:8000


### 3. Frontend Setup (React)
```
cd frontend
npm install
npm start
```

📍 **Frontend runs on:**  
```
http://localhost:3000
```

---

## 🎮 Usage

1. Open the frontend in your browser  
   👉 `http://localhost:3000`

2. Create nodes using the pipeline editor

3. Connect nodes to define the execution flow

4. Submit the pipeline

5. Backend validates and processes the pipeline

6. View execution results or errors



## 🔌 API Endpoints

### Base URL
```
http://localhost:8000
```

---

### 1. Health Check

```http
GET /
```

**Response**
```json
{
  "status": "Backend is running"
}
```

---

### 2. Validate / Execute Pipeline

```http
POST /pipeline/execute
Content-Type: application/json
```

**Request**
```json
{
  "nodes": [
    { "id": "1", "type": "input" },
    { "id": "2", "type": "process" }
  ],
  "edges": [
    { "source": "1", "target": "2" }
  ]
}
```

**Response**
```json
{
  "success": true,
  "message": "Pipeline executed successfully"
}
```

📁 Project Structure
```
flowforge/
├── backend/
│   ├── core/
│   │   └── config.py
│   ├── models/
│   │   └── pipeline_models.py
│   ├── routers/
│   │   └── pipeline_router.py
│   ├── services/
│   │   └── pipeline_service.py
│   ├── main.py
│   ├── .gitignore
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── config/
│   │   │   └── nodeConfigs.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── .gitignore
│   └── package.json
│
├── .gitignore
└── README.md
```


## 🔄 Workflow Execution Flow

1. User creates the pipeline visually on the frontend
2. Pipeline is converted into JSON format
3. JSON payload is sent to the FastAPI backend
4. Backend validates node connections and structure
5. Execution logic is applied to the pipeline
6. Execution result is returned to the frontend

---

## 🧠 Design Highlights

- **React Flow** enables a scalable, node-based user interface
- **FastAPI** ensures fast and efficient request handling
- **Pydantic models** guarantee strong data validation and integrity
- **Service-layer architecture** keeps the backend clean and extensible

Below is my Project Ouptut 

Image 1 : 
<img width="1708" height="867" alt="image" src="https://github.com/user-attachments/assets/744e787b-9d16-4864-8a70-b77c307dfe1f" />

Image 2 : 
<img width="1920" height="1080" alt="Screenshot (711)" src="https://github.com/user-attachments/assets/e8657f21-9e2d-49a2-81d4-e56097ef41a6" />


Image 3 :
<img width="1920" height="1080" alt="Screenshot (707)" src="https://github.com/user-attachments/assets/582cc8d5-38e9-4bd2-b868-408e4b92d78b" />
