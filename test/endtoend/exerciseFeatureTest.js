import { Builder, By, Key, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

describe('Exercise Feature Test', function() {
    this.timeout(30000);
    let driver;
    let vars;

    beforeEach(async function() {
        // Set up Chrome options to run in headless mode for CI/CD
        const options = new Options();
        options.addArguments('headless'); // Runs Chrome in headless mode
        options.addArguments('no-sandbox'); // For environments like CI/CD
        options.addArguments('disable-dev-shm-usage'); // To handle resource limits

        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
        vars = {};
    });

    afterEach(async function() {
        if (driver) {
            await driver.quit();
        }
    });

    it('Exercise Feature Test', async function() {
        await driver.get("https://health-tracker-application.netlify.app/");
        await driver.manage().window().setRect({ width: 1552, height: 840 });

        // Log in
        await driver.findElement(By.id("fullName")).sendKeys("Israr");
        await driver.findElement(By.id("email")).sendKeys("israr@gmail.com");
        await driver.findElement(By.css(".btn")).click();

        // Wait for navigation to the dashboard
        await driver.wait(until.urlContains("https://health-tracker-application.netlify.app/dashboard"), 10000);

        // Navigate to exercise page
        const goToSleepTrackingButton = await driver.findElement(By.css(".feature-card .btn.btn-custom"));
        await goToSleepTrackingButton.click();

        // Wait for navigation to the exercise page
        await driver.wait(until.urlContains("https://health-tracker-application.netlify.app/exercise"), 10000);
    });
});
