
import L from 'leaflet';
import JSONstat from 'jsonstat';

const MAP_COLOR_NUMBER = 6;

const _findFeature = function(arr, value){
  for(let i=0, len=arr.length; i<len; i++){
     const feature = arr[i]
     if (feature.properties.id === value){
       return feature;
     }
  }
  return undefined;
};


const _fnMergeGeoAndValue = function(sGeo, dGeo, json){
  let minValue=100, maxValue=0;
  sGeo.forEach((cell, index) => {
    const feature = _findFeature(json.features, dGeo.id[index]);
    if (feature && cell.value){
      feature.properties.value = cell.value;
      if (minValue>cell.value) {
        minValue = cell.value;
      }
      if (maxValue<cell.value) {
        maxValue = cell.value;
      }
    }
  })
  return {minValue, maxValue}
}

const _calcColor = function(minValue, delta, value) {
    if (!value){
      return '#74c476';
    } else {
    return (value < minValue+1*delta) ? '#9ecae1' :
           (value < minValue+2*delta) ? '#6baed6' :
           (value < minValue+3*delta) ? '#4292c6' :
           (value < minValue+4*delta) ? '#2171b5' :
           (value < minValue+5*delta) ? '#08519c' :
                                        '#08306b';
    }
}


const _fnStyle = function(minValue, delta, feature){
  return {
    "color" : 'green',
    "fillColor" : _calcColor(minValue, delta, feature.properties.value),
    "weight": 1,
    "fillOpacity": 0.7,
    "opacity": 0.65
  }
}


const _fnCreateInfoControl = function(){
  const wgInfo = L.control();
  wgInfo.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'control-info');
    this.update();
    return this._div;
  }
  wgInfo.update = function(props){
    if (props){
      const { label, value } = props

      this._div.innerHTML = `<b>${label}</b><br><b>${value ? value : 'uknown'}</b>`
    }
  }
  return wgInfo;
}

const _fnCreateGradeControl = function(minValue, delta){
  const gradeContorl = L.control({position: 'bottomleft'})
  gradeContorl.onAdd= function(map){
    const _div = L.DomUtil.create('div', 'control-grade');
    for(let i=1; i<MAP_COLOR_NUMBER+1; i++){
      _div.innerHTML +=
        '<i style="background:'+_calcColor(minValue, delta, minValue+delta*(i)-0.1)+'";' + '</i>'+
        (Math.floor(minValue+delta*(i-1))) + '&ndash;' + (Math.round(minValue+delta*(i))) + '<br>'
     }
     return _div;
  }
  return gradeContorl;
}

const EuroStatToMap = {
  createCholoplethMap(statJson, geoJson, configSlice, map){
    const  ds = JSONstat(statJson).Dataset(0)
         , dGeo = ds.Dimension("geo")
         , sGeo = ds.Data(configSlice)
         , { minValue, maxValue } = _fnMergeGeoAndValue(sGeo, dGeo, geoJson)
         , delta = (maxValue - minValue)/MAP_COLOR_NUMBER;

    const wgInfo = _fnCreateInfoControl();
    wgInfo.addTo(map);

    const _fnOnMouseOver = function(e){
      const _layer = e.target;
       wgInfo.update(_layer.feature.properties);
    }
    const  _fnOnMouseOut = function(e){
       wgInfo.update();
    }
    const _fnOnEachFeature = function(feature, layer){
       layer.on({
         mouseover : _fnOnMouseOver,
         mouseout : _fnOnMouseOut
       })
    }

    L.geoJSON(geoJson, {
       style : _fnStyle.bind(null, minValue, delta),
       onEachFeature: _fnOnEachFeature
    }).addTo(map);

    const gradeContorl = _fnCreateGradeControl(minValue, delta)
    gradeContorl.addTo(map);
  }
};

export default EuroStatToMap
