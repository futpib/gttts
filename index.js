
const {Writable} = require('stream');

const puppeteer = require('puppeteer');
const findChrome = require('chrome-finder');

const chromeExecutablePath = findChrome();

class GoogleTranslateTTS {
	constructor() {
		this._browser = puppeteer.launch({
			executablePath: chromeExecutablePath
		});

		this._task = this._browser.then(async browser => {
			const page = await browser.newPage();
			await page.goto('https://translate.google.com/');

			return page;
		});
	}

	_then(f) {
		this._task = this._task.then(async page => {
			await f(page);
			return page;
		});
		return this._task;
	}

	async say(text) {
		await this._then(async page => {
			await page.focus('#source');

			await page.keyboard.down('Control');
			await page.press('a');
			await page.keyboard.up('Control');
			await page.press('Backspace');

			await page.type(text);

			await page.waitFor(1000);
			await page.waitFor('#gt-src-listen', {
				visible: true
			});

			await page.click('#gt-src-listen');
			await page.waitFor(1000);

			await page.waitFor('#gt-src-listen[aria-pressed="false"]', {
				visible: true
			});
		});
	}

	async finish() {
		await this._browser.then(browser => browser.close());
	}
}

class TTSStream extends Writable {
	constructor(options) {
		super(options);

		this._tts = new GoogleTranslateTTS();
		this.on('finish', () => this._tts.finish());
	}

	_write(chunk, encoding, callback) {
		this._tts.say(chunk.toString()).then(() => callback());
	}
}

module.exports = {
	TTSStream
};
