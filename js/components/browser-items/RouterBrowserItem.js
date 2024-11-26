"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.getBrowserItemComp = void 0;
var _crRouter = require("../../utils/crRouter");
var _Item = _interopRequireDefault(require("./Item"));
var _ItemWithCap = _interopRequireDefault(require("./ItemWithCap"));
var _ItemLse = _interopRequireDefault(require("./ItemLse"));
const getBrowserItemComp = exports.getBrowserItemComp = (0, _crRouter.crGetRoute)({
  Item: _Item.default,
  ItemWithCap: _ItemWithCap.default,
  ItemLse: _ItemLse.default
});
//# sourceMappingURL=RouterBrowserItem.js.map