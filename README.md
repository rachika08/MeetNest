# MeetNest 🎥

A modern real-time video conferencing platform built using the MERN stack and WebRTC. MeetNest enables users to create and join secure video meetings directly from their browser without requiring any additional software installation.

## 🌐 Live Demo

👉 **Live Website:** https://meetnest-8j27.onrender.com

---

## 📌 Features

* 🎥 Real-time video and audio communication
* 🔗 Create and join meeting rooms instantly
* 👥 Multi-user video conferencing
* 💬 Real-time chat during meetings
* 🎙️ Mute/Unmute microphone
* 📹 Turn camera on/off
* 🖥️ Screen sharing support
* ⚡ Peer-to-peer communication using WebRTC
* 🔄 Real-time signaling with Socket.io
* 📱 Responsive design for desktop and mobile devices
* Authentication & authorization

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* CSS 
* Socket.io Client

### Backend

* Node.js
* Express.js
* Socket.io

### Database

* MongoDB

### Real-Time Communication

* WebRTC
* Socket.io

---

## 🏗️ Architecture

```text
Client A  <------ WebRTC ------>  Client B
    |                                   |
    |------ Socket.io Signaling --------|
                     |
                 Node.js Server
```

WebRTC handles the direct peer-to-peer media exchange, while Socket.io is used as the signaling server to exchange SDP offers, answers, and ICE candidates.

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/rachika08/MeetNest/
cd MeetNest
```

### Install dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
npm install
```

---

## ▶️ Run Locally

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd frontend
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

---

## 📂 Project Structure

```text
MeetNest/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── socket/
│   ├── models/
│   ├── controllers/
│   └── package.json
│
└── .gitignore
```

---

## 🔮 Future Improvements

* Meeting recording
* Waiting room functionality
* Raise hand feature
* Virtual backgrounds
* Meeting scheduling
* End-to-end encryption

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👩‍💻 Author

Developed with ❤️ by **Rachika**
