const { google } = require('googleapis');
const fs = require('fs');
const axios = require('axios');
import database from '../data/database';
export async function regenerateAccessTokenSingleUser(singleUserToken) {
try {
const clientId = '956971406728-6kib7kl6itqak5c0mtue88ss6j1cifqd.apps.googleusercontent.com';
const clientSecret = '956971406728-6kib7kl6itqak5c0mtue88ss6j1cifqd';
const refreshTokenEndpoint = 'https://www.googleapis.com/oauth2/v4/token';

    console.log('🚀 ^~^ - regenerateAccessToken - singleUserToken:', singleUserToken.EmailId, singleUserToken.UserId)
    const requestBody = {
        client_id: clientId,
        refresh_token: singleUserToken.RefreshToken,
        grant_type: 'refresh_token',
        };

 const response = await axios.post(refreshTokenEndpoint, requestBody);


 let accessToken = response.data.access_token;
 const updateUserAccessToken = await database.UserTokens.updateExisting({UserId:singleUserToken.UserId, EmailId:singleUserToken.EmailId},{AccessToken:accessToken});

 const expiresIn = response.data.expires_in;

 } catch (error) {
console.error('Error regenerating access token:', error.message); }
}
