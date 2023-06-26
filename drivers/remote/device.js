'use strict';

const RFDeviceSamsung = require('../../lib/RFDeviceSamsung');

module.exports = class extends RFDeviceSamsung {

	static CAPABILITIES = {
		onoff: {
			true: 'POWER_ON',
			false: 'POWER_OFF',
		},
		volume_mute: 'MUTE_TOGGLE',
		volume_up: 'VOLUME_UP',
		volume_down: 'VOLUME_DOWN',
		channel_up: 'CHANNEL_UP',
		channel_down: 'CHANNEL_DOWN',
	}

	async sendCommand(command) {
		const signal = await this.driver.getRFSignal();
		await signal.cmd(String(command).toUpperCase());
	}

	async sendCommandChannel(number) {
		const numbers = String(number).split('');

		for (const number of numbers) {
			await this.sendCommand(`NUMBER_${number}`);
		}
		await this.sendCommand('ENTER');
	}

};
