import React, { Component, PropTypes } from 'react'

import { Direction } from '../../constants/Type'

import SvgDown from '../zhn/SvgDown'
import SvgUp from '../zhn/SvgUp'
import SvgEqual from '../zhn/SvgEqual'
import ShowHide from '../zhn/ShowHide'

import SpanValue from '../zhn-span/SpanValue'
import SpanDate from '../zhn-span/SpanDate'
import PanelValueMoving from './PanelValueMoving'

const styles = {
  rootSpan : {
    display : 'inline-block',
    position: 'relative',
    marginLeft : '10px',
    cursor: 'pointer'
  },
  rowSpan: {
    display : 'inline-block',
  },
  deltaSpan : {
    marginLeft : '5px',
    fontWeight : 'bold'
  },
  dateSpan : {
    marginLeft: '10px'
  },
  up : {
    color: '#4CAF50'
  },
  down : {
    //color: '#ED5813'
    color : '#F44336'
  },
  equal : {
    color : '#2F7ED8'
  },
  showHide : {
    position: 'absolute',
    top: '0px',
    left: '0px',
    zIndex: 20
  }
}

class ValueMovingBadge extends Component {
  static propTypes = {
    valueMoving: PropTypes.shape({
      value: PropTypes.number,
      delta: PropTypes.number,
      percent: PropTypes.number,
      direction: PropTypes.oneOf('up', 'down', 'equal'),
      date: PropTypes.string
    }),
    isAdminMode: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool
    ]),
    crValueMoving: PropTypes.func
  }
  static defaultProps = {
    valueMoving : {
      value : 0,
      delta : 0,
      percent : 0,
      direction : Direction.EQUAL,
      date : ''
    }
  }


  constructor(props){
    super()
    this.state = {
      isShowPanel : false,
      valueMoving : props.valueMoving
    }
  }

  _handleClickRoot = () => {
    this.setState(prev => {
      return {
        isShowPanel: !prev.isShowPanel
      };
    })
  }

  _updateDateTo = (dateTo) => {
    const valueMoving = this.props.crValueMoving(this.state.valueMoving, dateTo)
    if (valueMoving) {
      this.setState({ valueMoving })
      return true;
    } else {
      return false;
    }
  }

  render(){
    const { isAdminMode } = this.props
        , { isShowPanel, valueMoving, msgDateTo } = this.state
        , { value, delta, percent, direction, date } = valueMoving;

    let _svgDirection, _dStyle;
    if (direction === Direction.DOWN){
      _svgDirection = <SvgDown />;
      _dStyle = styles.down;
    } else if (direction === Direction.UP){
      _svgDirection = <SvgUp />;
      _dStyle = styles.up;
    } else {
      _svgDirection = <SvgEqual />;
      _dStyle = styles.equal;
    }

    return (
      <span
         style={styles.rootSpan}
      >
         <span
            style={styles.rowSpan}
            onClick={this._handleClickRoot}
         >
           <SpanValue value={value} />
           {_svgDirection}
           <span style={Object.assign({}, styles.deltaSpan, _dStyle)}>
             {percent}
           </span>
           <span style={Object.assign({}, styles.deltaSpan, _dStyle)}>
             {delta}
           </span>
           <SpanDate style={styles.dateSpan} date={date} />
         </span>
         <ShowHide
            style={styles.showHide}
            isShow={isShowPanel}
         >
           <PanelValueMoving
              valueMoving={valueMoving}
              isAdminMode={isAdminMode}
              msgDateTo={msgDateTo}
              updateDateTo={this._updateDateTo}
           />
         </ShowHide>
      </span>
    );
  }
}

export default ValueMovingBadge
