# MERN Blog Application

A full-stack **MERN (MongoDB, Express, React, Node.js)** blog application allowing users to create, read, update, and delete blog posts. This project demonstrates modern web development practices, RESTful API integration, and React frontend design.

---

## Features

- **User Authentication:** Sign up, log in, and protected routes.
- **CRUD Operations:** Create, read, update, and delete blog posts.
- **RESTful API:** Fully functional backend with Express and MongoDB.
- **Responsive Design:** React frontend optimized for desktop and mobile.
- **Error Handling:** Graceful handling of errors and invalid requests.
- **Future Enhancements:** Commenting, likes, user profiles, image uploads.

---

## Technologies Used

**Frontend:**  
- React  
- React Router DOM  
- Axios  
- CSS / Tailwind CSS (optional styling)

**Backend:**  
- Node.js  
- Express.js  
- MongoDB & Mongoose  
- dotenv (environment variables)

**Dev Tools:**  
- VS Code  
- Postman (API testing)  
- Git & GitHub  

---

## Getting Started

### Prerequisites

- Node.js installed ([Download Node.js](https://nodejs.org/))  
- MongoDB installed or MongoDB Atlas account  

---

### Backend Setup

1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `server` with the following:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   Backend runs on `http://localhost:5000`.

---

### Frontend Setup

1. Navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```
   React frontend runs on `http://localhost:3000`.

---

## API Endpoints

| Method | Endpoint            | Description                  |
|--------|-------------------|------------------------------|
| GET    | /api/posts         | Get all blog posts           |
| GET    | /api/posts/:id     | Get a specific blog post     |
| POST   | /api/posts         | Create a new blog post       |
| PUT    | /api/posts/:id     | Update a specific blog post  |
| DELETE | /api/posts/:id     | Delete a specific blog post  |

---

## Folder Structure

```
mern-blog/
├── client/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── api.js
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── PostList.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── CreatePost.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EditPost.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── PostDetails.jsx
│   │   └── PostForm.jsx
│   ├── App.jsx
│   └── index.js
├── server/         # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
├── README.md
```



## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.  
2. Create a new branch: `git checkout -b feature-name`.  
3. Make changes and commit: `git commit -m "Description of changes"`.  
4. Push to your branch: `git push origin feature-name`.  
5. Open a pull request.  

---

## License

This project is open-source and available under the **MIT License**.  

---

## Author

**Joseph Chege**  
- GitHub: [KyUCOMRADE](https://github.com/KyUCOMRADE)  

---

## Acknowledgements

- [MongoDB Documentation](https://docs.mongodb.com/)  
- [Express.js Guide](https://expressjs.com/)  
- [React Official Docs](https://reactjs.org/docs/getting-started.html)  
- Inspired by modern MERN stack tutorials and best practices.
