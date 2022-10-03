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
app.use("/admin",studentRoutes)