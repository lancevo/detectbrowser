/**
 https://github.com/lancevo/detectbrowser
 version: 0.03
*/


var detectBrowser = (function () {

  function getFirstMatch(str, pattern, defaultValue) {

    var regex = new RegExp(pattern, 'ig'),
      matches = str.match(regex),
      index;

    if (!matches) {
      return typeof defaultValue === 'undefined' ? null : defaultValue;
    } else if (matches.length == 1) {
      return matches[0];
    }

    pattern = pattern.toLowerCase();

    for (var i = 0, lastPos = str.length, p, l = matches.length; i < l; i++) {
      var pos = pattern.indexOf(matches[i].toLowerCase());
      if (pos < lastPos) {
        lastPos = pos;
        index = i;
      }
    }
    return matches[index];
  }

  function getVersion(str) {
    var num;
    if (str) {
      num = str.match(/\d+[\.\d+]*/);
      return num ? num[0] : num;
    }
    return null;
  }

  function detectBrowser(ua) {
    var name, version, index, os, mobile;

    ua = (typeof ua === 'undefined' ? navigator.userAgent : ua).toLowerCase();
    name = getFirstMatch(ua, '(edge|opera|chrome|android|safari|firefox|trident|msie)', 'other').toLowerCase();

    if (name === 'trident') {
      name = 'msie';
    }

    var tridentVer = getVersion(getFirstMatch(ua, 'trident[\\s|/](\\d+[\\.\\d+]*)')),
      uaVersion = getVersion(getFirstMatch(ua, 'version[\\s|/](\\d+[\\.\\d+]*)'));

    if (tridentVer != null) {
      version = parseInt(tridentVer) + 4;
    } else if (name === 'safari' && uaVersion != null) {
      version = uaVersion;
    } else if (name === 'opera' && uaVersion != null) {
      version = uaVersion;
    } else {
      index = ua.indexOf(name);
      version = getVersion(ua.substring(index + name.length + 1));
    }

    os = getFirstMatch(ua, '(windows|mac os x|linux|symbos)', 'other').toLowerCase();
    /*
     Notes: iPod ua includes iPhone
     */
    mobile = getFirstMatch(ua, '(ipod|ipad|iphone|opera mobi|android|mobile)', '').toLowerCase();

    if (name === 'opera' && mobile != '' && mobile != 'opera mobi') {
      mobile = 'opera mobi';
    } else if (name === 'safari' && mobile == 'android') {
      name = 'android';
    }

    return {
      name: name,
      version: parseInt(version),
      longVersion: version,
      os: os,
      mobile: mobile
    };
  }

  return detectBrowser;
})();
