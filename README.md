# detect browser

A function to detect major browser type, version, and os.

```js
var browser = detectBrowser(navigator.userAgent);

console.log('Browser name : ' + browser.name); // safari
console.log('Version : ' + browser.version);  // 5
console.log('Long Version : ' + browser.longVersion); // 5.0.2
console.log('Mobile ? : ' + browser.mobile);  // iphone
console.log('OS : ' + browser.os); //mac os x
```

