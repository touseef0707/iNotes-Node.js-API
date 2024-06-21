# iNotes-Node.js-API

iNotes-Node.js-API is a RESTful API developed with Node.js and MongoDB, inspired by [CodeWithHarry](https://www.codewithharry.com/) tutorials. It supports secure user authentication and CRUD operations for managing notes.

## Features

- **User Authentication**: Secure registration and login using JWT.
- **CRUD Operations**: Create, read, update, and delete notes.
- **Input Validation**: Ensures data integrity using express-validator.
- **Database Integration**: Utilizes MongoDB for scalable data storage.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for flexible data storage.
- **Mongoose**: ODM for MongoDB and Node.js.
- **JWT**: Secure user authentication.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- MongoDB instance (local or cloud-based).

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/iNotes-Node.js-API.git
   ```
2. **Install dependencies**
   ```bash
   cd iNotes-Node.js-API
   npm install
   ```
3. **Set up environment variables**
   Edit the following variables:
   ```
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   ```
4. **Run the server**
   ```bash
   npm start
   ```

## API Endpoints

### Auth Routes

- **Create User**: `POST /api/auth/createuser`
- **Login**: `POST /api/auth/login`
- **Get User**: `GET /api/auth/getuser`

### Note Routes

- **Add Note**: `POST /api/notes/addnote`
- **Get All Notes**: `GET /api/notes/fetchallnotes`
- **Update Note**: `PUT /api/notes/:id`
- **Delete Note**: `DELETE /api/notes/:id`
