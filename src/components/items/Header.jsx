import React, { Component, Fragment } from 'react';
//import PropTypes from "prop-types";

import withTheme from '../hoc/withTheme'

import SvgMore from '../zhn/SvgMore'
import ModalSlider from '../zhn-modal-slider/ModalSlider'

import SvgCheckBox from '../zhn/SvgCheckBox';
import SvgClose from '../zhn/SvgClose';
import ValueMovingBadge from './ValueMovingBadge';

const TH_ID = 'ELEMENT';

const CL = 'not-selected shadow-right'
, CL_MORE = "popup-menu charts__menu-more"

const S = {
  ROOT: {
    backgroundColor: '#1b2836',
    height: 'auto',
    width: '100%',
    paddingTop: 4,
    paddingRight: 42,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2
  },
  SVG_MORE: {
    stroke: '#777777',
    fill: '#777777'
  },
  ROOT_MORE: {
    display: 'inline-block'
  },
  CHECK_BOX: {
    marginRight: 10,
    marginLeft: 10
  },
  CAPTION_OPEN : {
    display : 'inline-block',
    color: 'rgba(164, 135, 212, 1)',
    width: 125,
    textAlign: 'left',
    fontWeight : 'bold',
    whiteSpace: 'nowrap',
    textOverflow: 'clip',
    overflow: 'hidden',
    cursor: 'pointer'
  },
  CAPTION_CLOSE: {
    color: 'gray'
  },
  CAPTION_WIDTH: {
    width: 280,
    textAlign: 'left'
  },
  TIME: {
    color : 'rgb(253, 179, 22)',
    paddingLeft : 16,
    fontWeight : 'bold'
  },
  CLOSE: {
    position: 'absolute',
    right: 0,
    top: 4
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
    if (!moreModel) { return null; }
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
        onCheck, onUnCheck,
        itemCaption, itemTitle, itemTime, onToggle,
        valueMoving, isAdminMode, crValueMoving, regCompVm,
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
           style={S.CHECK_BOX}
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
                regCompVm={regCompVm}
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
