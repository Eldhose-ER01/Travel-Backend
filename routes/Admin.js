const express = require('express');
const adminroutes = express.Router();
const admincontroller = require('../controllers/admin');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, '../public/Images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Avoid filename conflicts
    }
});

// Multer instance
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

// Define routes
adminroutes.post('/login', admincontroller.adminLogin);
adminroutes.get('/userlist', admincontroller.findUser);
adminroutes.post('/blockorunblock', admincontroller.blockORUnblock);
adminroutes.post('/addstate-district', upload.single("file"), admincontroller.addStateAndDistrict);
adminroutes.get('/findstate', admincontroller.findstateAndDistrict);
adminroutes.post('/blockorunblockstates', admincontroller.StateBlockOrunBlock);
adminroutes.post('/deletestates', admincontroller.StateAndDistrictDelete);
adminroutes.post('/editstates', upload.single("file"), admincontroller.editStateAndDistrict);
adminroutes.post('/adddestinations', upload.array("selectedImages", 3), admincontroller.adddestinations);
adminroutes.get('/dstination',admincontroller.Finddestinations);
adminroutes.get('/finddistrict',admincontroller.finddistrict)

module.exports = adminroutes;
