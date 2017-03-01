'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RouterBrowser;

var _Type = require('../../constants/Type');

var _SourceBrowserDynamic = require('../../components/browser-container/SourceBrowserDynamic');

var _SourceBrowserDynamic2 = _interopRequireDefault(_SourceBrowserDynamic);

var _SourceBrowserDynamic3 = require('../../components/browser-container/SourceBrowserDynamic2');

var _SourceBrowserDynamic4 = _interopRequireDefault(_SourceBrowserDynamic3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RouterBrowser = (_RouterBrowser = {
  DEFAULT: _SourceBrowserDynamic2.default

}, _defineProperty(_RouterBrowser, _Type.BrowserType.US_STOCKS, _SourceBrowserDynamic4.default), _defineProperty(_RouterBrowser, _Type.BrowserType.NYSE_STOCKS, _SourceBrowserDynamic4.default), _defineProperty(_RouterBrowser, _Type.BrowserType.NASDAQ_STOCKS, _SourceBrowserDynamic4.default), _defineProperty(_RouterBrowser, _Type.BrowserType.LONDON_STOCKS, _SourceBrowserDynamic4.default), _RouterBrowser);

exports.default = RouterBrowser;
//# sourceMappingURL=RouterBrowser.js.map