import React, { Component } from 'react';
//import PropTypes from "prop-types";

import withTheme from '../hoc/withTheme'

import ModalSlider from '../zhn-modal-slider/ModalSlider'
import SvgMore from '../zhn/SvgMore'
import SvgClose from '../zhn/SvgClose'
import FlatButton from '../zhn-m/FlatButton'

import Interact from '../../utils/Interact'

import STYLE from './Dialog.Style'

const TH_ID = 'DRAGGABLE_DIALOG';

const CL = {
  SHOWING: 'show-popup',
  NOT_SELECTED: 'not-selected',
  MENU_MORE: 'popup-menu dialog__menu-more'
};

const S = {
  ...STYLE,
  ROOT_DIV_DRAG: {
    position: 'absolute',
    top: '30px',
    left: '50px',
    zIndex: 10
  },
  BT_MORE: {
    position: 'absolute',
    left: 0
  },
  BT_MORE_SVG: {
    stroke: 'inherit',
    fill: 'inherit'
  },
  CHILDREN_DIV: {
    cursor: 'default'
  }
};

class DraggableDialog extends Component {
  /*
  static propTypes = {
    isShow: PropTypes.bool,
    caption: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    commandButtons: PropTypes.arrayOf(PropTypes.element),
    onShowChart: PropTypes.func,
    onClose: PropTypes.func
  }
  */

  state = {
    isMore: false
  }

  componentDidMount(){
     Interact.makeDragable(this.rootDiv);
  }

  _toggleMore = () => {
    this.setState(prevState => ({
      isMore: !prevState.isMore
    }))
  }

  _renderMenuMore = (menuModel, isMore, TS) => {
    return menuModel && <ModalSlider
      isShow={isMore}
      className={CL.MENU_MORE}
      style={TS.EL_BORDER}
      model={menuModel}
      onClose={this._toggleMore}
    />
  }
  _renderBtMore = (menuModel) => {
    return menuModel && <SvgMore
      style={S.BT_MORE}
      svgStyle={S.BT_MORE_SVG}
      onClick={this._toggleMore}
    />
  }

  _renderCommandButton = (commandButtons, onShowChart, onClose) => {
    return (
      <div style={S.COMMAND_DIV}>
        {commandButtons}
        {
          typeof onShowChart === 'function' &&
          <FlatButton
            rootStyle={S.BT_ROOT}
            caption="Show"
            title="Show Pane Container"
            //accessKey="s"
            onClick={onShowChart}
          />
        }
        <FlatButton
          rootStyle={S.BT_ROOT}
          caption="Close"
          title="Close Draggable Dialog"
          //accessKey="c"
          onClick={onClose}
        />
      </div>
    );
  }

  _refRootDiv = node => this.rootDiv = node

  render(){
    const {
           theme,
           menuModel,
           isShow, caption, children,
           commandButtons,
           onShowChart, onFront, onClose
         } = this.props
        , TS = theme.getStyle(TH_ID)
        , { isMore } = this.state
        , _styleShow = isShow ? S.SHOW : S.HIDE
        , _classShow = isShow ? CL.SHOWING : undefined;
    return (
      <div
        ref={this._refRootDiv}
        role="dialog"
        className={_classShow}
        style={{
          ...S.ROOT_DIV, ...S.ROOT_DIV_DRAG,
          ..._styleShow,
          ...TS.ROOT, ...TS.EL_BORDER
        }}
        onClick={onFront}
       >
        <div style={{...S.CAPTION_DIV, ...TS.EL}}>
          { this._renderMenuMore(menuModel, isMore, TS) }
          { this._renderBtMore(menuModel) }
          <span className={CL.NOT_SELECTED}>
            {caption}
          </span>
          <SvgClose
             style={S.SVG_CLOSE}
             onClose={onClose}
          />
        </div>
        <div style={S.CHILDREN_DIV}>
           {children}
        </div>
        {this._renderCommandButton(commandButtons, onShowChart, onClose)}
      </div>
    );
  }
}

export default withTheme(DraggableDialog)
