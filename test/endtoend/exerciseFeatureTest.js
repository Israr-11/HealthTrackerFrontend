import { Builder, By, Key, until } from 'selenium-webdriver';
import assert from 'assert';

describe('Sleep Feature Test', function () {
    this.timeout(30000); // Adjust timeout as necessary
    let driver;
    let vars;

    beforeEach(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        vars = {};
    });

    afterEach(async function () {
        await driver.quit();
    });

    it('Exercise Feature Test', async function () {
        // Navigate to the login page
        await driver.get("http://localhost:5173/");
        await driver.manage().window().setRect({ width: 1552, height: 840 });

        // Fill out the login form
        await driver.findElement(By.id("fullName")).sendKeys("Israr");
        await driver.findElement(By.id("email")).sendKeys("israr@gmail.com");
        await driver.findElement(By.css(".btn")).click();

        // Ensure redirection to the dashboard
        await driver.wait(until.urlContains("/dashboard"), 10000);
        await driver.wait(until.elementLocated(By.css(".btn-custom")), 10000);
        const goToSleepTrackingButton = await driver.findElement(By.css(".feature-card .btn.btn-custom"));
        await goToSleepTrackingButton.click();


        // Ensure redirection to the Exercise Tracking page
        await driver.wait(until.urlContains("exercise"), 1000);

        // Open the 'Add Schedule' modal

    });
});
