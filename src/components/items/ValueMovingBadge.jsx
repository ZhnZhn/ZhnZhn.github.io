import React, { Component } from 'react';
//import PropTypes from "prop-types";

import { Direction } from '../../constants/Type'

import SvgDown from '../zhn/SvgDown'
import SvgUp from '../zhn/SvgUp'
import SvgEqual from '../zhn/SvgEqual'
import ShowHide from '../zhn/ShowHide'

import SpanValue from '../zhn-span/SpanValue'
import SpanDate from '../zhn-span/SpanDate'
import PanelValueMoving from './PanelValueMoving'

const S = {
  ROOT: {
    display : 'inline-block',
    position: 'relative',
    marginLeft : '10px',
    cursor: 'pointer'
  },
  ROW: {
    display : 'inline-block',
  },
  DELTA: {
    marginLeft : '5px',
    fontWeight : 'bold'
  },
  DATE: {
    marginLeft: '10px'
  },
  UP: {
    color: '#4CAF50'
  },
  DOWN: {
    //color: '#ED5813'
    color : '#F44336'
  },
  EQUAL: {
    color : '#2F7ED8'
  },
  SHOW_HIDE: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    zIndex: 20
  }
}

class ValueMovingBadge extends Component {
  /*
  static propTypes = {
    valueMoving: PropTypes.shape({
      value: PropTypes.number,
      delta: PropTypes.number,
      percent: PropTypes.number,
      direction: PropTypes.oneOf(
        'up', 'down', 'equal', 'empty'
      ),
      date: PropTypes.string
    }),
    isAdminMode: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool
    ]),
    crValueMoving: PropTypes.func
  }
  */
  
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
        , {
            isShowPanel,
            valueMoving,
            msgDateTo
          } = this.state
        , {
            value, delta, percent,
            direction,
            date
          } = valueMoving;

    let _svgDirection, _dStyle;
    switch(direction){
      case Direction.DOWN:
        _svgDirection = <SvgDown />;
        _dStyle = S.DOWN;
        break;
      case Direction.UP:
        _svgDirection = <SvgUp />;
        _dStyle = S.UP;
        break;
      case Direction.EQUAL:
        _svgDirection = <SvgEqual />;
        _dStyle = S.EQUAL;
        break;
      default:
        _svgDirection = null;
    }

    return (
      <span
         style={S.ROOT}
      >
         <span
            style={S.ROW}
            onClick={this._handleClickRoot}
         >
           <SpanValue value={value} />
           {_svgDirection}
           <span style={{...S.DELTA, ..._dStyle}}>
             {percent}
           </span>
           <span style={{...S.DELTA, ..._dStyle}}>
             {delta}
           </span>
           <SpanDate style={S.DATE} date={date} />
         </span>
         {
           _svgDirection !== null &&
           <ShowHide
              style={S.SHOW_HIDE}
              isShow={isShowPanel}
           >
             <PanelValueMoving
                valueMoving={valueMoving}
                isAdminMode={isAdminMode}
                msgDateTo={msgDateTo}
                updateDateTo={this._updateDateTo}
             />
           </ShowHide>
         }
      </span>
    );
  }
}

export default ValueMovingBadge
