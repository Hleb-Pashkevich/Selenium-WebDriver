const {Builder, By, Key, until} = require('selenium-webdriver');
const chromedriver = require('chromedriver');


(async function seleniumTest() {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    let driver = await new Builder().forBrowser('chrome').build();
    try {
        driver.manage().window().maximize();
        await driver.get('https://www.epam.com');
        // Home page
        // 1. click accept cookies
        await driver.wait(until.elementLocated(By.css('button.cookie-disclaimer__button'), 5000));
        await driver.findElement(By.css('button.cookie-disclaimer__button')).click();
        // 2. go Careers page
        await driver.findElement(By.css('li a[href *= careers]')).click();

        // Careers page
        // 1. Click Location drop down arrow and scroll to it
        await driver.wait(until.elementLocated(By.css('span.select2-selection__arrow')), 5000);
        const locationArrow = driver.findElement(By.css('span.select2-selection__arrow'));
        driver.executeScript('arguments[0].scrollIntoView(true);', locationArrow);
        await locationArrow.click();
        // 2. Select Minsk in the drop down
        await driver.findElement(By.css('li[id *= -Minsk')).click();
        // 3. Show "All Skills' dropdown
        const skillsArrow = driver.findElement(By.css('div.selected-params'));
        await skillsArrow.click();
        // 4. Check Young Specialists
        await sleep(100);
        await driver.findElement(By.xpath('//span[contains(text(), \'Young Specialists\')]')).click();
        // 5. Hide "All Skills' dropdown
        await skillsArrow.click();
        // 6. Find selected items element
        const youngSpecialistItem = driver.findElement(By.css('ul.selected-items li[data-value=\'Young Specialists\']'));
        expect(youngSpecialistItem).not.null();
    }
    finally {
        await driver.quit();
    }
})();





