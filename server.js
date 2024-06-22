const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'your-email@gmail.com', // replace with your email
        pass: 'your-password' // replace with your email password or app password
    }
});

app.post('/send-email', (req, res) => {
    const { name, phone } = req.body;

    const mailOptions = {
        from: 'your-email@gmail.com', // replace with your email
        to: 'repilovi@gmail.com',
        subject: 'Contact Form Submission',
        text: `Name: ${name}\nPhone: ${phone}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({ success: false, message: 'Failed to send email', error });
        }
        res.send({ success: true, message: 'Email sent successfully', info });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
