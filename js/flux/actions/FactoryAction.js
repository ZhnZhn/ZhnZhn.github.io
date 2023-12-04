"use strict";

exports.__esModule = true;
exports.loadFromQuery = void 0;
var _browserStore = require("../stores/browserStore");
var _itemStore = require("../stores/itemStore");
const loadFromQuery = function (option) {
  if (option === void 0) {
    option = {};
  }
  setTimeout(() => {
    (0, _browserStore.showBrowser)(option);
  }, 100);
  setTimeout(() => {
    (0, _itemStore.loadItemByQuery)(option);
  }, 800);
};
exports.loadFromQuery = loadFromQuery;
//# sourceMappingURL=FactoryAction.js.map