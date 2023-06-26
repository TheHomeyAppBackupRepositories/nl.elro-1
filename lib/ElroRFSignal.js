'use strict';

const { RFSignal, RFUtil, RFError } = require('homey-rfdriver');

module.exports = class extends RFSignal {
  static FREQUENCY = '433';
  static ID = 'elro';

  static commandToDeviceData(command) {
    return {
      address: command.address,
      unit: command.unit
    };
  }

  static commandToPayload({
                            address,
                            state,
                            unit,
                          }) {
    if (typeof address !== 'string' || address.length !== 5) {
      throw new RFError(`Invalid Address: ${address}`);
    }

    if (typeof state !== 'boolean') {
      throw new RFError(`Invalid State: ${state}`);
    }

    if (typeof unit !== 'string' || unit.length !== 5) {
      throw new RFError(`Invalid Unit: ${unit}`);
    }

    return [].concat(
      RFUtil.bitStringToBitArray(address),
      RFUtil.bitStringToBitArray(unit),
      state ? 1 : 0,
      state ? 0 : 1,
    );
  }

  static payloadToCommand(payload) {
    if (payload.length === 12 && (payload[10] !== payload[11])) {
      const address = String(payload.slice(0, 5).join(''));
      const unit = String(payload.slice(5, 10).join(''));
      const state = Boolean(payload.slice(10, 11)[0]);
      const id =  `${address}:${unit}`

      return {
        address,
        state,
        unit,
        id
      };
    }
    return null;
  }

  static createPairCommand() {
    const data = {
      address: RFUtil.generateRandomBitString(5),
      unit: RFUtil.generateRandomBitString(5),
      state: true,
    };

    data.id = `${data.address}:${data.unit}`;
    return data;
  }

  /**
   * Converts the dipswitches to a valid address and unit
   *
   * @param dipswitches
   * @returns {{unit: *, address: *, state: boolean}}
   */
  static createDipswitchCommand(dipswitches) {
    const data = {
      address: dipswitches.slice(0, 5).map(Number).join(''),
      // the 5th element of the dipswitches array contains another array with the unit dipswitches.
      unit: dipswitches[5].slice(0, 5).map(Number).join(''),
      state: true,
    };
    data.id = `${data.address}:${data.unit}`;

    return data;
  }
};
