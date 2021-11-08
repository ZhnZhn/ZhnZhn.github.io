"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ComponentActions = _interopRequireDefault(require("../../flux/actions/ComponentActions"));

const CONF = {
  dialogConf: true,
  dialogType: "DialogStatN",
  dialogProps: {
    //chartsType: "t2a",
    chartsType: "t2ae",
    dfProps: {} //isProxy: true

  }
};
const _assign = Object.assign;

const _crDimUrl = ({
  rootDimUrl,
  rootUrl,
  id,
  proxy = '',
  dfDimQuery = ''
}) => {
  return "" + proxy + (rootDimUrl || rootUrl) + "/" + id + dfDimQuery;
};

const _crTitleAndCaption = dfProps => {
  const _text = dfProps.text || '',
        _caption = _text.length > 35 ? _text.substring(0, 35) + '...' : _text;

  return {
    menuTitle: _text.substring(0, 27),
    contFullCaption: dfProps.sP + ": " + _caption
  };
};

const factoryClickItem = dfProps => () => {
  const {
    rootUrl,
    id,
    proxy,
    bT,
    lT,
    dU,
    noTime,
    dS
  } = dfProps,
        _dimUrl = _crDimUrl(dfProps),
        _conf = _assign({}, CONF, {
    type: bT + "_" + id,
    ..._crTitleAndCaption(dfProps)
  });

  _assign(_conf.dialogProps, {
    loadId: lT,
    descrUrl: dU,
    dataSource: dS,
    dfProps: {
      dimUrl: _dimUrl,
      baseMeta: rootUrl,
      dfId: id,
      proxy,
      noTime
    }
  });

  _ComponentActions.default.showDialog(bT + "_" + id, bT, _conf);
};

var _default = factoryClickItem;
exports.default = _default;
//# sourceMappingURL=factoryClickItem.js.map