import React from 'react';

import ChoroplethMap from '../../adapters/eurostat/ChoroplethMap';

import SvgClose from '../zhn/SvgClose';
import ButtonTab from '../zhn/ButtonTab';
import ShowHide from '../zhn/ShowHide';
import PanelDataInfo from '../zhn/PanelDataInfo';
import SpinnerLoading from '../zhn/SpinnerLoading';

const styles = {
  rootDiv : {
    position : 'relative',
    lineHeight : 1.5,
    marginBottom: '10px',
    marginRight: '25px',
  },
  headerDiv: {
    backgroundColor: '#232F3B',
    paddingTop: '4px',
    paddingLeft: '10px',
    lineHeight: 1.8,
    height: '32px',
    width : '100%',
    borderTopRightRadius: '2px',
    borderBottomRightRadius: '2px'
  },
  checkBoxStyle : {
    float: 'left',
    marginRight: '10px',
    marginLeft: '10px'
  },
  captionSpanOpen : {
    display : 'inline-block',
    color: 'rgba(164, 135, 212, 1)',
    cursor: 'pointer',
    width: '410px',
    fontWeight : 'bold',
    whiteSpace: 'nowrap',
    textOverflow : 'ellipsis',
    overflow : 'hidden',
    float : 'left'
  },
  timeSpan : {
    color : 'rgb(253, 179, 22)',
    fontWeight : 'bold',
    paddingLeft : '16px'
  },
  captionSpanClose : {
    display : 'inline-block',
    color : 'gray',
    cursor: 'pointer',
    width : '410px',
    fontWeight : 'bold',
    whiteSpace: 'nowrap',
    textOverflow : 'ellipsis',
    overflow : 'hidden',
    float : 'left'
  },
  tabDiv : {
    position: 'relative',
    height: '30px',
    backgroundColor: 'transparent',
    zIndex: 2
  },
  mapDiv : {
    height : '400px'
  },
  spinnerLoading : {
    position: 'relative',
    display: 'block',
    textAlign: 'middle',
    margin: '0 auto',
    marginTop: '64px',
    width: '32px',
    height: '32px'
  },
  displayBlock : {
    display : 'block'
  },
  displayNone : {
    display : 'none'
  }
}


const MapChartItem = React.createClass({
  getInitialState(){
    this.map = undefined;
    return {
      isOpen : true,
      isShowInfo : false
    }
  },

  _handlerToggleOpen(){
     this.setState({ isOpen : !this.state.isOpen })
  },

  componentDidMount(){
    const { caption, config } = this.props
        , { json:jsonCube, zhMapSlice } = config

    ChoroplethMap.draw(`map_${caption}`, jsonCube, zhMapSlice)
                 .then( (option) => {
                     this.map = option.map;
                     return undefined;
                 });
  },

  _handlerClickInfo(){
    this.setState({ isShowInfo : true });
  },
  _handlerClickChart(){
    this.setState({ isShowInfo : false });
  },

  _renderTabToolbar(){
    return (
      <div style={styles.tabDiv}>
         <ButtonTab
            caption={'Info'}
            isShow={this.state.isShowInfo}
            onClick={this._handlerClickInfo}
         />
      </div>
    );
  },

  render(){
    const { caption, config, onCloseItem } = this.props
        , { json={}, zhDialog={} } = config
        , { subtitle='', time='' } = zhDialog
        , { isOpen, isShowInfo } = this.state
        , _styleCaption = isOpen
              ? styles.captionSpanOpen
              : styles.captionSpanClose
        , _styleMap = isShowInfo
              ? styles.displayNone
              : styles.displayBlock;

    return (
      <div style={styles.rootDiv}>
        <div style={styles.headerDiv}>
          <span
             className="not-selected"
             title={json.label}
             style={_styleCaption}
             onClick={this._handlerToggleOpen}
          >
             {subtitle}
          </span>
          <span style={styles.timeSpan}>
            {time}
          </span>
          <SvgClose onClose={onCloseItem} />
        </div>
        <ShowHide isShow={isOpen}>
           {!isShowInfo && this._renderTabToolbar()}
           <div
              id={`map_${caption}`}
              style={Object.assign({}, styles.mapDiv, _styleMap)}
           >
             <SpinnerLoading style={styles.spinnerLoading} />
           </div>
           <PanelDataInfo
              isShow={isShowInfo}
              info={config.info}
              onClickChart={this._handlerClickChart}
           />
        </ShowHide>
      </div>
    )
  }
});

export default MapChartItem
