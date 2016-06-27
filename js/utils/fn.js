'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
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

      if (status >= 200 && status < 400) {
         return response.json();
      } else if (status >= 400 && status < 500) {
         throw { errCaption: 'Request Error', message: status + ' : ' + statusText };
      } else if (status >= 500 && status < 600) {
         throw { errCaption: 'Response Error', message: status + ' : ' + statusText };
      }
   }).then(function (json) {
      if (onCheckResponse(json)) {
         onFetch({ json: json, option: option, onCompleted: onCompleted });
      }
   }).catch(function (error) {
      onCatch({ error: error, option: option, onFailed: onFailed });
   });
};

var fnFetchText = exports.fnFetchText = function fnFetchText(_ref2) {
   var uri = _ref2.uri;
   var onFetch = _ref2.onFetch;

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