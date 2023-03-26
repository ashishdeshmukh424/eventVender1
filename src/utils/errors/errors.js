const errors = {
  ARITHMETIC_OPERATION_ERROR: {
    code: 'EART500',
    message: 'An arithmetic operation failed.',
  },
  BAD_REQUEST: {
    code: 'E400',
    message: 'Validation against the request received was found to be invalid.',
  },
  // #region APP
  APP_PROPERTIES_ERROR: {
    code: 'EAPP400',
    message: 'An app property is invalid.',
    APP_ID_INVALID: {
      code: 'EAPPIDX400',
      message: 'App ID is invalid.',
    },
    APP_DEVICEID_INVALID: {
      code: 'EAPPDVC400',
      message: 'App device id is invalid.',
    },
    APP_TYPE_INVALID: {
      code: 'EAPPTYP400',
      message: 'App type is invalid.',
    },
    APP_STOREID_INVALID: {
      code: 'EAPPSTR400',
      message: 'App store ID is invalid.',
    },
    APP_VERSION_INVALID: {
      code: 'EAPPVRS400',
      message: 'App version is invalid.',
    },
  },
  APP_VERSION_SEMVER_INVALID: {
    code: 'EAPPIDX400',
    message: 'App version must be semver.',
  },
  APP_TYPE_NOT_FOUND: {
    code: 'EAPPTYP404',
    message: 'App type not found.',
  },


  // #endregion
  // #region CUSTOMER
  CUSTOMER_NOT_FOUND: {
    code: 'ECST404',
    message: 'Customer not found.',
  },
  // #endregion
  DATABASE_ACTION_NOT_APPLIED: {
    code: 'EDBA406',
    message: 'The database action was not applied. Possible reasons include trying to update a record which has been deleted.',
  },
  DATABASE_ERROR: {
    code: 'EDB500',
    message: 'A database action failed to execute.',
  },
  INVALID_PERMISSIONS: {
    code: 'EPRM401',
    message: 'User does not have permissions to perform this action.',
  },
  INVALID_REQUEST: {
    code: 'ERQS400',
    message: 'The request received is not valid to complete the action.',
  },
  NOT_IMPLEMENTED: {
    code: 'ENTIMP',
    message: 'Funcitonality has not yet been implemented for this action.',
  },

  USER_NOT_FOUND: {
    code: 'ENTIMP12',
    message: 'Login Details Invalid',
  },

  INCORRECT_PASSWORD: {
    code: 'INCPAS12',
    message: 'Password Invalid',
  },




  REQUEST_HEADER_MISSING: {
    code: 400,
    message: 'auth token is missing.',
  },
  JWT_INCORRECT_TOKEN: {
    code: 401,
    message: 'incorrect token.',
  },
  JWT_REFRESH_TOKEN_MISSING: {
    code: 400,
    message: 'refresh token is missing.',
  },
  JWT_REFRESH_TOKEN_EXPIRED: {
    code: 401,
    message: 'refresh token is expired.',
  },

  // #endregion
};

export default errors;
