/**
 https://github.com/lancevo/detectbrowser
 version: 0.01
*/




/*
if 2 or more matches, it will return the value that has the lowest value of indexOf
If none is matched, defaultValue is returned or null
*/

var regex, matches;
function matchPriority(str, pattern, defaultValue) {

  regex = new RegExp(pattern,'ig');
  matches = str.match(regex);
  var index;
  if (!matches) {
    return typeof defaultValue == 'undefined' ? null : defaultValue;
  } else if (matches.length == 1) {
    return matches[0];
  }

  pattern = pattern.toLowerCase();

  for (var i= 0, lastPos = str.length, p, l=matches.length; i<l; i++) {
    pos = pattern.indexOf(matches[i].toLowerCase());
    if (pos < lastPos) {
      lastPos = pos;
      index = i;
    }
  }
  return matches[index];
}

function extractVersionNumber(str) {
  var num;
  if (str) {
    num = str.match(/\d+[\.\d+]*/);
    return num ? num[0] : num;
  }
  return null;
}


function detectBrowser(ua){
  var name, version, index, os, mobile;


  ua = ua.toLowerCase();

  name = matchPriority(ua,'(opera|chrome|android|safari|firefox|trident|msie)', 'other').toLowerCase();

  if (name === 'trident') {
    name = 'msie';
  }

  var tridentVer = extractVersionNumber(matchPriority(ua,'trident[\\s|/](\\d+[\\.\\d+]*)')),
      uaVersion = extractVersionNumber(matchPriority(ua,'version[\\s|/](\\d+[\\.\\d+]*)'));



  if (tridentVer!=null) {
    version = parseInt(tridentVer) + 4;
  } else if (name==='safari' && uaVersion!=null) {
    version = uaVersion;
  } else if (name==='opera' && uaVersion!=null) {
    version = uaVersion;
  } else {
    index = ua.indexOf(name);
    version = extractVersionNumber(ua.substring(index + name.length + 1));
  }

  os = matchPriority(ua,'(windows|mac os x|linux|symbos)','other').toLowerCase();

  /*
    Notes: iPod ua includes iPhone
   */
  mobile = matchPriority(ua,'(ipod|ipad|iphone|opera mobi|android|mobile)','').toLowerCase();

  if (name==='opera' && mobile!='' && mobile!='opera mobi') {
    mobile = 'opera mobi';
  } else if (name==='safari' && mobile=='android') {
    name = 'android';
  }

  return {
    name: name,
    version: parseInt(version),
    longVersion: version,
    os : os,
    mobile: mobile
  };
}