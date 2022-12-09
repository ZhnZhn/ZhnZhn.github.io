import {
  ComponentActions
} from '../../flux/actions/ComponentActions';

const CONF = {
  dialogConf: true,
  dialogType: "DialogStatN",
  dialogProps: {
    //chartsType: "t2a",
    chartsType: "t2ae",
    dfProps: { },
    //isProxy: true
  }
};

const _assign = Object.assign;

const _crDimUrl = ({
  rootDimUrl,
  rootUrl,
  id,
  proxy='',
  dfDimQuery=''
}) => `${proxy}${rootDimUrl || rootUrl}/${id}${dfDimQuery}`;

const _crCaption = (
  text
) => text.length>35
  ? text.slice(0, 35) + '...'
  : text;

const _crTitleAndCaption = (
  dfProps
) => {
  const _text = dfProps.text || '';
  return {
    menuTitle: _text.slice(0, 27),
    contFullCaption: `${dfProps.sP}: ${_crCaption(_text)}`
  };
};

const factoryClickItem = (
  dfProps
) => () => {
   const {
     rootUrl,
     id,
     proxy,
     bT,
     lT,
     dU,
     noTime,
     dS
   } = dfProps
   , _dimUrl = _crDimUrl(dfProps)
   , _conf = _assign({}, CONF, {
       type: `${bT}_${id}`,
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
   })
   ComponentActions.showDialog(`${bT}_${id}`, bT, _conf)
};

export default factoryClickItem
