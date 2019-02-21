var passKey = '4c05c54d952b11e691d76c0b843ea7f9';
export const setCookie = function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + compileStr(cvalue) + "; " + expires;
}
export const getCookie = function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) != -1) {
      return uncompileStr(c.substring(name.length, c.length));

      // decrypt(cnameValue, passKey);
    }
  }
  return "";
}
export const clearCookie = function clearCookie(cname) {  
  setCookie(cname, "", -1);
}

function compileStr(code) { //对字符串进行加密         
  var c = String.fromCharCode(code.charCodeAt(0) + code.length);
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
  }
  return escape(c);
}
//字符串进行解密   
function uncompileStr(code) {
  code = unescape(code);
  var c = String.fromCharCode(code.charCodeAt(0) - code.length);
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
  }
  return c;
}
