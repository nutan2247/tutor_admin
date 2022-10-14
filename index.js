require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
//const connectDB = require('./config/db');

// Connect Database
//connectDB();

const Connection = () =>{
    const URL = 'mongodb+srv://nutan2247:nutan2247@cluster0.l0a7scs.mongodb.net/tutor_admin?retryWrites=true&w=majority'

    mongoose.connect(URL)

    mongoose.connection.on('connected', () => {
        console.log('DATABASE CONNECTED SUCCESSFULLY')
    })

    mongoose.connection.on('disconnected', () => {
        console.log('DATABASE DISCONNECTED')
    })

}

Connection()

const app = express();

app.use(express.json());

const routes = require('./src/routes/routes');
const adminAuth = require('./src/admin/routes/auth');
const adminRoutes = require('./src/admin/routes/admin');
const bannerRoutes = require('./src/admin/routes/banner');
const subjectRoutes = require('./src/admin/routes/subject');
const studentRoutes = require('./src/admin/routes/student');
const router = require('./src/users/user');
const { connection } = require('mongoose');

app.listen(3000,()=>{
    console.log(`Welcome Admin, Server Started at ${3000}`)
})


app.use("/api",router)
app.use("/api",routes)
app.use("/admin",adminAuth)
app.use("/admin",adminRoutes)
app.use("/admin",bannerRoutes)
app.use("/admin",subjectRoutes)
app.use("/admin",studentRoutes)