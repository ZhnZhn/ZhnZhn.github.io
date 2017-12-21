"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ComponentActions = require("../../flux/actions/ComponentActions");

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var conf = {
  dialogConf: true,
  dialogType: "DialogStatN",
  dialogProps: {
    chartsType: "t2",
    dfProps: {},
    isProxy: true
  }
};

var _toFirstUpperCase = function _toFirstUpperCase() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return str.charAt(0).toUpperCase() + str.substr(1);
};

var _getFrequencyAndDims = function _getFrequencyAndDims(json) {
  var dims = [],
      _json$variables = json.variables,
      variables = _json$variables === undefined ? [] : _json$variables;

  var mapFrequency = 'Y';
  variables.forEach(function (item) {
    var code = item.code,
        text = item.text;

    if (code !== 'Tid') {
      dims.push({
        c: _toFirstUpperCase(text),
        v: code
      });
    } else {
      if (text === 'month') {
        mapFrequency = 'M';
      } else if (text === 'quarter') {
        mapFrequency = 'K';
      }
    }
  });
  return { mapFrequency: mapFrequency, dims: dims };
};

var _fOnClickTable = function _fOnClickTable(_ref) {
  var rootUrl = _ref.rootUrl,
      id = _ref.id,
      bT = _ref.bT,
      lT = _ref.lT,
      sP = _ref.sP,
      dU = _ref.dU,
      proxy = _ref.proxy;
  return function () {
    var _url = proxy ? "" + proxy + rootUrl + "/" + id : rootUrl + "/" + id;
    fetch(_url).then(function (res) {
      var status = res.status,
          statusText = res.statusText;

      if (status >= 200 && status < 400) {
        return res.json();
      } else {
        throw Error(statusText);
      }
    }).then(function (json) {
      var _getFrequencyAndDims2 = _getFrequencyAndDims(json),
          mapFrequency = _getFrequencyAndDims2.mapFrequency,
          dims = _getFrequencyAndDims2.dims,
          _json$title = json.title,
          title = _json$title === undefined ? '' : _json$title,
          _title = title.length > 35 ? title.substr(0, 35) + '...' : title,
          _conf = Object.assign({}, conf, {
        type: bT + "_" + id,
        menuTitle: title.substr(0, 27),
        chartContainerCaption: sP + ": " + _title
      });

      Object.assign(_conf.dialogProps, {
        baseMeta: rootUrl,
        loadId: lT,
        mapFrequency: mapFrequency,
        dims: dims,
        descrUrl: dU,
        dfProps: { dfId: id }
      });

      _ComponentActions2.default.showDialog(bT + "_" + id, bT, _conf);
    }).catch(function (err) {
      console.log(err.message);
    });
  };
};

exports.default = _fOnClickTable;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\browser-slider\factoryClickItem.js.map