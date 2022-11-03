const {By,Key,Builder} = require("selenium-webdriver");
const express = require('express');
require("chromedriver");

async function example(){

    const searchString = "Automation testing with Selenium";

    //To wait for browser to build and launch properly
    let driver = await new Builder().forBrowser("chrome").build();

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

//example()
const app = express();

app.get('/', function (req, res) {
    res.send('Hello World');
})

const server = app.listen(8081, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});