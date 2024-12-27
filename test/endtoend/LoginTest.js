import { Builder, By, Key, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

describe('Login Feature Test', function() {
    this.timeout(30000);
    let driver;
    let vars;

    beforeEach(async function() {
        // SETUP CHROME OPTIONS
        const options = new chrome.Options();
        options.addArguments('--headless');
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');
        options.addArguments('--disable-gpu');
        options.addArguments('--window-size=1920,1080');

        // INITIALIZE WEB DRIVER
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        vars = {};
    });

    afterEach(async function() {
        // CLEANUP WEB DRIVER
        if (driver) {
            await driver.quit();
        }
    });

    it('Login Feature Test', async function() {
        // NAVIGATE TO APPLICATION
        await driver.get("https://health-tracker-application.netlify.app/");

        // WAIT FOR LOGIN FORM
        await driver.wait(until.elementLocated(By.id("fullName")), 10000);

        // FILL NAME FIELD
        const nameField = await driver.findElement(By.id("fullName"));
        await driver.wait(until.elementIsVisible(nameField), 5000);
        await nameField.clear();
        await nameField.sendKeys("Israr");

        // FILL EMAIL FIELD
        const emailField = await driver.findElement(By.id("email"));
        await driver.wait(until.elementIsVisible(emailField), 5000);
        await emailField.clear();
        await emailField.sendKeys("israr@gmail.com");

        // SUBMIT LOGIN FORM
        const submitButton = await driver.findElement(By.css(".btn"));
        await driver.wait(until.elementIsEnabled(submitButton), 5000);
        await submitButton.click();

        // VERIFY SUCCESSFUL LOGIN
        await driver.wait(
            until.urlContains("https://health-tracker-application.netlify.app/dashboard"),
            10000
        );
    });
});
