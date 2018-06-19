import React, { Component } from 'react';
//import PropTypes from "prop-types";

import ChoroplethMap from '../../adapters/eurostat/ChoroplethMap';

import ButtonTab from '../zhn/ButtonTab';
import ShowHide from '../zhn/ShowHide';
import SpinnerLoading from '../zhn/SpinnerLoading';
import ItemHeader from './ItemHeader'
import PanelDataInfo from './PanelDataInfo';

const S = {
  ROOT_DIV: {
    position: 'relative',
    lineHeight: 1.5,
    marginBottom: '10px',
    marginRight: '25px',
  },
  TIME_SPAN: {
    display: 'inline-block',
    color: 'rgb(253, 179, 22)',
    fontWeight: 'bold',
    paddingLeft: '16px',
  },
  TAB_DIV: {
    position: 'relative',
    height: '30px',
    backgroundColor: 'transparent',
    zIndex: 2
  },
  MAP_DIV: {
    height : '400px'
  },
  SPINNER_LOADING: {
    position: 'relative',
    display: 'block',
    textAlign: 'middle',
    margin: '0 auto',
    marginTop: '64px',
    width: '32px',
    height: '32px'
  },
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  }
}

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

  constructor(props){
    super()
    this.map = undefined
    this.state = {
      isLoading: true,
      isOpen: true,
      isShowInfo: false,
      time: ''
    }
  }

  componentDidMount(){
    const { caption, config } = this.props
        , { json:jsonCube, zhMapSlice } = config;

    ChoroplethMap.draw(`map_${caption}`, jsonCube, zhMapSlice)
                 .then( (option) => {
                    this.map = option.map
                    this.setState({
                      isLoading: false,
                      time: option.time
                    })
                    return undefined;
                 })
                 .catch(err => {
                   this.setState({ isLoading: false })
                 });
  }

  _handleToggle = () => {
     this.setState({ isOpen: !this.state.isOpen })
  }

  _handleClickInfo = () => {
    this.setState({ isShowInfo: true });
  }
  _handleClickChart = () => {
    this.setState({ isShowInfo: false });
  }

  _renderTabToolbar = () => {
     return (
      <div style={S.TAB_DIV}>
         <ButtonTab
            caption={'Info'}
            isShow={false}
            onClick={this._handleClickInfo}
         />
      </div>
    );
  }

  render(){
    const { caption, config, onCloseItem } = this.props
        , { zhDialog={} } = config
        , { subtitle='' } = zhDialog
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
          caption={subtitle}
          onClick={this._handleToggle}
          onClose={onCloseItem}
        >
          <span style={S.TIME_SPAN}>
            {time}
          </span>
        </ItemHeader>

        <ShowHide isShow={isOpen}>
           {!isShowInfo && this._renderTabToolbar()}
           <div
              id={`map_${caption}`}
              style={{ ...S.MAP_DIV, ..._styleMap }}
           >
             {
               isLoading && <SpinnerLoading
                  style={S.SPINNER_LOADING} />
             }
           </div>
           <PanelDataInfo
              isShow={isShowInfo}
              info={config.info}
              onClickChart={this._handleClickChart}
           />
        </ShowHide>
      </div>
    )
  }
}

export default MapChartItem
