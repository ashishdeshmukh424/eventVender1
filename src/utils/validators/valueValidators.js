import { errorHandlers } from '../errors';

const hasValue = (property) => {
  if (property === null || property === undefined) {
    return false;
  }

  return !(Number.isNaN(property) && property.length === 0);
};

const mustHaveValue = (property, error, propertyName = '') => {
  if (!hasValue(property)) {
    errorHandlers.throwException(`Validate ${propertyName ? JSON.stringify(propertyName) : 'UNSPECIFIED VARIABLE'} has a value.`, error, 'INTERNAL VALIDATION ERROR',
      'Variable has no value, when one is expected.');
  }

  return property;
};

const mustHaveValueGreaterThanZero = (property, error, propertyName = '') => {
  if (!hasValue(property)) {
    errorHandlers.throwException(`Validate ${propertyName ? JSON.stringify(propertyName) : 'UNSPECIFIED VARIABLE'} has a value.`, error, 'INTERNAL VALIDATION ERROR',
      'Variable has no value, when one is expected.');
  }

  const number = Number(property);

  if (Number.isNaN(number)) {
    errorHandlers.throwException(`Validate ${propertyName ? JSON.stringify(propertyName) : 'UNSPECIFIED VARIABLE'} is a number.`, error, 'INTERNAL VALIDATION ERROR',
      'Variable failed to cast to a number.');
  }

  if (number <= 0) {
    errorHandlers.throwException(`Validate ${propertyName ? JSON.stringify(propertyName) : 'UNSPECIFIED VARIABLE'} is greater than 0.`, error, 'INTERNAL VALIDATION ERROR',
      'Variable is not greater than 0.');
  }

  return number;
};

const checkValue = (object, value) => (
  Object.values(object).includes(value)
);

const validateIPaddress = (ip) => {
  return (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip));
};

export default {
  checkValue,
  hasValue,
  mustHaveValue,
  mustHaveValueGreaterThanZero,
  validateIPaddress,
};