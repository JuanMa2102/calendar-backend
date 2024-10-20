const { isValid, getTime } = require('date-fns');
 
const isDate = (dateValue) => {
    if (!dateValue) return false;
 
    const getMiliseconds = getTime(dateValue);
 
    const date = isValid(getMiliseconds);
 
    return date;
};
 
module.exports = { isDate };