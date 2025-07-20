import express from 'express'
import cors from 'cors'
import {dbConnection} from './db/dbConnection.js';
import { userModel } from './db/models/user.js';
import { userRoutes } from './src/modules/user/user.routes.js';
import { productRoutes } from './src/modules/product/product.routes.js';
import { cartRoutes } from './src/modules/cart/cart.routes.js';
import { wishlistRoutes } from './src/modules/wishlist/wishlist.routes.js';
import { orderRoutes } from './src/modules/order/order.routes.js';

const app = express()

app.use(cors());
app.use(express.json());


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.use(userRoutes)
app.use(productRoutes)
app.use(cartRoutes)
app.use(wishlistRoutes)
app.use(orderRoutes)

const port = 3000;

dbConnection

app.listen(port,()=>{
    console.log("running",port)
})

