import React from 'react';

import SvgCheckBox from './zhn/SvgCheckBox';
import ValueMovingBadge from './zhn/ValueMovingBadge';
import SvgClose from './SvgClose';
import ZhHighchart from './ZhHighchart';

import PanelDataInfo from './zhn/PanelDataInfo';

const styles = {
  show : {
    display: 'block'
  },
  hide : {
    display : 'none'
  },
  rootDiv : {
    marginBottom: '10px'
  },
  headerDiv: {
    backgroundColor: '#232F3B',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    paddingTop: '4px',
    paddingLeft: '10px',
    height: '25px',
    width: '600px'
  },
  checkBoxStyle : {
    float: 'left',
    marginRight: '10px'
  },
  captionSpanOpen : {
    display : 'inline-block',
    color: 'rgba(164, 135, 212, 1)',
    cursor: 'pointer',
    width: '125px',
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
    width : '125px',
    fontWeight : 'bold',
    whiteSpace: 'nowrap',
    textOverflow : 'ellipsis',
    overflow : 'hidden',
    float : 'left'
  }
}

const AreaChartItem = React.createClass({
  getInitialState(){
    this._fnOnCheck = this._handlerCheckBox.bind(null, true);
    this._fnOnUnCheck = this._handlerCheckBox.bind(null, false);
    return {
      isOpen: true,
      isShowChart : true,
      isShowInfo : false
    }
  },

  _handlerToggleOpen(){
    this.state.isOpen = !this.state.isOpen;
    this.setState(this.state);
  },

  _handlerClickInfo(){
    this.setState({isShowChart: false, isShowInfo: true});
  },

  _handlerClickChart(){
    this.setState({isShowChart: true, isShowInfo: false});
  },

  _handlerCheckBox(isCheck, checkBox){
    this.props.onSetActive(isCheck, checkBox, this.refs.chart.getChart());
  },

  render(){
    const {caption, config, onSetActive, onCloseItem} = this.props;
    const {isOpen, isShowChart, isShowInfo} = this.state;
    const _styleShow = isOpen ? styles.show : styles.hide;
    const _classShow = isOpen ? 'show-popup' : null;
    const _styleCaption = isOpen ? styles.captionSpanOpen : styles.captionSpanClose;

    return (
      <div style={styles.rootDiv}>
        <div style={styles.headerDiv}>
          <SvgCheckBox
             rootStyle={styles.checkBoxStyle}
             onCheck={this._fnOnCheck}
             onUnCheck={this._fnOnUnCheck}
          />
          <span
             title={caption}
             style={_styleCaption}
             onClick={this._handlerToggleOpen}
          >
             {caption}
          </span>
          <ValueMovingBadge
             valueMoving={config.valueMoving}
          />
          <SvgClose onClose={onCloseItem} />
        </div>
        <div className={_classShow} style={_styleShow}>
          <ZhHighchart
              ref="chart"
              isShow={isShowChart}
              config={config}
              onClickInfo={this._handlerClickInfo}
          />
          <PanelDataInfo
              isShow={isShowInfo}
              info={config.info}
              onClickChart={this._handlerClickChart}
          />
        </div>
      </div>
    )
  }
});

export default AreaChartItem;
