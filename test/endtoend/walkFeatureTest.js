import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

describe('Walk Feature Test', function() {
    this.timeout(30000)
    let driver
    let vars

    beforeEach(async function() {
        const options = new chrome.Options();
        options.addArguments('--headless');
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');
        options.addArguments('--disable-gpu');
        options.addArguments('--window-size=1920,1080');
        options.addArguments('--start-maximized');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        vars = {}
    })

    afterEach(async function() {
        await driver.quit();
    })

    it('Walk Feature Test', async function() {
        await driver.get("https://health-tracker-application.netlify.app/")
        await driver.executeScript("window.scrollTo(0, 0)");

        const fullNameInput = await driver.wait(until.elementLocated(By.id("fullName")), 10000);
        await fullNameInput.sendKeys("Israr");

        const emailInput = await driver.wait(until.elementLocated(By.id("email")), 10000);
        await emailInput.sendKeys("israr@gmail.com");

        const loginButton = await driver.wait(until.elementLocated(By.css(".btn")), 10000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", loginButton);
        await loginButton.click();

        const walkButton = await driver.wait(
            until.elementLocated(By.linkText("Go to Walk Tracking")),
            10000
        );
        await driver.executeScript("arguments[0].scrollIntoView(true);", walkButton);
        await driver.wait(until.elementIsVisible(walkButton), 10000);
        await walkButton.click();

        const createButton = await driver.wait(until.elementLocated(By.css(".btn:nth-child(2)")), 10000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", createButton);
        await createButton.click();

        const stepsInput = await driver.wait(until.elementLocated(By.id("targetSteps")), 10000);
        await stepsInput.sendKeys("10000");

        const uphillSelect = await driver.wait(until.elementLocated(By.id("uphill")), 10000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", uphillSelect);
        await uphillSelect.click();
        await uphillSelect.findElement(By.css("option[value='true']")).click();

        const submitButton = await driver.wait(until.elementLocated(By.css(".modal-footer > .btn-primary")), 10000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", submitButton);
        await submitButton.click();

        await driver.sleep(2000);
    })
})
