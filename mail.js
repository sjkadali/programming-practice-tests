const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

async function sendUserMail(email, subject, mailbody) { 
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'fullstkwebdev@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });
    try {
        const mailOptions = {
            from: 'ProgrammingPracticeTests <fullstkwebdev@gmail.com>',
            to: email ,
            subject: subject,
            html: mailbody
        };
        // send email
        const sendMail =  await transport.sendMail(mailOptions);
           if (sendMail) return 'Email with change password link has been sent...';
            
    } catch(err) {'Unsuccesful!', err}
}

module.exports = {sendUserMail}