const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = '960287838973-dr8sfe24pst94gpm39jpgpsbcsdmfj92.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04WXts8R3a0OICgYIARAAGAQSNgF-L9IriGb-5U7DtS__p4lCRMWh7IuyPGWT2JrOoB3VDsQ8XZY-yQPCJoQOJTb3cBHHz6jeFw'

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