const utils = require("./utils/utils");
const downloadRepo = require("./utils/downloadRepo");
const Constants = require("./utils/constants");
const constants = Constants.constants;
const webdriver = require('selenium-webdriver'),
      chrome = require('selenium-webdriver/chrome');
require("chromedriver");

const timeout = seconds => timeoutMs(seconds * 1000)


const METAMASK_EXTENSION_URL =
  process.env.METAMASK_EXTENSION_URL || 'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/popup.html';

main()

async function main() {
	let spec
	try {
	 spec = await utils.getSpec('sokol');
	} catch (e) {
		return console.log(e.message)
	}
	console.log(spec);

	await downloadRepo(constants.contractsRepoName);
	await downloadRepo(constants.scriptsRepoName);

	return;

	let options = new chrome.Options();
    options.addExtensions('./MetaMask_v3.14.1.crx');
	options.addArguments('start-maximized');
    options.addArguments('disable-popup-blocking');
	let driver = new webdriver.Builder()
	.withCapabilities(options.toCapabilities())
	.build();


	return;


	// Open MetaMask popup in a new tab
	driver.navigate().to(METAMASK_EXTENSION_URL);

	// Accept terms
	await timeout(3);
	const acceptButton = await metamask.$('button');
	acceptButton.click();
	await timeout(1);
	const termsOfUse = await metamask.$('div.markdown');
	await metamask.evaluate(termsOfUse => {
	termsOfUse.scrollTo(0, termsOfUse.scrollHeight);
	}, termsOfUse);
	const acceptButton2 = await metamask.$('button');
	acceptButton2.click();

	// Select localhost
	await timeout(1);
	(await metamask.$('div.network-indicator')).click();
	await timeout(1);
	const localhostIndex = await metamask.$$eval('li.dropdown-menu-item', lis => {
	return lis.findIndex(li => li.innerHTML.includes('8545'));
	});
	const localhost = await metamask.$$('li.dropdown-menu-item').then(xs => xs[localhostIndex]);
	localhost.click();
	await metamask.$('p.pointer').then(x => x.click());

	// Insert seed phrase and password
	await metamask
	.$('textarea')
	.then(txt => txt.type('myth like bonus scare over problem client lizard pioneer submit female collect'));
	await metamask.$('#password-box').then(p => p.type('password'));
	await metamask.$('#password-box-confirm').then(p => p.type('password'));

	await metamask
	.$$('button')
	.then(xs => xs[1])
	.then(x => x.click());
}
