
const { RFDriver } = require('homey-rfdriver');
const ElroRFSignal = require('./ElroRFSignal');

module.exports = class extends RFDriver {
  static SIGNAL = ElroRFSignal;
};
