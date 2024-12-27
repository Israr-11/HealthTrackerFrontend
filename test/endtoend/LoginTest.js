import { Builder, By, Key, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

describe('Login Feature Test', function() {
    this.timeout(30000);
    let driver;
    let vars;

    beforeEach(async function() {
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

    it('Login Feature Test', async function() {
        await driver.get("https://health-tracker-application.netlify.app/");
        await driver.manage().window().setRect({ width: 1552, height: 840 });
        await driver.findElement(By.id("fullName")).click();
        await driver.findElement(By.id("fullName")).sendKeys("Israr");
        await driver.findElement(By.id("email")).click();
        await driver.findElement(By.id("email")).sendKeys("israr@gmail.com");
        await driver.findElement(By.css(".btn")).click();
    });
});
