

````markdown
# 🎓 Lifesy — Career Counseling Platform


🌐 **Live Website:** [https://lifesy-63501.web.app](https://lifesy-63501.web.app)

---

## ✨ Features

- 🔒 **Authentication**: Email/password and Google sign-in via Firebase
- 🎯 **Services**: Browse and enroll in career guidance services
- 💬 **Comments & Likes**: Interact with services and blogs
- 📰 **Blog Page**: Firebase-backed blog with media, likes, and comments
- 👤 **User Profile**: Manage profile and view enrollments
- 🎥 **Smooth Animations**: Framer Motion and Swiper integration
- 📱 **Responsive Design**: Fully optimized for all devices

---

## 🛠️ Tech Stack

| Category        | Technology                                |
|----------------|--------------------------------------------|
| Frontend        | React, Tailwind CSS, Framer Motion, Swiper |
| Routing         | React Router DOM                          |
| Auth & DB       | Firebase Authentication, Firestore        |
| Hosting         | Firebase Hosting                          |

---

## 🗂️ Project Structure

```bash
lifesy/
├── public/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page-level views
│   ├── routes/           # Protected/public routes
│   ├── data/             # Static JSON data
│   ├── firebase/         # Firebase config
│   ├── App.jsx
│   └── main.jsx
├── .env
├── tailwind.config.js
├── README.md
````

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/lifesy.git
cd lifesy
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project.appspot.com
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
```

### 4. Run Development Server

```bash
npm run dev
```

### 5. Deploy to Firebase

```bash
npm run build
firebase deploy
```

---

## 📊 Firestore Data Structure

```plaintext
Firestore
├── users/{uid}
│   └── enrollments/
├── comments/
│   └── {serviceId}/commentList/
├── blogs/
│   └── {blogId}/ (likes, comments, images)
```

---


## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Sam Shawon**
Frontend Developer — React & Firebase Specialist
📧 Email: [shawonakando518@gmail.com](mailto:shawonakando518@gmail.com)
🔗 LinkedIn: [linkedin.com/in/shawon-akando](https://www.linkedin.com/in/shawon-akando/)

---
