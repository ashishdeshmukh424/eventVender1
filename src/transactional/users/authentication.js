import passwordHash from 'password-hash';

import { errors } from '../../utils/errors';
import { valueValidators } from '../../utils/validators';

class Authentication {
  constructor(user, password, checkPassword = true) {
    valueValidators.mustHaveValue(user, errors.USER_PROPERTIES_ERROR);
    valueValidators.mustHaveValue(password, errors.USER_PROPERTIES_ERROR);

    this.authenticated = checkPassword ? passwordHash.verify(password, user.password) : true;
    this.id = valueValidators.mustHaveValue(user.id, errors.USER_PROPERTIES_ERROR.USER_ID_INVALID);
    this.uuid = valueValidators.mustHaveValue(user.uuid, errors.USER_PROPERTIES_ERROR.USER_UUID_INVALID);
    this.firstName = user.firstName;
    this.email = user.email;
    this.groupId = user.groupId;
  }
}

export default Authentication;
