import { Builder, Capabilities } from 'selenium-webdriver';

// 创建一个 WebDriver 对象
const browser = new Builder()
    .withCapabilities(Capabilities.chrome())
    .build();

// 让浏览器打开指定的网页
browser.get('http://www.google.com');

// 获取页面标题
const promise = browser.getTitle();

promise.then(function(title) {
    console.log(title);
});

// 关闭浏览器
browser.quit();
