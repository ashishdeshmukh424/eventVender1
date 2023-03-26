import _ from 'lodash';

export const format3DigitNumber = (number) => {
  const numberOfDigits = number.toString().length;

  if (numberOfDigits === 1) {
    return `00${number}`;
  } else if (number === 2) {
    return `0${number}`;
  }
  return number;
};

export const parseNumber = (value = '') => {
  if (_.isEmpty(value)) return 0;
  return Number(value);
};