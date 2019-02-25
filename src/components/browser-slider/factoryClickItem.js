import ComponentActions from '../../flux/actions/ComponentActions'

const conf = {
  dialogConf: true,
  dialogType: "DialogStatN",
  dialogProps: {
    chartsType: "t2",
    dfProps: { },
    isProxy: true
  }
};

const _toFirstUpperCase = (str='') => {
  return str
    .charAt(0)
    .toUpperCase() + str.substr(1);
}

const _getFrequencyAndDims = (json) => {
  const dims = []
      , { variables=[] } = json;
  let mapFrequency = 'Y'
  let timeId
  variables.forEach(item => {
    const { code, text, time } = item;
    if (time) { timeId = code }
    if (code !== 'Tid') {
     dims.push({
       c: _toFirstUpperCase(text),
       v: code
     })
   } else {
     if (text === 'month') {
       mapFrequency = 'M'
     } else if ( text === 'quarter') {
       mapFrequency = 'K'
     }
   }
  })
  return { mapFrequency, dims, timeId };
}

const _fOnClickTable = (dfProps) => () => {
   const {
     rootUrl, id, proxy,
     bT, lT, sP, dU,
     noTime, dS
   } = dfProps
   , _href = `${rootUrl}/${id}`
   , _url = proxy ? `${proxy}${_href}` : _href;
   fetch(_url)
      .then(res => {
        const { status, statusText } = res;
        if (status>=200 && status<400) {
          return res.json();
        } else {
          throw Error(statusText)
        }
      })
      .then(json => {
        const {
                mapFrequency, dims, timeId
              } = _getFrequencyAndDims(json)
            , { title='' } = json
            , _title = title.length>35
                 ? title.substr(0, 35) + '...'
                 : title
            , _conf = Object.assign({}, conf, {
                type: `${bT}_${id}`,
                menuTitle: title.substr(0, 27),
                contFullCaption: `${sP}: ${_title}`
              });

        Object.assign(_conf.dialogProps, {
          baseMeta: rootUrl,
          loadId: lT,
          mapFrequency: mapFrequency,
          dims: dims,
          timeId: timeId,
          descrUrl: dU,
          dataSource: dS,
          dfProps: { dfId: id },
          noTime: noTime,
          proxy: proxy
        })

        ComponentActions.showDialog(`${bT}_${id}` , bT, _conf)
      })
      .catch(err => {
        console.log(err.message)
      })
};

export default _fOnClickTable
