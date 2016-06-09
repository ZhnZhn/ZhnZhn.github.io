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
         throw { zhCaption: 'Request Error', message: status + ' : ' + statusText };
      } else if (status >= 500 && status < 600) {
         throw { zhCaption: 'Response Error', message: status + ' : ' + statusText };
      }
   }).then(function (json) {
      if (onCheckResponse(json)) {
         onFetch({ json: json, option: option, onCompleted: onCompleted });
      }
   }).catch(function (error) {
      onCatch({ error: error, option: option, onFailed: onFailed });
   });
};
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\utils\fn.js.map