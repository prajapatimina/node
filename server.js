const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./database/mongoose');

const port = process.env.port || 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const productRoutes = require('./api/routes/products.route')
const orderRoutes = require('./api/routes/orders.route')
const userRoutes = require('./api/routes/user.route')

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use('/user',userRoutes);


//handle error
app.use((req,res,next)=>{
    const error = new Error('route not found');
    error.status = 404;
    next(error);
})

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})