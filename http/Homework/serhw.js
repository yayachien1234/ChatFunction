import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { By, Builder } from 'selenium-webdriver';
import assert from "assert";
import { until} from 'selenium-webdriver';
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express()
const port = 8569
var new_window = 0

async function waitUntilElementDisappears(driver, locator, timeout = 30000) {
  try {
      await driver.wait(until.stalenessOf(await driver.findElement(locator)), timeout);
      console.log('Element disappeared');
  } catch (error) {
      console.error('Element did not disappear within the specified timeout');
  }
}

let driver;
driver = await new Builder().forBrowser('firefox').build();
await driver.manage().window().minimize();

async function homeTest(question, res) {
    

    try {
      if (new_window == 0) {
        new_window = 1;
        

        await driver.get('https://chat.openai.com/');


        await driver.manage().setTimeouts({ implicit: 500 }); // 修正了 impl1cit 到 implicit
        await driver.manage().window().maximize();

        let url = await driver.getCurrentUrl(); // 修正了 getCurrenturl 到 getCurrentUrl
        // console.log(" **Current URL****.* " + url);
        await new Promise(res => setTimeout(res, 1000));
        await driver.findElement(By.xpath('//*[@id="prompt-textarea"]')).sendKeys(question);
        await new Promise(res => setTimeout(res, 1000));
        await driver.findElement(By.xpath('/html/body/div[1]/div[1]/div[2]/main/div[2]/div[2]/form/div/div[2]/div/button')).click();
        await waitUntilElementDisappears(driver, By.xpath('/html/body/div[1]/div[1]/div[2]/main/div[2]/div[2]/form/div/div[2]/div/div/div/div/button'), 10000);  
        const elements = await driver.findElements(By.className('markdown prose w-full break-words dark:prose-invert dark'));
        // 定義一個空的陣列來存儲文本內容
        const textContents = [];
        // 遍歷元素列表，對每個元素獲取文本內容
        for (const element of elements) {
            const text = await element.getText();
            textContents.push(text);
        }
        await new Promise(res => setTimeout(res, 1000));
        console.log(typeof(JSON.stringify(textContents)))
        console.log(JSON.stringify(textContents))
        res.send(JSON.stringify(textContents))
      } 
      else {
        await driver.findElement(By.xpath('//*[@id="prompt-textarea"]')).sendKeys(question);
        await new Promise(res => setTimeout(res, 1000));
        await driver.findElement(By.xpath('/html/body/div[1]/div[1]/div[2]/main/div[2]/div[2]/form/div/div[2]/div/button')).click();
        await waitUntilElementDisappears(driver, By.xpath('/html/body/div[1]/div[1]/div[2]/main/div[2]/div[2]/form/div/div[2]/div/div/div/div/button'), 10000);  
        const elements = await driver.findElements(By.className('markdown prose w-full break-words dark:prose-invert dark'));
        // 定義一個空的陣列來存儲文本內容
        const textContents = [];
        // 遍歷元素列表，對每個元素獲取文本內容
        for (const element of elements) {
            const text = await element.getText();
            textContents.push(text);
        }
        await new Promise(res => setTimeout(res, 1000));
        console.log(typeof(JSON.stringify(textContents)))
        console.log(JSON.stringify(textContents))
        res.send(JSON.stringify(textContents))
      }
      
        
    } catch (e) {
        console.log(e);
    } finally {
        if (driver) {
            // await driver.quit();
        }
    }

}

// start the server
// 啟動伺服器
app.listen(port, () => {
console.log(`listening on port: ${port}`)
})

app.use(express.static(`${__dirname}/dist1`))

import bodyParser from 'body-parser'
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/search', (req, res) => {

  homeTest(`${req.body.stId}`,res);

})

