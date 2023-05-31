const atob = require('atob');
const { convert } = require('html-to-text');

const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const gmail = google.gmail('v1');
import database from '../../data/database';
import formatedMail from '../../bussiness/formatedMail';
import { regenerateAccessToken } from '../../bussiness/regenerateAccessToken';
import config from '../../data/credential/gmailCredential'
import { matchCardAndAccountNumber } from '../../bussiness/matchCardAccount';
import { regenerateAccessTokenSingleUser } from '../../bussiness/regenerateAccessTokenSingleUser';
const CLIENT_ID = config.web.client_secret
const CLIENT_SECRET = config.web.client_id
const REDIRECT_URI = config.web.redirect_uris;

export async function readEmails() {
  try {

    const allUsersTokens = await database.UserTokens.getAll();
    const TrnAccountsDetails = await database.TrnAccounts.getAll();
    const bankEmails = await database.MstBankEmails.getAll(); 

    for(let i=0;i<allUsersTokens.length;i++ ){
      const userDetails=allUsersTokens[i]
      const userTrnAccountsDetails = TrnAccountsDetails.find(accountDetails => accountDetails.UserId === userDetails.UserId)
      const userBankDetail = bankEmails.find(bankEmail => bankEmail.MstBankId === userTrnAccountsDetails.MstBankId)

    const query = "from:" + userBankDetail.EmailId + " newer_than:1d"
    // const query = "from:" + "artwinjit@gmail.com" + " newer_than:1d"


      const oAuth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI[0]);
      
      oAuth2Client.setCredentials({ 
        refresh_token: userDetails.RefreshToken ,
        access_token: userDetails.AccessToken,
        scope: userDetails.Scope,
        token_type: userDetails.TokenType
      });

      const req = {
      auth: oAuth2Client,
      userId: userDetails.EmailId,
      q: query,
      // maxResults: 2,
      };

      const reqBody = await database.LogS1.createNew({status:'requestBody',requestBody:req, UserId:userDetails.UserId, EmailId:userDetails.EmailId, BankEmail:userBankDetail.EmailId})

      
   let res
    try{
      res = await gmail.users.messages.list({
      auth: oAuth2Client,
      userId: userDetails.EmailId,
      q: query,
      // maxResults: 2,
    })
  } catch (err) {
    const redirect = await regenerateAccessTokenSingleUser(userDetails)
    i--;
    continue;
  }

    const messages = res.data.messages;
    if (messages && messages.length) {

      messages.forEach(async (message) => {
        const email = await gmail.users.messages.get({
          auth: oAuth2Client,
          userId: 'me',
          id: message.id,
          format: "full"
        });
            //============================================
            if (email) {
                    if (email.data.payload) {
                        let time = email.data.payload.headers.find(date => date.name === 'Date');
                        if (email.data.payload.parts) {
                            if (email.data.payload.parts[0].body.size != 0) {
                                var convertedString = atob(email.data.payload.parts[0].body.data);
                                var finalString = convertedString;

                                var htmlRegex = new RegExp(/<[a-z]+\d?(\s+[\w-]+=("[^"]*"|'[^']*'))*\s*\/?>|&#?\w+;/i);
                                if (htmlRegex.test(convertedString)) {
                                    finalString = convert(convertedString);
                                }

                                try{
                                const reqResp = await database.LogS1.updateExisting({id:reqBody.id},{status:'requestResponseBody',responseBody:finalString, UserId:userDetails.UserId, EmailId:userDetails.EmailId, BankEmail:userBankDetail.EmailId})
                                } catch (err) {
                                console.log('🚀 ^~^ - messages.forEach - err:', err)
                                }

                                const formatedMailNew = formatedMail(finalString)
                                const cleanedParagraph = formatedMailNew.replace(/\s+/g, ' ').trim();
                                const available = matchCardAndAccountNumber(cleanedParagraph, userDetails.UserId)
                                try{
                                if(available) await database.Transactions.createNew({MailString:cleanedParagraph, IsSend:false, UserId:userDetails.UserId, MstBankId:userTrnAccountsDetails.MstBankId})
                                }catch(err){
                                if(err && err.errors && err.errors[0] && err.errors[0].message) await database.LogS1.createNew({status:'Exception',responseBody:err.errors[0].message, userId:userDetails.UserId, EmailId:userDetails.EmailId})
                                }

                            }
                        } else {
                            var convertedString = atob(email.data.payload.body.data);
                            var finalString = convertedString;
                            var htmlRegex = new RegExp(/<[a-z]+\d?(\s+[\w-]+=("[^"]*"|'[^']*'))*\s*\/?>|&#?\w+;/i);
                            if (htmlRegex.test(convertedString)) {
                                finalString = convert(convertedString);
                            }
                            const formatedMailNew = formatedMail(finalString)
                            const cleanedParagraph = formatedMailNew.replace(/\s+/g, ' ').trim();
                            const available = matchCardAndAccountNumber(cleanedParagraph, userDetails.UserId)

                            try{
                            if(available) await database.Transactions.createNew({MailString:cleanedParagraph, IsSend:false, UserId:userDetails.UserId, MstBankId:userTrnAccountsDetails.MstBankId})
                            } catch (err){
                              console.log('err===>>>');
                              if(err && err.errors && err.errors[0] && err.errors[0].message) await database.LogS1.createNew({status:'Exception',responseBody:err.errors[0].message, userId:userDetails.UserId, EmailId:userDetails.EmailId})

                            }

                            // resolve({ date: email.data.payload.headers[22].value, mailString: finalString });
                        }

                    } else {
                        if (email.data.payload) {
                            let time = email.data.payload.headers.find(date => date.name === 'Date');
                            const finalString = convert(atob(email.data.payload.body.data), { wordwrap: 130 });

                            const formatedMailNew = formatedMail(finalString)
                            const cleanedParagraph = formatedMailNew.replace(/\s+/g, ' ').trim();
                            try{
                            const available = matchCardAndAccountNumber(cleanedParagraph, userDetails.UserId)
                            if(available) await database.Transactions.createNew({MailString:cleanedParagraph, IsSend:false, UserId:userDetails.UserId, MstBankId:userTrnAccountsDetails.MstBankId})
                            } catch (err) {
                            console.log('🚀 ^~^ - messages.forEach - err:')
                            if(err && err.errors && err.errors[0] && err.errors[0].message) await database.LogS1.createNew({status:'Exception',responseBody:err.errors[0].message, userId:userDetails.UserId, EmailId:userDetails.EmailId})
                            }
                        }
                    }
                }
            //===========================================
      })
    }
    }
  } catch (err) {
  console.log('🚀 ^~^ - readEmails - err:')
  if(err && err.response && err.response.data) await database.LogS1.createNew({status:'Exception',responseBody:err.response.data, userId:1, EmailId:''})
  }
}

