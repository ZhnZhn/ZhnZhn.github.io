import React, { Component, PropTypes } from 'react'

import SvgClose from '../zhn/SvgClose'
import FlatButton from '../zhn-m/FlatButton'

import Interact from '../../utils/Interact'

import STYLE from './Dialog.Style'

const CL = {
  SHOWING: 'show-popup',
  NOT_SELECTED: 'not-selected'
};

const S = {
  ...STYLE,
  ROOT_DIV_DRAG: {
    position: 'absolute',
    top: '30px',
    left: '50px',
    zIndex: 10
  },
  CHILDREN_DIV: {
    cursor: 'default'
  }
};

class DraggableDialog extends Component {
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

  componentDidMount(){
     Interact.makeDragable(this.rootDivEl);
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

  render(){
    const {
           isShow, caption, children,
           commandButtons,
           onShowChart, onFront, onClose
         } = this.props
        , _styleShow = isShow ? S.SHOW : S.HIDE
        , _classShow = isShow ? CL.SHOWING : undefined;
    return (
      <div
           ref={c => this.rootDivEl = c}
           className={_classShow}
           style={{...S.ROOT_DIV, ...S.ROOT_DIV_DRAG, ..._styleShow}}
           onClick={onFront}
      >
        <div style={S.CAPTION_DIV}>
          <span className={CL.NOT_SELECTED}>
            {caption}
          </span>
          <SvgClose onClose={onClose} />
        </div>
        <div style={S.CHILDREN_DIV}>
           {children}
        </div>
        {this._renderCommandButton(commandButtons, onShowChart, onClose)}
      </div>
    );
  }
}

export default DraggableDialog
