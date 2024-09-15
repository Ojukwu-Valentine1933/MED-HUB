const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const {
    GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_REFRESH_TOKEN, USER_EMAIL 
} = require("../config/dotEnv");
const Oauth2 = google.auth.OAuth2;

const myOauth2Client = new Oauth2(
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);


myOauth2Client.setCredentials({refresh_token: GOOGLE_OAUTH_REFRESH_TOKEN });

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: USER_EMAIL,
        clientId: GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
        refreshToken: GOOGLE_OAUTH_REFRESH_TOKEN,
        accessToken: myOauth2Client.getAccessToken()
    }
    });


module.exports = transport;