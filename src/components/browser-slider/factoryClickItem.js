import ComponentActions from '../../flux/actions/ComponentActions'

const CONF = {
  dialogConf: true,
  dialogType: "DialogStatN",
  dialogProps: {
    chartsType: "t2a",
    dfProps: { },
    isProxy: true
  }
};

const _crMetaUrl = ({ rootUrl, id, proxy }) => {
  const _href = `${rootUrl}/${id}`;
  return proxy
    ? `${proxy}${_href}`
    : _href;
}

const _crTitleAndCaption = (dfProps) => {
  const _text = dfProps.text || ''
  , _caption = _text.length>35
       ? _text.substr(0, 35) + '...'
       : _text;
  return {
    menuTitle: _text.substr(0, 27),
    contFullCaption: `${dfProps.sP}: ${_caption}`
  };
};

const _fOnClickTable = (dfProps) => () => {
   const {
     rootUrl, id, proxy,
     bT, lT, dU,
     noTime, dS
   } = dfProps
   , _metaUrl = _crMetaUrl(dfProps)
   , _conf = Object.assign({}, CONF, {
       type: `${bT}_${id}`,
       ..._crTitleAndCaption(dfProps)
     });
   Object.assign(_conf.dialogProps, {
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
   })
   ComponentActions.showDialog(`${bT}_${id}`, bT, _conf)
};

export default _fOnClickTable
