module.exports = function capitalize(text) {
    return String(text).charAt(0).toUpperCase() + String(text).slice(1);
};
