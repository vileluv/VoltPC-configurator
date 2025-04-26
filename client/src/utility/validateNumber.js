const MAX_LIMIT = 100;
function validateNumber(num) {
    const validNum = parseInt(num, 10);
    if (isNaN(validNum) || validNum <= 0) {
        return 1;
    }
    if (validNum > MAX_LIMIT) {
        return MAX_LIMIT;
    }
    return validNum;
}
module.exports = validateNumber;
