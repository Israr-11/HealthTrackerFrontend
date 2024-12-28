import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

describe('Diet Feature Test', function() {
    this.timeout(30000)
    let driver
    let vars

    beforeEach(async function() {
        const options = new chrome.Options();
        options.addArguments('--headless');
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');
        options.addArguments('--disable-gpu');
        options.addArguments('--window-size=1552,840');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        vars = {}
    })

    afterEach(async function() {
        await driver.quit();
    })

    it('Diet Feature Test', async function() {
        await driver.get("https://health-tracker-application.netlify.app/")
        await driver.manage().window().setRect({ width: 1552, height: 840 })

        await driver.findElement(By.id("fullName")).sendKeys("Israr")
        await driver.findElement(By.id("email")).sendKeys("israr@gmail.com")
        await driver.findElement(By.css(".btn")).click()

        const dietButton = await driver.wait(
            until.elementLocated(By.linkText("Go to Diet Tracking")),
            10000
        );
        await dietButton.click();

        await driver.findElement(By.css(".btn:nth-child(2)")).click()
        await driver.wait(until.elementLocated(By.id("dietGoalType")), 10000)

        const dietSelect = await driver.findElement(By.id("dietGoalType"))
        await dietSelect.click()
        await dietSelect.findElement(By.css("option[value='vegetarian']")).click()

        await driver.findElement(By.id("targetCalories")).sendKeys("2000")

        const submitButton = await driver.findElement(By.css(".modal-footer > .btn-primary"))
        await submitButton.click()

        await driver.sleep(2000)
    })
})
