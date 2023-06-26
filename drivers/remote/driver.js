'use strict';

const RFDriverSamsung = require('../../lib/RFDriverSamsung');

module.exports = class extends RFDriverSamsung {

  async onRFInit() {
    await super.onRFInit();

    this.homey.flow.getActionCard('remote:send_cmd')
      .registerRunListener(async ({ device, cmd }) => {
        await device.sendCommand(cmd.cmd);
      })
      .getArgument('cmd')
      .registerAutocompleteListener(async query => {
        const signal = await this.getRFSignal();
        const {
          ID,
          FREQUENCY,
        } = signal.constructor;

        const commands = this.homey.app.manifest.signals[FREQUENCY][ID].cmds || {};
        return Object.keys(commands).map(command => ({
          title: this.homey.__(`commands.${command}`),
          cmd: command,
        })).filter(({ title }) => {
          if (!title) return false;
          return title.toLowerCase().includes(query.toLowerCase());
        })
      });

    this.homey.flow.getActionCard('remote:send_cmd_number')
      .registerRunListener(async ({ device, number }) => {
        await device.sendCommandChannel(number);
      });
  }

};
