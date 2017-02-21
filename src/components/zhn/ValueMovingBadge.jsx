import React from 'react';

import {Direction} from '../../constants/Type';

import SvgDown from './SvgDown';
import SvgUp from './SvgUp';
import SvgEqual from './SvgEqual';

const styles = {
  rootSpan : {
    marginLeft : '10px',
    display : 'inline-block'
  },
  valueSpan : {
    color : '#2F7ED8',
    fontWeight : 'bold'
  },
  deltaSpan : {
    marginLeft : '5px',
    fontWeight : 'bold'
  },
  dateSpan : {
    marginLeft: '10px',
    //color : '#2F7ED8',
    color: '#FDB316',
    fontWeight : 'bold'
  },
  up : {
    color: 'green'
  },
  down : {
    color: '#ED5813'
  },
  equal : {
    color : '#2F7ED8'
  }
}

const ValueMovingBadge = (props) => {

    const { value, delta, percent, direction, date } = props.valueMoving;

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
      <span style={styles.rootSpan}>
         <span style={styles.valueSpan}>
            {value}
         </span>
         {_svgDirection}
         <span style={Object.assign({}, styles.deltaSpan, _dStyle)}>
           {percent}
         </span>
         <span style={Object.assign({}, styles.deltaSpan, _dStyle)}>
           {delta}
         </span>
         <span style={styles.dateSpan}>
           {date}
         </span>
      </span>
    )
}

ValueMovingBadge.defaultProps = {
  valueMoving : {
    value : 0,
    delta : 0,
    percent : 0,
    direction : Direction.EQUAL,
    date : ''
  }
}

export default ValueMovingBadge
