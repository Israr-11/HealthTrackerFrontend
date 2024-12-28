import { Builder, By, Key, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

describe('Exercise Feature Test', function() {
    this.timeout(30000)
    let driver
    let vars

    // CHROME OPTIONS FOR HEADLESS EXECUTION
    beforeEach(async function() {
        const options = new chrome.Options();
        options.addArguments('--headless');
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        vars = {}
    })

    afterEach(async function() {
        await driver.quit();
    })

    it('Exercise Feature Test', async function() {
        await driver.get("https://health-tracker-application.netlify.app/")
        await driver.manage().window().setRect({ width: 1552, height: 840 })

        // LOGIN
        await driver.findElement(By.id("fullName")).sendKeys("Israr")
        await driver.findElement(By.id("email")).sendKeys("israr@gmail.com")
        await driver.findElement(By.css(".btn")).click()

        // NAVIGATION TO EXERCISE PAGE
        const exerciseButton = await driver.wait(
            until.elementLocated(By.css(".feature-card .btn.btn-custom")),
            10000
        );
        await exerciseButton.click();

        // CREATION OF NEW SCHEDULE
        await driver.findElement(By.css(".mb-1 > .btn")).click()
        await driver.wait(until.elementLocated(By.id("exerciseType")), 10000)

        // FORM FILLING
        await driver.findElement(By.id("exerciseType")).sendKeys("Running")
        await driver.findElement(By.id("duration")).sendKeys("30")

        // FORM SUBMISSION
        await driver.findElement(By.css(".modal-footer > .btn-primary")).click()

        // VERIFY AND DELETE
        await driver.wait(until.elementLocated(By.css("tbody tr")), 5000)

        const deleteButton = await driver.wait(
            until.elementLocated(By.css(".btn-danger")),
            10000
        );
        await driver.wait(until.elementIsVisible(deleteButton), 5000);
        await driver.wait(until.elementIsEnabled(deleteButton), 5000);

        await driver.executeScript("arguments[0].click();", deleteButton);

        await driver.wait(
            until.stalenessOf(await driver.findElement(By.css("tbody tr"))),
            10000
        );
    })
})
