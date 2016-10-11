'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnalyticActionTypes = undefined;

var _Reflux$createActions;

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AnalyticActionTypes = exports.AnalyticActionTypes = {
  ANSWER_YES: 'answerYes',
  ANSWER_NO: 'answerNo',
  NO_ANSWER: 'noAnswer'
};

var AnalyticActions = _reflux2.default.createActions((_Reflux$createActions = {}, _defineProperty(_Reflux$createActions, AnalyticActionTypes.ANSWER_YES, {}), _defineProperty(_Reflux$createActions, AnalyticActionTypes.ANSWER_NO, {}), _defineProperty(_Reflux$createActions, AnalyticActionTypes.NO_ANSWER, {}), _Reflux$createActions));

exports.default = AnalyticActions;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\actions\AnalyticActions.js.map