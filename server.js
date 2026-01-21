require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.')); // Serve static files from current directory


// Email Configuration
// IMPORTANT: You must replace 'YOUR_EMAIL_PASSWORD' with your actual App Password.
// For Gmail: Go to My Account > Security > 2-Step Verification > App Passwords
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : undefined
    }
});

// API Endpoint to send email (Simplified for now)
app.post('/send-email', (req, res) => {
    const { name, mobile, email, members } = req.body;
    console.log('New Trip Enquiry Received:', { name, mobile, email, members });

    // Returning success without actually sending email as part of "clearing backend process"
    res.status(200).send('Enquiry received successfully');
});

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app;
