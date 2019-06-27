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

driver.manage().window().setSize(720,1280); // you know, like a cell phone held vertically!
driver.get('https://www.tiktok.com/share/video/6644242110230826246');

var vid_src = undefined;
driver.findElement(By.id('__APP_ROOT__')).findElement(By.tagName('video')).getAttribute('src').then(
    function(src) {
        console.log('Found URL: '+src);
        vid_src = src;
    }
);

//driver.sleep(1000).then(function() {
//  driver.findElement(By.name('q')).sendKeys(webdriver.Key.TAB);
//});

//driver.findElement(By.name('btnK')).click();

driver.takeScreenshot().then(function(image, err) { require('fs').writeFile('snapshot.png', image, 'base64', function(err) { console.log(err); }) });

driver.quit();
