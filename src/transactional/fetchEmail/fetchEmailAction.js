import database from '../../data/database';
import { valueValidators } from '../../utils/validators';
import { ErrorResponse, FailureResponse, SuccessResponse, getResponse } from '../../utils/responses';
import { errorHandlers, errors } from '../../utils/errors';
import modelActions from '../modelActions';
import { encrypt } from '../../utils/crypto/encrypt';

const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const gmail = google.gmail('v1');

const USERS = 'Users';
const USERGROUPS = 'UserGroups';

const fetchEmailAction = {
  getAllEmails: async (query) => {
    
  },
}

export default fetchEmailAction;
