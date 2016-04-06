import React from 'react';

import SvgClose from './SvgClose.js';
import ZhHighchart from './ZhHighchart.js';

import PanelDataInfo from './zhn/PanelDataInfo';

const styles = {
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
  captionSpanOpen : {
    color: 'rgba(164, 135, 212, 1)',
    cursor: 'pointer',
  },
  captionSpanClose : {
    color : 'gray',
    cursor: 'pointer',
  }
}

const AreaChartItem = React.createClass({
  getInitialState:function(){
    return {
      isOpen: true,
      isShowChart : true,
      isShowInfo : false
    }
  },

  _handlerToggleOpen: function(){
    this.state.isOpen = !this.state.isOpen;
    this.setState(this.state);
  },

  _handlerClickInfo(){
    this.setState({isShowChart: false, isShowInfo: true});
  },

  _handlerClickChart(){
    this.setState({isShowChart: true, isShowInfo: false});
  },

  render: function(){
    const {caption, config, onCloseItem} = this.props;
    const {isOpen, isShowChart, isShowInfo} = this.state;
    const styleShow = isOpen ? {display: 'block'} : {display: 'none'};
    const classShow = isOpen ? 'show-popup' : null;
    const styleCaption = isOpen ? styles.captionSpanOpen : styles.captionSpanClose;

    return (
      <div style={styles.rootDiv}>
        <div style={styles.headerDiv}>
          <span style={styleCaption} onClick={this._handlerToggleOpen}>
             {caption}
          </span>
          <SvgClose onClose={onCloseItem} />
        </div>
        <div className={classShow} style={styleShow}>
          <ZhHighchart
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
