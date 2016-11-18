
const _typeI = {
  createMapValue(props, item){
    const { group } = props
        , { value } = item
    return `${group}?indic=${value}`;
  },
  createMapSlice(props, item){
    const { mapSlice } = props
        , { value } = item
    return { ...mapSlice, indic : value };
  }
};
const _typeZ = {
  createMapValue(props, item){
    const { value } = item
    return `${value}?`;
  },
  createMapSlice(){
    return { };
  }
}


const _rMapValue = {
  "I" : _typeI.createMapValue,
  "Z" : _typeZ.createMapValue
};
const _rMapSlice = {
  "I" : _typeI.createMapSlice,
  "Z" : _typeZ.createMapSlice
}


const ChoroplethMapSlice = {
  createMapValue(props, item){
     const { mapType } = props
         , _fnCreate = _rMapValue[mapType];

     if (_fnCreate) { return _fnCreate(props, item); }
     else { return undefined; }
  },
  createMapSlice(props, item){
    const { mapType } = props
        , _fnCreate = _rMapSlice[mapType];

    if (_fnCreate) { return _fnCreate(props, item); }
    else { return undefined; }
  }
};

export default ChoroplethMapSlice
