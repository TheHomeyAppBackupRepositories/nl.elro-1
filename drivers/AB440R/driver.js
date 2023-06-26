'use strict';

const Driver = require('../../lib/Driver');

module.exports = class extends Driver {
  async onRFInit() {
    await super.onRFInit();

    this.homey.flow
      .getDeviceTriggerCard('AB440R:received')
      .registerRunListener(async (args, state) => {
        return (args.state === '1') === state.state
          && args.unit === state.unit;
      })
  }
};
