# Amazon Clone Backend API

A full-stack e-commerce backend API built with Node.js, Express, and MongoDB.

## Features

- User authentication (signup/login)
- Product management with search and filtering
- Shopping cart functionality
- Wishlist management
- Order processing
- Admin role-based access control
- JWT token authentication

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running on localhost:27017)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start MongoDB service

3. Import product data (optional):
```bash
node db/importCsv.js
```

4. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication

#### POST `/user/signin`
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "age": 25
}
```

#### POST `/user/login`
Login user
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Products (Public)

#### GET `/products`
Get all products with pagination and filtering
- Query parameters:
  - `page` (default: 1)
  - `limit` (default: 10)
  - `search` - search in product name and description
  - `category` - filter by category
  - `minPrice` - minimum price filter
  - `maxPrice` - maximum price filter
  - `sortBy` - sort field (default: product_name)
  - `sortOrder` - asc/desc (default: asc)

#### GET `/products/categories`
Get all available product categories

#### GET `/products/:id`
Get product by ID

### Products (Admin Only)

#### POST `/product`
Add new product (requires admin token)
```json
{
  "product_name": "Product Name",
  "category": ["Electronics"],
  "discounted_price": 999,
  "actual_price": 1299,
  "discount_percentage": 23,
  "rating": 4.5,
  "ratingCount": 120,
  "about": "Product description",
  "img_link": "https://example.com/image.jpg"
}
```

#### PUT `/product/:id`
Update product (requires admin token)

#### DELETE `/product/:id`
Delete product (requires admin token)

### Cart (Authenticated Users)

#### GET `/cart`
Get user's cart

#### POST `/cart/add`
Add product to cart
```json
{
  "productId": "product_id_here",
  "quantity": 2
}
```

#### PUT `/cart/update/:productId`
Update product quantity in cart
```json
{
  "quantity": 3
}
```

#### DELETE `/cart/remove/:productId`
Remove product from cart

#### DELETE `/cart/clear`
Clear entire cart

### Wishlist (Authenticated Users)

#### GET `/wishlist`
Get user's wishlist

#### POST `/wishlist/add`
Add product to wishlist
```json
{
  "productId": "product_id_here"
}
```

#### DELETE `/wishlist/remove/:productId`
Remove product from wishlist

#### DELETE `/wishlist/clear`
Clear entire wishlist

### Orders (Authenticated Users)

#### POST `/order`
Create new order from cart
```json
{
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

#### GET `/orders`
Get user's order history

#### GET `/order/:id`
Get specific order details

#### PUT `/order/:id/status` (Admin Only)
Update order status
```json
{
  "status": "shipped"
}
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Database Models

### User
- name (required)
- email (required, unique)
- password (required, hashed)
- age
- role (user/admin, default: user)

### Product
- product_name
- product_id
- category (array)
- discounted_price
- actual_price
- discount_percentage
- rating
- ratingCount
- about
- img_link

### Cart
- userId (reference to User)
- products (array of product references with quantities)

### Wishlist
- userId (reference to User)
- products (array of product references)

### Order
- userId (reference to User)
- items (array of order items with product, quantity, price)
- totalAmount
- status (pending/processing/shipped/delivered/cancelled)
- shippingAddress

## Environment Variables

Create a `.env` file in the root directory:
```
MONGODB_URI=mongodb://localhost:27017/Amazon
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

## Error Handling

The API returns consistent error responses:
```json
{
  "message": "Error description",
  "error": "Detailed error message (in development)"
}
```

## Status Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error 