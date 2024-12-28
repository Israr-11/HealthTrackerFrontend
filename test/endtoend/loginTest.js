import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

describe('Login Functionality Test', function() {
    this.timeout(30000);
    let driver;
    let vars;

    beforeEach(async function() {
        const options = new chrome.Options();
        options.addArguments('--headless');
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');
        options.addArguments('--disable-gpu');
        options.addArguments('--window-size=1920,1080');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        vars = {};
    });

    afterEach(async function() {
        if (driver) {
            await driver.quit();
        }
    });

    it('Login Functionality Test', async function() {
        await driver.get("https://health-tracker-application.netlify.app/");

        await driver.wait(until.elementLocated(By.id("fullName")), 10000);

        const nameField = await driver.findElement(By.id("fullName"));
        await driver.wait(until.elementIsVisible(nameField), 5000);
        await nameField.clear();
        await nameField.sendKeys("Israr");

        const emailField = await driver.findElement(By.id("email"));
        await driver.wait(until.elementIsVisible(emailField), 5000);
        await emailField.clear();
        await emailField.sendKeys("israr@gmail.com");

        const submitButton = await driver.findElement(By.css(".btn"));
        await driver.wait(until.elementIsEnabled(submitButton), 5000);
        await submitButton.click();

        await driver.wait(
            until.urlContains("https://health-tracker-application.netlify.app/dashboard"),
            10000
        );
    });
});
