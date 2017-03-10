'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _LogicFn = require('./LogicFn');

var _LogicFn2 = _interopRequireDefault(_LogicFn);

var _WithLogicGroup = require('./WithLogicGroup');

var _WithLogicGroup2 = _interopRequireDefault(_WithLogicGroup);

var _WithLogicList = require('./WithLogicList');

var _WithLogicList2 = _interopRequireDefault(_WithLogicList);

var _WithLogicItem = require('./WithLogicItem');

var _WithLogicItem2 = _interopRequireDefault(_WithLogicItem);

var _WithLogicDnD = require('./WithLogicDnD');

var _WithLogicDnD2 = _interopRequireDefault(_WithLogicDnD);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logic = (0, _extends3.default)({}, _WithLogicGroup2.default, _WithLogicList2.default, _WithLogicItem2.default, _WithLogicDnD2.default, {

  findGroup: _LogicFn2.default.findGroup

});

exports.default = Logic;
//# sourceMappingURL=Logic.js.map