"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _ComponentActions = _interopRequireDefault(require("../../flux/actions/ComponentActions"));

var conf = {
  dialogConf: true,
  dialogType: "DialogStatN",
  dialogProps: {
    chartsType: "t2a",
    dfProps: {},
    isProxy: true
  }
};

var _toFirstUpperCase = function _toFirstUpperCase(str) {
  if (str === void 0) {
    str = '';
  }

  return str.charAt(0).toUpperCase() + str.substr(1);
};

var _getFrequencyAndDims = function _getFrequencyAndDims(json) {
  var dims = [],
      _json$variables = json.variables,
      variables = _json$variables === void 0 ? [] : _json$variables;
  var mapFrequency = 'Y';
  var timeId;
  variables.forEach(function (item) {
    var code = item.code,
        text = item.text,
        time = item.time;

    if (time) {
      timeId = code;
    }

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
  return {
    mapFrequency: mapFrequency,
    dims: dims,
    timeId: timeId
  };
};

var _fOnClickTable = function _fOnClickTable(dfProps) {
  return function () {
    var rootUrl = dfProps.rootUrl,
        id = dfProps.id,
        proxy = dfProps.proxy,
        bT = dfProps.bT,
        lT = dfProps.lT,
        sP = dfProps.sP,
        dU = dfProps.dU,
        noTime = dfProps.noTime,
        dS = dfProps.dS,
        _href = rootUrl + "/" + id,
        _url = proxy ? "" + proxy + _href : _href;

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
          timeId = _getFrequencyAndDims2.timeId,
          _json$title = json.title,
          title = _json$title === void 0 ? '' : _json$title,
          _title = title.length > 35 ? title.substr(0, 35) + '...' : title,
          _conf = Object.assign({}, conf, {
        type: bT + "_" + id,
        menuTitle: title.substr(0, 27),
        contFullCaption: sP + ": " + _title
      });

      Object.assign(_conf.dialogProps, {
        baseMeta: rootUrl,
        loadId: lT,
        mapFrequency: mapFrequency,
        dims: dims,
        timeId: timeId,
        descrUrl: dU,
        dataSource: dS,
        dfProps: {
          dfId: id
        },
        noTime: noTime,
        proxy: proxy
      });

      _ComponentActions["default"].showDialog(bT + "_" + id, bT, _conf);
    })["catch"](function (err) {
      console.log(err.message);
    });
  };
};

var _default = _fOnClickTable;
exports["default"] = _default;
//# sourceMappingURL=factoryClickItem.js.map