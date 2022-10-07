require('dotenv').config();
const mongoString = process.env.DATABASE_URL

const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


const app = express();

app.use(express.json());

const routes = require('./src/routes/routes');
const adminRoutes = require('./src/admin/routes/admin');
const bannerRoutes = require('./src/admin/routes/banner');
const subjectRoutes = require('./src/admin/routes/subject');
const studentRoutes = require('./src/admin/routes/student');

// app.listen(3000, () => {
//     console.log(`Welcome Admin, Server Started at --> ${3000}`)
// })
// app.use('/api', routes) 

app.listen(3000,()=>{
    console.log(`Welcome Admin, Server Started at ${3000}`)
})

app.use("/api",routes)
app.use("/admin",adminRoutes)
app.use("/admin",bannerRoutes)
app.use("/admin",subjectRoutes)
app.use("/admin",studentRoutes)