'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.fnFetchText = exports.fnFetch = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LIMIT_REMAINING = 'X-RateLimit-Remaining';

var fnFetch = exports.fnFetch = function fnFetch(_ref) {
   var uri = _ref.uri,
       option = _ref.option,
       onCheckResponse = _ref.onCheckResponse,
       onFetch = _ref.onFetch,
       onCompleted = _ref.onCompleted,
       onFailed = _ref.onFailed,
       onCatch = _ref.onCatch;

   fetch(uri).then(function (response) {
      var status = response.status,
          statusText = response.statusText,
          headers = response.headers;

      if (status >= 200 && status <= 400) {
         return Promise.all([Promise.resolve(headers.get(LIMIT_REMAINING)), response.json()]);
      } else if (status > 400 && status < 500) {
         throw { errCaption: 'Request Error', message: status + ' : ' + statusText };
      } else if (status >= 500 && status < 600) {
         throw { errCaption: 'Response Error', message: status + ' : ' + statusText };
      }
   }).then(function (_ref2) {
      var _ref3 = (0, _slicedToArray3.default)(_ref2, 2),
          limitRemaining = _ref3[0],
          json = _ref3[1];

      if (onCheckResponse(json, option)) {
         option.limitRemaining = limitRemaining;
         onFetch({ json: json, option: option, onCompleted: onCompleted });
      }
   }).catch(function (error) {
      onCatch({ error: error, option: option, onFailed: onFailed });
   });
};

var fnFetchText = exports.fnFetchText = function fnFetchText(_ref4) {
   var uri = _ref4.uri,
       onFetch = _ref4.onFetch;

   fetch(uri).then(function (response) {
      var status = response.status,
          statusText = response.statusText;

      if (status >= 200 && status < 400) {
         return response.text();
      } else if (status >= 400 && status < 500) {
         throw { errCaption: 'Request Error', message: status + ' : ' + statusText };
      } else if (status >= 500 && status < 600) {
         throw { errCaption: 'Response Error', message: status + ' : ' + statusText };
      }
   }).then(function (text) {
      onFetch({ text: text });
   }).catch(function (error) {
      console.log(error);
   });
};
//# sourceMappingURL=fn.js.map