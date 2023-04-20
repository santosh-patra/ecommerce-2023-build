import express  from 'express';
import colors from 'colors';
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoute.js'
import cors from 'cors';
import path from 'path'
import {fileURLToPath} from 'url'
// rest objects
const app = express();
// config env
dotenv.config()

// db config
connectDB();

// es module fix
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// PORT
const PORT = process.env.PORT || 8080;

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors())
app.use(express.static(path.join(__dirname,'./client/build')))
// routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoutes)


app.use("*",function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`.bgCyan.white);
})