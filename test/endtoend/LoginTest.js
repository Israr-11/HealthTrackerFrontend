import { Builder, By } from 'selenium-webdriver';

describe('Sleep Feature Test', function() {
    this.timeout(30000);
    let driver;
    let vars;

    beforeEach(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        vars = {};
    });

    afterEach(async function() {
        await driver.quit();
    });

    it('Login Feature Test', async function() {
        await driver.get("http://localhost:5173/");
        await driver.manage().window().setRect({ width: 1552, height: 840 });
        await driver.findElement(By.id("fullName")).click();
        await driver.findElement(By.id("fullName")).sendKeys("Israr");
        await driver.findElement(By.id("email")).click();
        await driver.findElement(By.id("email")).sendKeys("israr@gmail.com");
        await driver.findElement(By.css(".btn")).click();
    });
});
