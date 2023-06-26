'use strict';

const { RFDevice } = require('homey-rfdriver');

module.exports = class extends RFDevice {
  static CAPABILITIES = {
    onoff: ({ value, data }) => ({
      ...data,
      state: !!value,
      group: false,
    })
  };

  async onAdded() {
    if (this.hasCapability('onoff')) {
      await this.setCapabilityValue('onoff', false);
    }
  }

  async onCommandMatch(command) {
    if(command === undefined || command === null) {
      return false;
    }
    const { address, unit, channel } = this.getData();
    return address === command.address && unit === command.unit && channel === command.channel;
  }

  /**
   * Sets the capability when the device is triggered by remote for on off
   *
   * @param onoff
   * @returns {Promise<void>}
   */
  async onCommandFirst({ state }) {
    if(this.hasCapability('onoff')) {
      await this.setCapabilityValue('onoff', state);
    }
  }
};
