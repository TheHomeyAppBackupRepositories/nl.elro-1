'use strict';

const DriverDipswitch = require('../../lib/DriverDipswitch');
const ElroRFSignal = require('../../lib/ElroRFSignal');

module.exports = class extends DriverDipswitch {
  static SIGNAL = ElroRFSignal;
}
