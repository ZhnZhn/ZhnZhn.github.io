'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BrowserMenu = require('../../constants/BrowserMenu');

var _BrowserMenu2 = _interopRequireDefault(_BrowserMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BrowserSlice = {
  browserMenu: _BrowserMenu2.default,
  getBrowserMenu: function getBrowserMenu(browserType) {
    return this.browserMenu[browserType];
  }
};

exports.default = BrowserSlice;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\stores\BrowserSlice.js.map