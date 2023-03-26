import moment from 'moment';

moment.defaultFormat = 'YYYY-MM-DD HH:mm:ss';
moment.tz.setDefault('Africa/Johannesburg');

export default moment;