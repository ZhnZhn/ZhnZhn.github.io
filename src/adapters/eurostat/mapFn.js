
const _typeI = {
  createMapValue(props, item){
    const { mapPropName="indic" } = props;
    return `?${mapPropName}=${item.value}`;
  },
  createMapSlice(props, item){
    const { mapSlice, mapPropName="indic" } = props;
    return {
      ...mapSlice,
      [mapPropName]: item.value
    };
  }
};
const _typeZ = {
  createMapValue(props, item){
    return `${item.value}?`;
  },
  createMapSlice(){
    return { };
  }
};
const _typeV = {
  createMapValue(props, item){
    return item.value;
  },
  createMapSlice(props, item){
    const { value } = item
        , mapSlice = {};
    if (typeof value !== 'string'
        || value.indexOf('?') === -1) {
      return mapSlice;
    }
    value.substr(value.indexOf('?'))
      .split('&')
      .forEach(pStr => {
        const _arr = pStr.split('=');
        if (_arr[0] && _arr[1]) {
          mapSlice[_arr[0]] = _arr[1]
        }
      })

    return mapSlice;
  }
};

const R_MAP_VALUE = {
  "I": _typeI.createMapValue,
  "Z": _typeZ.createMapValue,
  "V": _typeV.createMapValue
};
const R_MAP_SLICE = {
  "I": _typeI.createMapSlice,
  "Z": _typeZ.createMapSlice,
  "V": _typeV.createMapSlice,
};

const _addParamTo = (q, p) => q ? q + '&' + p : p;

const mapFn = {
  toQuery: ({ dfParams, items, dfTail }) => {
    let _q = '', i = 0;
    for (;i<dfParams.length; i++) {
      _q = _addParamTo(_q, `${dfParams[i]}=${items[i].value}`)
    }
    return dfTail
      ? _addParamTo(_q, dfTail)
      : _q;
  },

  toMapSlice: (tail, option) => {
    const {
           dfParams, items,
           time, dfSlice,
           dfTail
          } = option
         , zhMapSlice = { ...dfSlice, time };

    let query='', i;
    for (i=1 ;i<dfParams.length; i++){
      query = _addParamTo(query, `${dfParams[i]}=${items[i].value}`)
      zhMapSlice[dfParams[i]] = items[i].value
    }
    const _tail = _addParamTo(dfTail, tail);
    query = _addParamTo(query, _tail)

    return {
      query, zhMapSlice
    };
  },

  createMapValue: (props, item) => {
     const _mapType = props.mapType || item.mapType
         , _fnCreate = R_MAP_VALUE[_mapType];
     return _fnCreate
       ? _fnCreate(props, item)
       : undefined;
  },
  createMapSlice: (props, item) => {
    const _mapType = props.mapType || item.mapType
        , _fnCreate = R_MAP_SLICE[_mapType];
    return  _fnCreate
      ? _fnCreate(props, item)
      : undefined;
  }
}

export default mapFn
