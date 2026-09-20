# User & Product API

A REST API built with Node.js and Express.js for managing users and products, including CRUD operations, password hashing, product image uploads, and user-product relationships.

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* Cloudinary
* Multer
* bcrypt

## Features

* User registration with password hashing
* User login with credential verification
* Retrieve, update, and delete users
* Password updates with bcrypt hashing
* Create and retrieve products
* Product image uploads
* Cloudinary image storage
* User-product relationships
* MongoDB database integration

## API Endpoints

### Users

| Method | Endpoint                     | Description       |
| ------ | ---------------------------- | ----------------- |
| POST   | `/users/new-user`            | Create a new user |
| POST   | `/users/login`               | Log in a user     |
| GET    | `/users/all-users`           | Get all users     |
| GET    | `/users/get-one-user/:id`    | Get a single user |
| PATCH  | `/users/update-user/:userId` | Update a user     |
| DELETE | `/users/delete-user/:userId` | Delete a user     |

### Products

| Method | Endpoint           | Description                    |
| ------ | ------------------ | ------------------------------ |
| POST   | `/products/upload/:userId` | Create a product with an image |
| GET    | `/products/getall` | Get all products               |

## Project Structure

```text
├── config/
│   ├── cloudinary.js
│   └── multer.js
├── controller/
│   ├── productController.js
│   └── userController.js
├── model/
│   ├── productModel.js
│   └── userModel.js
├── routes/
│   ├── productRoutes.js
│   └── userRoutes.js
├── .env
├── .gitignore
├── index.js
└── package.json
```

## Environment Variables

Create a `.env` file in the root directory:

```env
ATLAS_STRING=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Installation

```bash
git clone <your-repository-url>
cd user-product-api
npm install
node index.js
```

The server runs on:

```text
http://localhost:5555
```
