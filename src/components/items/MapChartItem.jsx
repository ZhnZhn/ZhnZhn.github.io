import React, { Component } from 'react';
//import PropTypes from "prop-types";

import ChoroplethMap from '../../adapters/eurostat/ChoroplethMap';

import A from '../Comp'
import ItemHeader from './ItemHeader'
import PanelDataInfo from './PanelDataInfo';

const S = {
  ROOT_DIV: {
    position: 'relative',
    marginBottom: 10,
    marginRight: 25,
  },
  TIME_SPAN: {
    position: 'absolute',
    display: 'inline-block',
    color: 'rgb(253, 179, 22)',
    paddingLeft: 16,
    fontWeight: 'bold'
  },
  TAB_DIV: {
    position: 'relative',
    height: 30,
    backgroundColor: 'transparent',
    zIndex: 2
  },
  MAP_DIV: {
    height : 400
  },
  SPINNER_LOADING: {
    position: 'relative',
    display: 'block',
    width: 32,
    height: 32,
    margin: '0 auto',
    marginTop: 64,
    textAlign: 'middle'
  },
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  }
}

const BtTabInfo = ({ isShow, onClick }) => {
  if (!isShow) { return null; }
  return (
    <div style={S.TAB_DIV}>
       <A.ButtonTab
          caption="Info"
          onClick={onClick}
       />
    </div>
  );
};

class MapChartItem extends Component {
  /*
  static propTypes = {
    caption: PropTypes.string,
    config: PropTypes.shape({
      json: PropTypes.object,
      zhMapSlice: PropTypes.object,
      zhDialog: PropTypes.shape({
        subtitle: PropTypes.string,
        time: PropTypes.string
      })
    }),
    onCloseItem: PropTypes.func
  }
  */

  //map = void 0
  state = {
    isLoading: true,
    isOpen: true,
    isShowInfo: false,
    time: ''
  }

  componentDidMount(){
    const { caption, config } = this.props
        , { json:jsonCube, zhMapSlice } = config;
    ChoroplethMap.draw(`map_${caption}`, jsonCube, zhMapSlice)
       .then(option => {
          this.map = option.map
          this.setState({
            isLoading: false,
            time: option.time
          })
       })
       .catch(err => {
         this.setState({ isLoading: false })
       });
  }

  _hToggle = () => {
     this.setState(prevState => ({
       isOpen: !prevState.isOpen
     }))
  }

  _hClickInfo = () => {
    this.setState({ isShowInfo: true });
  }
  _hClickChart = () => {
    this.setState({ isShowInfo: false });
  }

  render(){
    const { caption, config, onCloseItem } = this.props
    , { zhDialog } = config
    , { itemCaption, subtitle } = zhDialog || {}
    , _itemCaption = itemCaption || subtitle || ''
    , {
        isLoading, isOpen, isShowInfo,
        time
      } = this.state
    , _styleMap = isShowInfo
          ? S.NONE
          : S.BLOCK;

    return (
      <div style={S.ROOT_DIV}>
        <ItemHeader
          isOpen={isOpen}
          caption={_itemCaption}
          onClick={this._hToggle}
          onClose={onCloseItem}
        >
          <span style={S.TIME_SPAN}>
            {time}
          </span>
        </ItemHeader>

        <A.ShowHide isShow={isOpen}>
           <BtTabInfo
             isShow={!isShowInfo}
             onClick={this._hClickInfo}
           />
           <div
              id={`map_${caption}`}
              style={{ ...S.MAP_DIV, ..._styleMap }}
           >
             {
               isLoading && <A.SpinnerLoading style={S.SPINNER_LOADING} />
             }
           </div>
           <PanelDataInfo
              isShow={isShowInfo}
              info={config.info}
              onClickChart={this._hClickChart}
           />
        </A.ShowHide>
      </div>
    );
  }
}

export default MapChartItem
