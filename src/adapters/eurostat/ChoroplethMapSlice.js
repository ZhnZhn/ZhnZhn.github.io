
const _typeI = {
  createMapValue(props, item){
    const { group, mapPropName="indic" } = props;
    return `${group}?${mapPropName}=${item.value}`;
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


const _rMapValue = {
  "I" : _typeI.createMapValue,
  "Z" : _typeZ.createMapValue
};
const _rMapSlice = {
  "I" : _typeI.createMapSlice,
  "Z" : _typeZ.createMapSlice
};

const ChoroplethMapSlice = {
  createMapValue(props, item){
     const { mapType } = props
         , _fnCreate = _rMapValue[mapType];
     return _fnCreate
       ? _fnCreate(props, item)
       : undefined;
  },
  createMapSlice(props, item){
    const { mapType } = props
        , _fnCreate = _rMapSlice[mapType];
    return  _fnCreate
      ? _fnCreate(props, item)
      : undefined;
  }
};

export default ChoroplethMapSlice
