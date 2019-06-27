var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var firefox = require('selenium-webdriver/firefox');

var options = new firefox.Options();
options.addArguments("-headless");
options.setBinary('/usr/lib/firefox-55.0/firefox-bin');

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(options)
    .build();

driver.manage().window().setSize(1080,1920);
driver.get('https://www.tiktok.com/share/video/6644242110230826246');
//driver.findElement(By.name('q')).sendKeys('webdriver');

//driver.sleep(1000).then(function() {
//  driver.findElement(By.name('q')).sendKeys(webdriver.Key.TAB);
//});

//driver.findElement(By.name('btnK')).click();

driver.takeScreenshot().then(function(image, err) { require('fs').writeFile('snapshot.png', image, 'base64', function(err) { console.log(err); }) });

driver.quit();
