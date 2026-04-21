# 🌆 Smart City Dashboard

An interactive web-based dashboard that visualizes real-time city data such as traffic, pollution, weather, and events across major Indian cities.

---

## 🌐 Live Demo

👉 https://smart-city-dashboard-nine-orpin.vercel.app/

---

## 🚀 Features

### 🏙️ City Selection

* Switch between major Indian cities:

  * Hyderabad
  * Mumbai
  * Delhi
  * Bengaluru
  * Chennai
* "All Cities" option for comparison view

---

### 🚦 Traffic Visualization

* Displays:

  * Vehicle Count
  * Traffic Density
* Interactive charts using Recharts
* Comparison graph for all cities

---

### 🌫️ Pollution Monitoring

* Shows Air Quality Index (AQI)
* Color indicators:

  * 🟢 Good
  * 🟡 Moderate
  * 🔴 Poor
* City-wise pollution breakdown

---

### 🎉 Events Section

* Displays ongoing city events
* Includes:

  * Event name
  * Location
  * Date & Time

---

### 🌤️ Weather Info

* Displays:

  * Temperature
  * Humidity
  * Wind speed

---

### 🗺️ Live Map Integration

* Map view using Leaflet
* City-based location updates
* Markers for events and traffic zones

---

### 🔴 Real-Time Feel

* Live indicator
* Auto-refresh data every few seconds

---

### 🎨 UI & Design

* Glassmorphism design
* Gradient + city background
* Fully responsive layout
* Dark mode support

---

## 🛠️ Tech Stack

### Frontend:

* React (Vite)
* Recharts (Charts)
* Leaflet (Maps)

### Backend:

* Node.js
* Express.js

### Database:

* MongoDB Atlas

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/smart-city-dashboard.git
cd smart-city-dashboard
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
FRONTEND_URL=http://localhost:5173
```

Run backend:

```bash
node server.js
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## ⚠️ Note

* This project currently uses simulated or static data for demonstration
* Backend must be deployed for full functionality

---

## 💡 Future Improvements

* Real-time API integration (traffic & pollution data)
* AI-based predictions (traffic / AQI trends)
* Alert system for high pollution zones
* User personalization

---

## 🎯 Project Goal

To provide a smart, interactive, and real-time visualization platform for urban city monitoring and analysis.

---

## 🌟 Tagline

**"Smarter cities start with smarter data."**
