const { By, Builder } = require('selenium-webdriver');
const assert = require("assert");

async function homeTest() {
    let driver;

    try {
        driver = await new Builder().forBrowser('firefox').build();

        await driver.get('https://admlucid.com/');

        let title = await driver.getTitle();
        console.log('******* Home page title ********' + title);
        assert.equal("Home Page - Admlucid", title);

        await driver.manage().setTimeouts({ implicit: 500 }); // 修正了 impl1cit 到 implicit
        await driver.manage().window().maximize();

        let url = await driver.getCurrentUrl(); // 修正了 getCurrenturl 到 getCurrentUrl
        console.log(" **Current URL****.* " + url);

    } catch (e) {
        console.log(e);
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}

homeTest();
