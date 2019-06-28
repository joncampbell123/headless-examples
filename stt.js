
var url_id = undefined;
var video_id = undefined;

var i=2; // 0 is 'node', '1' is this script
while (i < process.argv.length) {
    var x = process.argv[i++];

    if (x == '--video') {
        video_id = process.argv[i++];
    }
    else if (x == '--url') {
        url_id = process.argv[i++];
    }
    else {
        console.warn('Unknown param '+x);
        process.exit();
    }
}

if (url_id != undefined && video_id == undefined) {
    if (url_id.match(/(http|https):\/\/www\.tiktok\.com\/share\/video\//)) {
        i = url_id.indexOf('?');
        if (i >= 0) url_id = url_id.substr(0,i);
        console.log('Using URL ' + url_id);

        i = url_id.lastIndexOf('/');
        if (i >= 0) {
            video_id = url_id.substr(i+1);
        }
    }
    else {
        console.warn("Unknown url "+url_id);
        process.exit();
    }
}

console.log("Locating: "+video_id);
if (video_id == undefined || video_id == '') {
    process.exit();
}

var util = require('util');
var chproc = require('child_process');

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
driver.get('https://www.tiktok.com/share/video/' + video_id);

driver.findElement(By.id('__APP_ROOT__')).findElement(By.tagName('video')).getAttribute('src').then(
    function(src) {
        console.log('Found URL: '+src);

        var out = 'tiktok-'+video_id+'.mp4';

        chproc.execFileSync('/usr/bin/wget', [ "--debug", "--user-agent=Mozilla/5.0 (X11; Linux x86_64; rv:67.0) Gecko/20100101 Firefox/67.0", "-O", out, src ]);
    }
);

//driver.sleep(1000).then(function() {
//  driver.findElement(By.name('q')).sendKeys(webdriver.Key.TAB);
//});

//driver.findElement(By.name('btnK')).click();

driver.takeScreenshot().then(function(image, err) { require('fs').writeFile('tiktok-'+video_id+'.png', image, 'base64', function(err) { console.log(err); }) });

driver.quit();
