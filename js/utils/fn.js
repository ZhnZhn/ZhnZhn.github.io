'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var LIMIT_REMAINING = 'X-RateLimit-Remaining';

var fnFetch = exports.fnFetch = function fnFetch(_ref) {
   var uri = _ref.uri;
   var option = _ref.option;
   var onCheckResponse = _ref.onCheckResponse;
   var onFetch = _ref.onFetch;
   var onCompleted = _ref.onCompleted;
   var onFailed = _ref.onFailed;
   var onCatch = _ref.onCatch;

   fetch(uri).then(function (response) {
      var status = response.status;
      var statusText = response.statusText;
      var headers = response.headers;

      if (status >= 200 && status <= 400) {
         return Promise.all([Promise.resolve(headers.get(LIMIT_REMAINING)), response.json()]);
      } else if (status > 400 && status < 500) {
         throw { errCaption: 'Request Error', message: status + ' : ' + statusText };
      } else if (status >= 500 && status < 600) {
         throw { errCaption: 'Response Error', message: status + ' : ' + statusText };
      }
   }).then(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2);

      var limitRemaining = _ref3[0];
      var json = _ref3[1];

      if (onCheckResponse(json)) {
         option.limitRemaining = limitRemaining;
         onFetch({ json: json, option: option, onCompleted: onCompleted });
      }
   }).catch(function (error) {
      onCatch({ error: error, option: option, onFailed: onFailed });
   });
};

var fnFetchText = exports.fnFetchText = function fnFetchText(_ref4) {
   var uri = _ref4.uri;
   var onFetch = _ref4.onFetch;

   fetch(uri).then(function (response) {
      var status = response.status;
      var statusText = response.statusText;

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
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\utils\fn.js.map