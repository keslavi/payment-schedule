var utils = require('./utils');
var error = require('./error');

exports.CUMIPMT = function(rate, periods, value, start, end, type) {
    // Credits: algorithm inspired by Apache OpenOffice
    // Credits: Hannes Stiebitzhofer for the translations of function and variable names
    // Requires exports.FV() and exports.PMT() from exports.js [http://stoic.com/exports/]
  
    rate = utils.parseNumber(rate);
    periods = utils.parseNumber(periods);
    value = utils.parseNumber(value);
    if (utils.anyIsError(rate, periods, value)) {
      return error.value;
    }
  
    // Return error if either rate, periods, or value are lower than or equal to zero
    if (rate <= 0 || periods <= 0 || value <= 0) {
      return error.num;
    }
  
    // Return error if start < 1, end < 1, or start > end
    if (start < 1 || end < 1 || start > end) {
      return error.num;
    }
  
    // Return error if type is neither 0 nor 1
    if (type !== 0 && type !== 1) {
      return error.num;
    }
  
    // Compute cumulative interest
    var payment = exports.PMT(rate, periods, value, 0, type);
    var interest = 0;
  
    if (start === 1) {
      if (type === 0) {
        interest = -value;
        start++;
      }
    }
  
    for (var i = start; i <= end; i++) {
      if (type === 1) {
        interest += exports.FV(rate, i - 2, payment, value, 1) - payment;
      } else {
        interest += exports.FV(rate, i - 1, payment, value, 0);
      }
    }
    interest *= rate;
  
    // Return cumulative interest
    return interest;
  };
  
  exports.FV = function(rate, periods, payment, value, type) {
    // Credits: algorithm inspired by Apache OpenOffice
  
    value = value || 0;
    type = type || 0;
  
    rate = utils.parseNumber(rate);
    periods = utils.parseNumber(periods);
    payment = utils.parseNumber(payment);
    value = utils.parseNumber(value);
    type = utils.parseNumber(type);
    if (utils.anyIsError(rate, periods, payment, value, type)) {
      return error.value;
    }
  
    // Return future value
    var result;
    if (rate === 0) {
      result = value + payment * periods;
    } else {
      var term = Math.pow(1 + rate, periods);
      if (type === 1) {
        result = value * term + payment * (1 + rate) * (term - 1) / rate;
      } else {
        result = value * term + payment * (term - 1) / rate;
      }
    }
    return -result;
  };
  
  exports.PMT = function(rate, periods, present, future, type) {
    // Credits: algorithm inspired by Apache OpenOffice
  
    future = future || 0;
    type = type || 0;
  
    rate = utils.parseNumber(rate);
    periods = utils.parseNumber(periods);
    present = utils.parseNumber(present);
    future = utils.parseNumber(future);
    type = utils.parseNumber(type);
    if (utils.anyIsError(rate, periods, present, future, type)) {
      return error.value;
    }
  
    // Return payment
    var result;
    if (rate === 0) {
      result = (present + future) / periods;
    } else {
      var term = Math.pow(1 + rate, periods);
      if (type === 1) {
        result = (future * rate / (term - 1) + present * rate / (1 - 1 / term)) / (1 + rate);
      } else {
        result = future * rate / (term - 1) + present * rate / (1 - 1 / term);
      }
    }
    return -result;
  };