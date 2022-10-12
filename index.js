require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

// Connect Database
connectDB();

const app = express();

app.use(express.json());

const routes = require('./src/routes/routes');
const adminAuth = require('./src/admin/routes/auth');
const adminRoutes = require('./src/admin/routes/admin');
const bannerRoutes = require('./src/admin/routes/banner');
const subjectRoutes = require('./src/admin/routes/subject');
const studentRoutes = require('./src/admin/routes/student');

app.listen(3000,()=>{
    console.log(`Welcome Admin, Server Started at ${3000}`)
})

app.use("/api",routes)
app.use("/admin",adminAuth)
app.use("/admin",adminRoutes)
app.use("/admin",bannerRoutes)
app.use("/admin",subjectRoutes)
app.use("/admin",studentRoutes)