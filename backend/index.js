const express = require('express');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const {Builder, By, Key, until} = require('selenium-webdriver');

const screen = {
    width: 640,
    height: 480
};

async function example(){

    /*
        options = webdriver.ChromeOptions()
        options.add_argument('--ignore-certificate-errors')
        options.add_argument("--test-type")
        options.add_argument("--disable-web-security")

        if headless:
            options.add_argument("--headless")

        if binary_location is not None:
            options.binary_location = binary_location

        driver = webdriver.Chrome(options=options)
     */

    const searchString = "Automation testing with Selenium";

    //let builder = new Builder().forBrowser('chrome')
    //builder = builder.setChromeOptions(new chrome.Options().headless())

    let driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().headless().windowSize(screen))
        .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
        .build();

    //To wait for browser to build and launch properly
    //let driver = await builder.forBrowser("chrome").build();

    //To fetch http://google.com from the browser with our code.
    await driver.get("http://google.com");

    //To send a search query by passing the value in searchString.
    await driver.findElement(By.name("q")).sendKeys(searchString,Key.RETURN);

    //Verify the page title and print it
    const title = await driver.getTitle();
    console.log('Title is:',title);

    //It is always a safe practice to quit the browser after execution
    await driver.quit();

}

example()
const app = express();

app.get('/', function (req, res) {
    res.send('Hello World');
})

const server = app.listen(8081, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});
