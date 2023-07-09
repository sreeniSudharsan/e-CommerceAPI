require('dotenv').config();
require('express-async-errors');

//Express
const express = require('express');
const app = express();

//additional middlewares and security packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

//Route Imports
const authRouter = require('./routes/authRoutes');
const reviewRouter = require('./routes/reviewRoutes')
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes')
const orderRouter = require('./routes/orderRoutes')
//Database
const connectDB = require('./db/connect');

//MiddleWare
const notFoundMiddleWare = require('./middleware/not-found');
const errorHandlerMiddleWare = require('./middleware/error-handler');


// Express Rate Limiter
app.use(
    rateLimiter({
      windowMs: 15 * 60 * 1000,
      max: 60,
    })
  );
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// additional security packages. 
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

// static file uploads
app.use(express.static('./public'));
app.use(fileUpload());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/reviews', reviewRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/orders', orderRouter)

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