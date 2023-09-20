import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from './config/connectDB';
import cors from 'cors'

require("dotenv").config();

let app = express();
app.use(cors({origin:true}))

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(bodyParser.json({limit:'500mb'}));
app.use(bodyParser.urlencoded({limit:'500mb'}));
// config view
configViewEngine(app)
// init web 
initWebRoutes(app)

connectDB()

let port = process.env.PORT || 6969;
app.listen(port,()=>{
    console.log("check "+port)
})