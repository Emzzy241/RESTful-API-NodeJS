# RESTful API Project in Node.js

## 📌 Overview
This project is a **RESTful web application** built with **Node.js**. It follows RESTful conventions to manage subscribers' information using **MongoDB** as the database and **Mongoose** for interaction.

## 🔧 Tech Stack
- **Node.js** - Server-side runtime  
- **Express.js** - Web framework  
- **MongoDB** - Database  
- **Mongoose** - ODM for MongoDB  
- **dotenv** - Environment variable management  
- **nodemon** - Auto-restarts server  

## 🚀 Installation & Setup
### 1️1 Clone the repository
```sh
git clone <the-repo-url>
cd <Build-Quick-REST-API>
```
### 2️⃣ Install dependencies
```sh
npm install
```
### 3️⃣ Configure environment variables
Create a .env file in the root directory and add:

DATABASE_URL=mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/dbname
PORT=3000

### 4️⃣ Start the server
```sh
npm run devStart

or

nodemon server.js

```

### 📌 API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET    | `/subscribers` | Get all subscribers |
| GET    | `/subscribers/:id` | Get subscriber by ID |
| POST   | `/subscribers` | Add a new subscriber |
| PATCH  | `/subscribers/:id` | Update subscriber details |
| DELETE | `/subscribers/:id` | Delete a subscriber |

### 🛠 Testing API with REST Client Extension
You can use the REST Client extension in VS Code to easily test API endpoints.

#### 📌 Step 1: Install REST Client
Open VS Code.

Go to Extensions (Ctrl + Shift + X).

#### Search for REST Client.

#### Click Install.

📌 Step 2: Create a .http or .rest File
Inside your project folder, create a file named requests.http (or requests.rest).

📌 Step 3: Write API Requests
Example: GET all subscribers
```sh

GET http://localhost:3000/subscribers
Example: POST a new subscriber

### Triple hashtags is used to separate requets

POST http://localhost:3000/subscribers
Content-Type: application/json

{
    "name": "John Doe",
    "subscribedToChannel": "Tech World"
}
```
#### 📌 Step 4: Send Requests
Open your .http or .rest file.

Click the Send Request button above the request.

This will show the response directly in VS Code.

### 📚 Features
* CRUD operations following RESTful principles

* Error handling with proper status codes

* MongoDB integration with Mongoose models

* Environment variables for secure configuration

### 💡 Future Improvements
* Authentication & Authorization
* Pagination for large datasets
* Dockerizing the application

### 🤝 Contributing
Pull requests are welcome! For significant changes, please open an issue first to discuss the update.