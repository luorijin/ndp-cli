window.maxHtmlSize = 50;
(function rem(doc, win) {
    var style = document.createElement('style');
    style.setAttribute('type', 'text/css');
  
    var _baseWidth = window.baseWidth ? window.baseWidth : 320;
  
    var size = Math.floor(document.documentElement.clientWidth * 20 / _baseWidth);
    if (window.maxHtmlSize && size > window.maxHtmlSize) {
        size = window.maxHtmlSize;
    }
    var cssText = document.createTextNode('html {font-size: ' + size + 'px}');
    style.appendChild(cssText);
    document.head.appendChild(style);
  
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function recalc() {
        if (style) {
            var _size = Math.floor(document.documentElement.clientWidth * 20 / _baseWidth);
            if (window.maxHtmlSize && _size > window.maxHtmlSize) {
                _size = window.maxHtmlSize;
            }
            style.removeChild(style.childNodes[0]);
            var _cssText = document.createTextNode('html {font-size: ' + _size + 'px}');
            style.appendChild(_cssText);
        }
    };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
  })(document, window);