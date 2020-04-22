"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ComponentActions = _interopRequireDefault(require("../../flux/actions/ComponentActions"));

var CONF = {
  dialogConf: true,
  dialogType: "DialogStatN",
  dialogProps: {
    chartsType: "t2a",
    dfProps: {},
    isProxy: true
  }
};

var _crMetaUrl = function _crMetaUrl(_ref) {
  var rootUrl = _ref.rootUrl,
      id = _ref.id,
      proxy = _ref.proxy;

  var _href = rootUrl + "/" + id;

  return proxy ? "" + proxy + _href : _href;
};

var _crTitleAndCaption = function _crTitleAndCaption(dfProps) {
  var _text = dfProps.text || '',
      _caption = _text.length > 35 ? _text.substring(0, 35) + '...' : _text;

  return {
    menuTitle: _text.substring(0, 27),
    contFullCaption: dfProps.sP + ": " + _caption
  };
};

var _fOnClickTable = function _fOnClickTable(dfProps) {
  return function () {
    var rootUrl = dfProps.rootUrl,
        id = dfProps.id,
        proxy = dfProps.proxy,
        bT = dfProps.bT,
        lT = dfProps.lT,
        dU = dfProps.dU,
        noTime = dfProps.noTime,
        dS = dfProps.dS,
        _metaUrl = _crMetaUrl(dfProps),
        _conf = Object.assign({}, CONF, (0, _extends2["default"])({
      type: bT + "_" + id
    }, _crTitleAndCaption(dfProps)));

    Object.assign(_conf.dialogProps, {
      loadId: lT,
      descrUrl: dU,
      dataSource: dS,
      dfProps: {
        metaUrl: _metaUrl,
        baseMeta: rootUrl,
        dfId: id,
        proxy: proxy,
        noTime: noTime
      }
    });

    _ComponentActions["default"].showDialog(bT + "_" + id, bT, _conf);
  };
};

var _default = _fOnClickTable;
exports["default"] = _default;
//# sourceMappingURL=factoryClickItem.js.map