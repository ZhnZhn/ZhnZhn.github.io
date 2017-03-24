import React, { PropTypes } from 'react';

import SvgCheckBox from '../zhn/SvgCheckBox';
import ValueMovingBadge from '../zhn/ValueMovingBadge';
import SvgClose from '../zhn/SvgClose';

const STYLE = {
  ROOT : {
    backgroundColor: '#232F3B',
    paddingTop: '4px',
    //paddingLeft: '10px',
    lineHeight: 1.8,
    height: '32px',
    width : '100%',
    borderTopRightRadius: '2px',
    borderBottomRightRadius: '2px'
  },
  CHECK_BOX : {
    float: 'left',
    marginRight: '10px',
    marginLeft: '10px'
  },
  CAPTION_OPEN : {
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
  CAPTION_CLOSE : {
    color : 'gray'
  },
  CAPTION_WIDTH : {
    width: '385px'
  },
  TIME : {
    color : 'rgb(253, 179, 22)',
    fontWeight : 'bold',
    paddingLeft : '16px'
  }
}

const Header = (props) => {
  const {
          isOpen,
          chartType, onCheck, onUnCheck,
          itemCaption, itemTitle, itemTime, onToggle,
          valueMoving, onClose
        } = props
      , _styleIsOpen = isOpen
             ? STYLE.CAPTION_OPEN
             : Object.assign({}, STYLE.CAPTION_OPEN, STYLE.CAPTION_CLOSE)
      , _styleCaption = (valueMoving)
              ? _styleIsOpen
              : Object.assign({}, _styleIsOpen, STYLE.CAPTION_WIDTH)
      , _movingBadgeEl = (valueMoving)
           ? (
              <ValueMovingBadge
                valueMoving={valueMoving}
               />
             )
          : undefined
      , _timeEl = (!valueMoving && itemTime)
           ? (
               <span style={STYLE.TIME}>
                 {itemTime}
               </span>
             )
           : undefined;
      
  return (
    <div style={STYLE.ROOT}>
      <SvgCheckBox
         rootStyle={STYLE.CHECK_BOX}
         chartType={chartType}
         onCheck={onCheck}
         onUnCheck={onUnCheck}
      />
      <span
         className="not-selected"
         title={itemTitle}
         style={_styleCaption}
         onClick={onToggle}
      >
         {itemCaption}
      </span>
      {_movingBadgeEl}
      {_timeEl}
      <SvgClose onClose={onClose} />
    </div>
  );
};


Header.propTypes = {
  isOpen : PropTypes.bool.isRequired,
  chartType : PropTypes.string.isRequired,
  onCheck : PropTypes.func.isRequired,
  onUnCheck : PropTypes.func.isRequired,
  itemCaption : PropTypes.string.isRequired,
  itemTitle : PropTypes.string.isRequired,
  itemTime : PropTypes.string,
  onToggle : PropTypes.func.isRequired,
  valueMoving : PropTypes.object,
  onClose : PropTypes.func.isRequired
}


export default Header
