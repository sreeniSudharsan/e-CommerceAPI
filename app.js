require('dotenv').config();
require('express-async-errors');

//Express
const express = require('express');
const app = express();

//
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload')

//Route Imports
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes')
//Database
const connectDB = require('./db/connect');

//MiddleWare
const notFoundMiddleWare = require('./middleware/not-found');
const errorHandlerMiddleWare = require('./middleware/error-handler');

app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static('./public/uploads'));
app.use(fileUpload)

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/user', userRouter)
app.use('/api/v1/product', productRouter)
app.get('/api/v1/auth', (req, res)=> {
    // console.log(req.cookies);
    console.log(req.signedCookies)
    res.send('<h1>e-Commerce API</h1><a href>Docs</a>')
});



//Error Handler
app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleWare);

/*Server Port for localhost deployment: Change the PORT by accessing the PORT variable 
               in the the dot env file*/
const PORT = process.env.PORT || 5000;
const start = async(req, res)=>{
try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, console.log(`Server is listening on ${PORT}...`))
    } 
catch(error){
    console.log(error);
    }
}

start();