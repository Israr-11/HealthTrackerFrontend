import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

describe('Screen Time Feature Test', function() {
    this.timeout(30000)
    let driver
    let vars

    beforeEach(async function() {
        // CHROME OPTIONS FOR HEADLESS EXECUTION
        const options = new chrome.Options();
        options.addArguments('--headless');
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');
        options.addArguments('--disable-gpu');
        options.addArguments('--window-size=1552,840');

        // INITIALIZING WEBDRIVER WITH HEADLESS OPTIONS
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        vars = {}
    })

    afterEach(async function() {
        // CLEANUP WEBDRIVER
        await driver.quit();
    })

    it('Screen Time Feature Test', async function() {
        // NAVIGATE TO APPLICATION
        await driver.get("https://health-tracker-application.netlify.app/")
        await driver.manage().window().setRect({ width: 1552, height: 840 })

        // PERFORM LOGIN
        await driver.findElement(By.id("fullName")).sendKeys("Israr")
        await driver.findElement(By.id("email")).sendKeys("israr@gmail.com")
        await driver.findElement(By.css(".btn")).click()

        const screenTimeButton = await driver.wait(
            until.elementLocated(By.linkText("Go to Screen Time Tracking")),
            10000
        );
        await screenTimeButton.click();

        await driver.findElement(By.css(".btn:nth-child(2)")).click()
        await driver.wait(until.elementLocated(By.id("targetScreenHours")), 10000)
        await driver.findElement(By.id("targetScreenHours")).sendKeys("10")

        const submitButton = await driver.findElement(By.css(".modal-footer > .btn-primary"));
        await submitButton.click();
        await driver.sleep(2000);
    })
})
