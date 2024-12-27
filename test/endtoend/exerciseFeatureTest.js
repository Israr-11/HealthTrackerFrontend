import { Builder, By, Key, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

describe('Exercise Feature Test', function() {
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

    it('Exercise Feature Test', async function() {
        // NAVIGATE TO APPLICATION
        await driver.get("https://health-tracker-application.netlify.app/");

        // WAIT FOR PAGE LOAD
        await driver.wait(until.elementLocated(By.id("fullName")), 10000);

        // FILL LOGIN FORM
        await driver.findElement(By.id("fullName")).sendKeys("Israr");
        await driver.findElement(By.id("email")).sendKeys("israr@gmail.com");

        // SUBMIT LOGIN FORM
        const submitButton = await driver.findElement(By.css(".btn"));
        await driver.wait(until.elementIsEnabled(submitButton), 5000);
        await submitButton.click();

        // VERIFY DASHBOARD NAVIGATION
        await driver.wait(until.urlContains("https://health-tracker-application.netlify.app/dashboard"), 10000);

        // NAVIGATE TO EXERCISE FEATURE
        const exerciseButton = await driver.wait(
            until.elementLocated(By.css(".feature-card .btn.btn-custom")),
            10000
        );
        await driver.wait(until.elementIsEnabled(exerciseButton), 5000);
        await exerciseButton.click();

        // VERIFY EXERCISE PAGE NAVIGATION
        await driver.wait(
            until.urlContains("https://health-tracker-application.netlify.app/exercise"),
            10000
        );
    });
});
