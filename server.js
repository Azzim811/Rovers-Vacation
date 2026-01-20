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

// API Endpoint to send email
app.post('/send-email', (req, res) => {
    const { name, mobile, email, members } = req.body;

    const mailOptions = {
        from: '"Rovers Vacations" <azzim811@gmail.com>',
        to: 'azzim811@gmail.com',
        subject: `⚡ New Booking Lead: ${name}`,
        html: `
            <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
                <div style="background-color: #0D78E7; padding: 30px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">Rovers Vacations</h1>
                    <p style="color: #e0f2fe; margin: 5px 0 0; font-size: 14px;">New Trip Enquiry Received</p>
                    <img src="assets/images/logo22.png" alt="Rovers Vacation Logo">
                </div>
                <div style="padding: 40px 30px;">
                    <p style="font-size: 16px; color: #334155; margin-bottom: 25px;">Hello Admin,</p>
                    <p style="font-size: 15px; color: #475569; line-height: 1.6; margin-bottom: 30px;">
                        A new traveler has just expressed interest in planning a trip. Here are the details:
                    </p>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 12px 15px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 500; width: 40%;">Traveler Name</td>
                            <td style="padding: 12px 15px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 600;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 15px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 500;">Mobile Number</td>
                            <td style="padding: 12px 15px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 600;">${mobile}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 15px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 500;">Email Address</td>
                            <td style="padding: 12px 15px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 600;">${email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 15px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 500;">Travel Group Size</td>
                            <td style="padding: 12px 15px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 600;">${members} Members</td>
                        </tr>
                    </table>
                    <div style="margin-top: 40px; text-align: center;">
                        <a href="mailto:${email}" style="background-color: #0D78E7; color: #ffffff; padding: 14px 25px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">Reply to Customer</a>
                    </div>
                </div>
                <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #f1f5f9;">
                    <p style="font-size: 12px; color: #94a3b8; margin: 0;">&copy; 2026 Rovers Vacations | Travel Far Enough</p>
                </div>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
