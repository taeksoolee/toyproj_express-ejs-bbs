const dateFns = require('date-fns');

function init() {
  String.prototype.toFirstUpperCase = function() {
    const firstChar = this.slice(0, 1).toUpperCase();
    const exceptedFirstChar = this.slice(1).toLowerCase();

    return firstChar + exceptedFirstChar;
  }

  Date.prototype.toDateString = function() {
    return dateFns.format(this, 'yyyy-MM-dd');
  }
}

module.exports = {
  init,
}