import React, { Component } from 'react';
//import PropTypes from "prop-types";

import { Direction as D } from '../../constants/Type'

import SvgDown from '../zhn/SvgDown'
import SvgUp from '../zhn/SvgUp'
import SvgEqual from '../zhn/SvgEqual'

import SpanValue from '../zhn-span/SpanValue'
import SpanDate from '../zhn-span/SpanDate'
import ModalValueMoving from './ModalValueMoving'

const S = {
  ROOT: {
    position: 'relative',
    display: 'inline-block',
    marginLeft: 10
  },
  DELTA: {
    marginLeft: 5,
    fontWeight: 'bold'
  },
  DATE: {
    marginLeft: 10
  },
  UP: {
    color: '#4caf50'
  },
  DOWN: {
    color: '#f44336'
  },
  EQUAL: {
    color: '#2f7ed8'
  },
  BT: {
    cursor: 'pointer'
  },
  SHOW_HIDE: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 20
  }
};

const _getDirection = (direction) => {
  switch(direction){
    case D.DOWN:
      return {
        _svgDirection: <SvgDown />,
        _dStyle: S.DOWN
      };
    case D.UP:
      return {
        _svgDirection: <SvgUp />,
        _dStyle: S.UP
      };
    case D.EQUAL:
      return {
        _svgDirection: <SvgEqual />,
        _dStyle: S.EQUAL
      };
    default:
      return {
        _svgDirection: null
      };
  }
};

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
    crValueMoving: PropTypes.func,
    regCompVm: PropTypes.func
  }
  */

  static defaultProps = {
    valueMoving: {
      value: 0,
      delta: 0,
      percent: 0,
      direction: D.EQUAL,
      date: ''
    },
    regCompVm: () => {}
  }

  constructor(props){
    super(props)
    this.state = {
      isShowModal : false,
      valueMoving : props.valueMoving
    }
  }

  componentDidMount(){
    this.props.regCompVm(this)
  }

  _hClickBt = () => {
    this.setState(prev => ({
        isShowModal: !prev.isShowModal
    }))
  }
  _hCloseModal = (event) => {
    this.setState({ isShowModal: false })
  }


  _updateDateTo = (dateTo) => {
    const valueMoving = this.props.crValueMoving(this.state.valueMoving, dateTo)    
    if (valueMoving) {
      this.setState({ valueMoving })
      return valueMoving;
    } else {
      return false;
    }
  }


  render(){
    const { isAdminMode } = this.props
    , {
        isShowModal,
        valueMoving,
        msgDateTo
      } = this.state
    , {
        value, delta, percent,
        direction,
        date
      } = valueMoving,
      {
        _svgDirection,
        _dStyle
      } = _getDirection(direction);

    return (
      <span style={S.ROOT}>
         <SpanValue value={value} />
         {_svgDirection}
         <span style={{...S.DELTA, ..._dStyle}}>
           {percent}
         </span>
         <span style={{...S.DELTA, ..._dStyle}}>
           {delta}
         </span>
         <button style = {S.BT} onClick={this._hClickBt} >
           <SpanDate style={S.DATE} date={date} />
         </button>
         {
           _svgDirection !== null && <ModalValueMoving
                isShow={isShowModal}
                onClose={this._hCloseModal}
                valueMoving={valueMoving}
                isAdminMode={isAdminMode}
                msgDateTo={msgDateTo}
                updateDateTo={this._updateDateTo}
             />
         }
      </span>
    );
  }
}

export default ValueMovingBadge
