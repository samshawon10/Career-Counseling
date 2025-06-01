


````markdown
# 🎓 Lifesy — Career Counseling Platform

**Lifesy** is a modern and responsive web application that provides personalized career counseling services, expert guidance, and learning resources. Built with React and Firebase, the platform allows users to explore services, read blogs, interact through comments, and manage their learning journeys with ease.

🌐 **Live Website:** [https://lifesy-63501.web.app](https://lifesy-63501.web.app)

---

## ✨ Key Features

### 🧑‍🎓 User Experience
- Clean, modern UI with responsive design
- Animated transitions using **Framer Motion**
- Mobile-first layout with optimized accessibility

### 🔐 Authentication
- Email/password registration & login
- Google OAuth login
- Protected routes using React Router

### 🧩 Services & Enrollment
- Dynamic service listing from local JSON
- Detailed service pages with rich descriptions
- Enroll in services via modal confirmation
- Enrollments stored in Firestore under each user

### 💬 Comments & Interactions
- Authenticated commenting system per service
- Like & reply functionality
- Real-time updates via Firebase Firestore

### 📰 Blog Section
- Interactive blog posts with image support
- Likes and comments per post
- Data stored and managed in Firestore

### 👤 Profile Management
- Update display name and profile image
- View enrolled services

---

## 🧪 Tech Stack

| Category        | Technology                                |
|-----------------|--------------------------------------------|
| Frontend        | React, Tailwind CSS, Framer Motion, Swiper |
| Routing         | React Router DOM                          |
| Authentication  | Firebase Authentication                   |
| Database        | Firebase Firestore                        |
| Deployment      | Firebase Hosting                          |

---

## 📁 Project Structure

```bash
lifesy/
├── public/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page-level views
│   ├── routes/           # Route definitions (protected/public)
│   ├── data/             # Static service data (JSON)
│   ├── firebase/         # Firebase config & utilities
│   ├── App.jsx
│   └── main.jsx
├── .env                  # Firebase environment variables
├── tailwind.config.js
├── postcss.config.js
├── README.md
````

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/lifesy.git
cd lifesy
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add your Firebase credentials:

```env
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project.appspot.com
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
```

### 4. Run the Development Server

```bash
npm run dev
```

### 5. Build and Deploy

To deploy using Firebase CLI:

```bash
npm run build
firebase deploy
```

---

## 🗂️ Firestore Database Structure

```plaintext
Firestore
├── users/{uid}
│   └── enrollments/            # Subcollection of enrolled services
├── comments/
│   └── {serviceId}/commentList/
├── blogs/
│   └── {blogId}/               # Includes likes, comments, and image
```

---

## 📄 License

This project is open-source and available under the **MIT License**.

---

## 👨‍💻 Author

**Sam Shawon**
Frontend Developer | React & Firebase Specialist
📧 Email: [shawonakando518@gmail.com](mailto:shawonakando518@gmail.com)
🔗 LinkedIn: [linkedin.com/in/shawon-akando](https://www.linkedin.com/in/shawon-akando/)

---

> 💡 *Feel free to fork this repository, open issues, or submit pull requests to contribute.*

```
