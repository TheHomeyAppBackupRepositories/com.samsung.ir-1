'use strict';

const { RFDriver } = require('homey-rfdriver');
const RFSignalSamsung = require('./RFSignalSamsung');

module.exports = class extends RFDriver {

  static SIGNAL = RFSignalSamsung;

};
