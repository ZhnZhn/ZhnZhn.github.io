'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnalyticActionTypes = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Reflux$createActions;

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AnalyticActionTypes = exports.AnalyticActionTypes = {
  ANSWER_YES: 'answerYes',
  ANSWER_VIEW: 'answerView',
  ANSWER_NO: 'answerNo',
  NO_ANSWER: 'noAnswer'
};
var A = AnalyticActionTypes;

var AnalyticActions = _reflux2.default.createActions((_Reflux$createActions = {}, (0, _defineProperty3.default)(_Reflux$createActions, A.ANSWER_YES, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.ANSWER_NO, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.ANSWER_VIEW, {}), (0, _defineProperty3.default)(_Reflux$createActions, A.NO_ANSWER, {}), _Reflux$createActions));

exports.default = AnalyticActions;
//# sourceMappingURL=AnalyticActions.js.map