import React, { Component, Fragment } from 'react';
//import PropTypes from "prop-types";

import withTheme from '../hoc/withTheme'

import SvgMore from '../zhn/SvgMore'
import ModalSlider from '../zhn-modal-slider/ModalSlider'

import SvgCheckBox from '../zhn/SvgCheckBox';
import SvgClose from '../zhn/SvgClose';
import ValueMovingBadge from './ValueMovingBadge';

const TH_ID = 'ELEMENT';
const CL = 'not-selected shadow-right';

const CL_MORE = "popup-menu charts__menu-more"

const S = {
  ROOT: {
    backgroundColor: '#1b2836',
    paddingTop: '4px',
    paddingRight: '42px',
    height: 'auto',
    width: '100%',
    borderTopRightRadius: '2px',
    borderBottomRightRadius: '2px',
    'box-shadow': '0 5px 11px 0 rgba(0,0,0,0.18), 0 4px 15px 0 rgba(0,0,0,0.15)'
  },
  SVG_MORE: {
    stroke: '#777777',
    fill: '#777777'
  },
  ROOT_MORE: {
    display: 'inline-block'
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

const ItemTime = ({ itemTime }) => {
  if (!itemTime) return null;
  return (
    <span style={S.TIME}>
      {itemTime}
    </span>
  );
};


class Header extends Component {
  state = {
    isMore: false
  }

  _toggleMore = () => {
    this.setState(prevState => ({
      isMore: !prevState.isMore
    }))
  }

  _renderMore = (moreModel, TS) => {
    if (!moreModel) return null;
    const { isMore } = this.state;
    return (
      <Fragment>
        <SvgMore          
          svgStyle={S.SVG_MORE}
          onClick={this._toggleMore}
        />
        <ModalSlider
          isShow={isMore}
          rootStyle={S.ROOT_MORE}
          className={CL_MORE}
          style={TS.BORDER}
          model={moreModel}
          onClose={this._toggleMore}
        />
      </Fragment>
    );
  }

  render() {
    const {
            theme,
            isOpen,
            //chartType,
            onCheck, onUnCheck,
            itemCaption, itemTitle, itemTime, onToggle,
            valueMoving, isAdminMode, crValueMoving,
            moreModel,
            onClose
          } = this.props
        , TS = theme.getStyle(TH_ID)
        , _openStyle = isOpen
               ? S.CAPTION_OPEN
               : { ...S.CAPTION_OPEN, ...S.CAPTION_CLOSE }
        , _captionStyle = (valueMoving)
                ? _openStyle
                : { ..._openStyle, ...S.CAPTION_WIDTH };

    return (
      <div style={{...S.ROOT, ...TS.ROOT }}>
        { this._renderMore(moreModel, TS) }
        <SvgCheckBox
           rootStyle={S.CHECK_BOX}
           //chartType={chartType}
           onCheck={onCheck}
           onUnCheck={onUnCheck}
        />
        <button
           className={CL}
           title={itemTitle}
           style={_captionStyle}
           onClick={onToggle}
        >
           {itemCaption}
        </button>
        {
          valueMoving
            ? <ValueMovingBadge
                valueMoving={valueMoving}
                isAdminMode={isAdminMode}
                crValueMoving={crValueMoving}
              />
            : <ItemTime
                itemType={itemTime}
              />
        }
        <SvgClose
          style={S.CLOSE}
          onClose={onClose}
        />
      </div>
    );
  }
}

/*
Header.propTypes = {
  isOpen : PropTypes.bool.isRequired,
  chartType : PropTypes.string.isRequired,
  moreModel: PropTypes.object,
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
