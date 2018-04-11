import React from 'react';
//import PropTypes from "prop-types";

import withTheme from '../hoc/withTheme'

import SvgCheckBox from '../zhn/SvgCheckBox';
import SvgClose from '../zhn/SvgClose';
import ValueMovingBadge from './ValueMovingBadge';

const TH_ID = 'ELEMENT';
const CL = 'not-selected shadow-right';

const S = {
  ROOT: {
    backgroundColor: '#1b2836',
    paddingTop: '4px',
    paddingRight: '42px',
    height: 'auto',
    width: '100%',
    borderTopRightRadius: '2px',
    borderBottomRightRadius: '2px'
  },
  CHECK_BOX: {
    //float: 'left',
    marginRight: '10px',
    marginLeft: '10px'
  },
  CAPTION_OPEN : {
    textAlign: 'left',
    display : 'inline-block',
    color: 'rgba(164, 135, 212, 1)',
    cursor: 'pointer',
    width: '125px',
    fontWeight : 'bold',
    whiteSpace: 'nowrap',
    textOverflow: 'clip',
    overflow: 'hidden'

  },
  CAPTION_CLOSE: {
    color : 'gray'
  },
  CAPTION_WIDTH: {
    textAlign: 'left',
    width: '280px'
  },
  TIME: {
    color : 'rgb(253, 179, 22)',
    fontWeight : 'bold',
    paddingLeft : '16px'
  },
  CLOSE: {
    position: 'absolute',
    right: 0,
    top: '4px'
  }
};

const Header = (props) => {
  const {
          theme,
          isOpen,
          chartType, onCheck, onUnCheck,
          itemCaption, itemTitle, itemTime, onToggle,
          valueMoving, isAdminMode, crValueMoving,
          onClose
        } = props
      , TS = theme.getStyle(TH_ID)
      , _styleIsOpen = isOpen
             ? S.CAPTION_OPEN
             : { ...S.CAPTION_OPEN, ...S.CAPTION_CLOSE }
      , _styleCaption = (valueMoving)
              ? _styleIsOpen
              : { ..._styleIsOpen, ...S.CAPTION_WIDTH }
      , _movingBadgeEl = (valueMoving)
           ? (
              <ValueMovingBadge
                 valueMoving={valueMoving}
                 isAdminMode={isAdminMode}
                 crValueMoving={crValueMoving}
               />
             )
          : null
      , _timeEl = (!valueMoving && itemTime)
           ? (
               <span style={S.TIME}>
                 {itemTime}
               </span>
             )
           : null;

  return (
    <div style={{...S.ROOT, ...TS.ROOT }}>
      <SvgCheckBox
         rootStyle={S.CHECK_BOX}
         chartType={chartType}
         onCheck={onCheck}
         onUnCheck={onUnCheck}
      />
      <button
         className={CL}
         title={itemTitle}
         style={_styleCaption}
         onClick={onToggle}
      >
         {itemCaption}
      </button>
      {_movingBadgeEl}
      {_timeEl}
      <SvgClose
        style={S.CLOSE}
        onClose={onClose}
      />
    </div>
  );
};

/*
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
  isAdminMode: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
  crValueMoving: PropTypes.func,
  onClose : PropTypes.func.isRequired
}
*/

export default withTheme(Header)
