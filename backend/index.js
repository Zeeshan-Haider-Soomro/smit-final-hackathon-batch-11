// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const AuthRouter = require('./Routes/AuthRouter');
// const ProductRouter = require('./Routes/ProductRouter');
import express from 'express'
import bodyParser from 'express'
import cors from 'cors'
import dotenv from 'dotenv' 
import mongoose from 'mongoose';
import router from './Routes/AuthRouter.js';
// import ProductRouter from "./Routes/ProductRouter.js" 

const app = express();

// require('dotenv').config();
dotenv.config()
// require('./Models/db');
const PORT = process.env.PORT || 8080;
const mongo_url = process.env.MONGO_CONN;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', router);
// app.use('/products', ProductRouter);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

const connection = () => {
    mongoose.connect(mongo_url)
    .then(() => {
        console.log('MongoDB Connected...');
    }).catch((err) => {
        console.log('MongoDB Connection Error: ', err);
    })
}
connection();