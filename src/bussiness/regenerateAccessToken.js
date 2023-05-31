const { google } = require('googleapis');
const fs = require('fs');
const axios = require('axios');
import database from '../data/database';
export async function regenerateAccessToken(refreshToken) {
try {
// const clientId = 'YOUR_CLIENT_ID';
// const clientSecret = 'YOUR_CLIENT_SECRET';
  const allUsersTokens = await database.UserTokens.getAll();

const clientId = '956971406728-6kib7kl6itqak5c0mtue88ss6j1cifqd.apps.googleusercontent.com';
const clientSecret = '956971406728-6kib7kl6itqak5c0mtue88ss6j1cifqd';
const temp = '1//0gnCO0nn5VBE8CgYIARAAGBASNwF-L9IrB8leW2HsErNd-WOG0JYcd6e9RkLR9vz3YYbE1fFdYA_6NKc7_5GpHdqKHxAcIeuvf00'
const refreshTokenEndpoint = 'https://www.googleapis.com/oauth2/v4/token';


let accessToken

  for (let i = 0; i < allUsersTokens.length; i++) {
    const singleUserToken = allUsersTokens[i];
    const requestBody = {
        client_id: clientId,
        refresh_token: singleUserToken.RefreshToken,
        grant_type: 'refresh_token',
        };

 const response = await axios.post(refreshTokenEndpoint, requestBody);


  accessToken = response.data.access_token;
 const updateUserAccessToken = await database.UserTokens.updateExisting({UserId:singleUserToken.UserId, EmailId:singleUserToken.EmailId},{AccessToken:accessToken});

 const expiresIn = response.data.expires_in;
    
  }

 } catch (error) {
console.error('Error regenerating access token:', error.message); }
}
