"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/*
const _headers = new Headers()
        .append('Accept', 'application/vnd.sdmx.structurespecificdata+xml; version=2.1')
const _option = {
  method: 'GET',
  mode: 'cors',
  headers: _headers
}
*/

var fnFetchTxt = function fnFetchTxt(_ref) {
  var uri = _ref.uri,
      option = _ref.option,
      onCheckResponse = _ref.onCheckResponse,
      onFetch = _ref.onFetch,
      onCompleted = _ref.onCompleted,
      onFailed = _ref.onFailed,
      onCatch = _ref.onCatch;

  fetch(uri).then(function (response) {
    return response.text();
  }).then(function (str) {
    if (onCheckResponse(str, option)) {
      onFetch({ json: str, option: option, onCompleted: onCompleted });
    }
  }).catch(function (error) {
    onCatch({ error: error, option: option, onFailed: onFailed });
  });
};

exports.default = fnFetchTxt;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\utils\fnFetchTxt.js.map