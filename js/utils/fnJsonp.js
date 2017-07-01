'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.fnFetch = undefined;

var _fetchJsonp = require('fetch-jsonp');

var _fetchJsonp2 = _interopRequireDefault(_fetchJsonp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fnFetch = exports.fnFetch = function fnFetch(_ref) {
   var uri = _ref.uri,
       option = _ref.option,
       onCheckResponse = _ref.onCheckResponse,
       onFetch = _ref.onFetch,
       onCompleted = _ref.onCompleted,
       onFailed = _ref.onFailed,
       onCatch = _ref.onCatch;

   (0, _fetchJsonp2.default)(uri, {
      jsonpCallbackFunction: 'BarchartAPIcallback'
   }).then(function (response) {
      return response.json();
   }).then(function (json) {
      if (onCheckResponse(json, option)) {
         onFetch({ json: json, option: option, onCompleted: onCompleted });
      }
   }).catch(function (error) {
      onCatch({ error: error, option: option, onFailed: onFailed });
   });
};
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\utils\fnJsonp.js.map