/**
 https://github.com/lancevo/detectbrowser
 version: 0.01
*/



function detectBrowser(ua){
  var browser, version, index, os, mobile;

  browser =  ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || ['','other'];

  browser = browser[1];

  if (browser.match(/trident/i)) {
    browser = 'MSIE';
  } else if (ua.match(/opera/i)!=null) { // sometimes it detected as firefox
    browser= 'Opera';
  }

  var tridentVersion = ua.match(/trident\/(\d+)/i),
    safariVersion = ua.match(/Version\/(\d+)/);

  index = ua.indexOf(browser);

  if (tridentVersion!=null) {
    version = parseInt(tridentVersion[1]) + 4;
  } else if (browser==='Safari' && safariVersion!=null) {
    version = safariVersion[1];
  } else if (browser==='Opera' && safariVersion!=null) {
    version = safariVersion[1];
  } else {
    version = parseInt(ua.substring(index + browser.length + 1));
  }

  os = ua.match(/(windows|mac os x|linux|symbos)/i) || ['','other'];
  os = os[1].toLowerCase();

  /*
    Notes: iPod ua includes iPhone

   */
  mobile = ua.match(/(ipod|ipad|iphone|android|opera mobi|mobile)/i) || ['',''];

  mobile = mobile[1];

  return {
    name: browser.toLowerCase(),
    version: version,
    os : os.toLowerCase(),
    mobile: mobile.toLowerCase()
  };
}