const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const uploadDir = path.join(__dirname, 'public/Images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
app.use(express.static(path.join(__dirname, '/public')));

const userRoutes = require('./routes/User');
const adminRoutes = require('./routes/Admin');

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));

mongoose.connect(process.env.DATABASE).then(() => {
    console.log('DB connected');
});

app.use('/', userRoutes);
app.use('/admin', adminRoutes);

const PORT = 3001;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
