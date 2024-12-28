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

    it('Diet Feature Test', async function() {
        await driver.get("https://health-tracker-application.netlify.app/")
        await driver.executeScript("window.scrollTo(0, 0)");

        await driver.wait(until.elementLocated(By.id("fullName")), 10000);
        await driver.findElement(By.id("fullName")).sendKeys("Israr")
        await driver.findElement(By.id("email")).sendKeys("israr@gmail.com")

        const loginButton = await driver.findElement(By.css(".btn"))
        await driver.executeScript("arguments[0].scrollIntoView(true);", loginButton);
        await driver.wait(until.elementIsVisible(loginButton), 10000);
        await loginButton.click()

        const dietButton = await driver.wait(
            until.elementLocated(By.linkText("Go to Diet Tracking")),
            10000
        );
        await driver.executeScript("arguments[0].scrollIntoView(true);", dietButton);
        await driver.wait(until.elementIsVisible(dietButton), 10000);
        await dietButton.click();

        const createButton = await driver.wait(
            until.elementLocated(By.css(".btn:nth-child(2)")),
            10000
        );
        await driver.executeScript("arguments[0].scrollIntoView(true);", createButton);
        await driver.wait(until.elementIsVisible(createButton), 10000);
        await createButton.click();

        await driver.wait(until.elementLocated(By.id("dietGoalType")), 10000);
        const dietSelect = await driver.findElement(By.id("dietGoalType"));
        await driver.executeScript("arguments[0].scrollIntoView(true);", dietSelect);
        await dietSelect.click();
        await dietSelect.findElement(By.css("option[value='vegetarian']")).click();

        const caloriesInput = await driver.findElement(By.id("targetCalories"));
        await driver.executeScript("arguments[0].scrollIntoView(true);", caloriesInput);
        await caloriesInput.sendKeys("2000");

        const submitButton = await driver.findElement(By.css(".modal-footer > .btn-primary"));
        await driver.executeScript("arguments[0].scrollIntoView(true);", submitButton);
        await driver.wait(until.elementIsVisible(submitButton), 10000);
        await submitButton.click();

        await driver.sleep(2000);
    })
})
