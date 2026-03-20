"use strict";

exports.__esModule = true;
exports.loadCss = void 0;
var _isTypeFn = require("./isTypeFn");
var _asyncFn = require("./asyncFn");
const _assign = Object.assign,
  _crElement = tag => document.createElement(tag);
const isCss = Object.create(null);
const loadCss = href => isCss[href] || !(0, _isTypeFn.isStr)(href) ? (0, _asyncFn.resolvePromise)() : new Promise((resolve, reject) => {
  const _elLink = _assign(_crElement("link"), {
    rel: "stylesheet",
    href,
    onload: () => {
      isCss[href] = true;
      resolve();
    },
    onerror: () => {
      _elLink.remove();
      reject();
    }
  });
  // Insert it at the end of the head in a legacy-friendly manner
  const {
      head
    } = document,
    {
      childNodes
    } = head;
  head.insertBefore(_elLink, childNodes[childNodes.length - 1].nextSibling);
});
exports.loadCss = loadCss;
//# sourceMappingURL=loadCss.js.map