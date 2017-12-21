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
  variables.forEach(item => {
    const { code, text } = item;
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
  return { mapFrequency, dims };
}

const _fOnClickTable = ({ rootUrl, id, bT, lT, sP, dU }) => () => {
   fetch(`${rootUrl}/${id}`)
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
                mapFrequency, dims
              } = _getFrequencyAndDims(json)
            , { title='' } = json
            , _title = title.length>35
                 ? title.substr(0, 35) + '...'
                 : title
            , _conf = Object.assign({}, conf, {
                type: `${bT}_${id}`,
                menuTitle: title.substr(0, 27),
                chartContainerCaption: `${sP}: ${_title}`
              });

        Object.assign(_conf.dialogProps, {
          baseMeta: rootUrl,
          loadId: lT,
          mapFrequency: mapFrequency,
          dims: dims,
          descrUrl: dU,
          dfProps: { dfId: id }
        })

        ComponentActions.showDialog(`${bT}_${id}` , bT, _conf)
      })
      .catch(err => {
        console.log(err.message)
      })
};

export default _fOnClickTable
