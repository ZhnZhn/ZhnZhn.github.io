import React from 'react';

import L from 'leaflet';

import EuroStatToMap from '../adapters/EuroStatToMap';

import SvgClose from './SvgClose';
import ShowHide from './zhn/ShowHide';

const styles = {
  rootDiv : {
    lineHeight : 1.5,
    marginBottom: '10px',
    marginRight: '25px',
    //marginRight: '10px',
    position : 'relative'
  },
  headerDiv: {
    backgroundColor: '#232F3B',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    paddingTop: '4px',
    paddingLeft: '10px',
    lineHeight: 1.5,
    height: '32px',
    //width: '600px'
    width : '100%'
  },
  checkBoxStyle : {
    float: 'left',
    marginRight: '10px'
  },
  captionSpanOpen : {
    display : 'inline-block',
    color: 'rgba(164, 135, 212, 1)',
    cursor: 'pointer',
    width: '450px',
    fontWeight : 'bold',
    whiteSpace: 'nowrap',
    textOverflow : 'ellipsis',
    overflow : 'hidden',
    float : 'left'
  },
  captionSpanClose : {
    display : 'inline-block',
    color : 'gray',
    cursor: 'pointer',
    width : '450px',
    fontWeight : 'bold',
    whiteSpace: 'nowrap',
    textOverflow : 'ellipsis',
    overflow : 'hidden',
    float : 'left'
  }
}


const MapChartItem = React.createClass({
  getInitialState(){
    return {
      isOpen : true
    }
  },

  _handlerToggleOpen(){
     this.setState({ isOpen : !this.state.isOpen})
  },

  componentDidMount(){
    const { caption } = this.props
    const map = L.map(`map_${caption}`).setView([58.00, 10.00], 3);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             id: 'addis',
             attribution: '&copy; <a  href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
   }).addTo(map);


   fetch('data/geo/eu-stat.geo.json')
     .then( (response) => {
       return response.json();
     })
     .then( (geoJson) => {
        const { config } = this.props
            , { json, zhMapSlice } = config
         EuroStatToMap.createCholoplethMap(
           json, geoJson,
           zhMapSlice,
           //{ time : '2016M08', 's_adj' : 'NSA', 'indic' : 'LM-UN-T-TOT' },
           map
         );
     })
  },

  render(){
    const { caption, config, onCloseItem } = this.props
        , { json } = config
        //, { zhConfig } = config
        //, { itemCaption } = zhConfig
        //, _itemCaption = (itemCaption) ? itemCaption : caption
        , { isOpen } = this.state
        , _styleCaption = isOpen
              ? styles.captionSpanOpen
              : styles.captionSpanClose;

    return (
      <div style={styles.rootDiv}>
        <div style={styles.headerDiv}>
          <span
             className="not-selected"
             //title={caption}
             title={json.label}
             style={_styleCaption}
             onClick={this._handlerToggleOpen}
          >
             {/*_itemCaption*/}
             {json.label}
          </span>
          <SvgClose onClose={onCloseItem} />
        </div>
        <ShowHide isShow={isOpen}>
           <div
              id={`map_${caption}`}
              style={{ height: '400px'}}
           >
             MapChartItem
           </div>
        </ShowHide>
      </div>
    )
  }
});

export default MapChartItem
