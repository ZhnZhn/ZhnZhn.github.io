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

const _crMetaUrl = ({
  rootMeta,
  rootUrl,
  id,
  proxy = '',
  dfMeta = ''
}) => {
  return "" + proxy + (rootMeta || rootUrl) + "/" + id + dfMeta;
};

const _crTitleAndCaption = dfProps => {
  const _text = dfProps.text || '',
        _caption = _text.length > 35 ? _text.substring(0, 35) + '...' : _text;

  return {
    menuTitle: _text.substring(0, 27),
    contFullCaption: dfProps.sP + ": " + _caption
  };
};

const _fOnClickTable = dfProps => () => {
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
        _metaUrl = _crMetaUrl(dfProps),
        _conf = _assign({}, CONF, {
    type: bT + "_" + id,
    ..._crTitleAndCaption(dfProps)
  });

  _assign(_conf.dialogProps, {
    loadId: lT,
    descrUrl: dU,
    dataSource: dS,
    dfProps: {
      metaUrl: _metaUrl,
      baseMeta: rootUrl,
      dfId: id,
      proxy,
      noTime
    }
  });

  _ComponentActions.default.showDialog(bT + "_" + id, bT, _conf);
};

var _default = _fOnClickTable;
exports.default = _default;
//# sourceMappingURL=factoryClickItem.js.map