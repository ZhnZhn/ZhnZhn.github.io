import React, { Component, PropTypes } from 'react'

import SvgClose from '../zhn/SvgClose'
import FlatButton from '../zhn-m/FlatButton'

import Interact from '../../utils/Interact'

const styles = {
  rootDiv: {
    position: 'absolute',
    top: '30px',
    left: '50px',
    backgroundColor: '#4D4D4D',
    border: 'solid 2px #232F3B',
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 6px',
    zIndex: 10
  },
  captionDiv:{
    padding: '5px',
    color: 'rgba(164, 135, 212,1)',
    backgroundColor: '#232F3B',
    textAlign: 'center',
    fontSize: '18px'
  },
  childrenDiv : {
    cursor : 'default'
  },
  commandDiv : {
     cursor: 'default',
     float: 'right',
     marginTop: '8px',
     marginBottom: '10px',
     marginRight: '4px'
  },
  btRoot: {
    color: 'rgb(35, 47, 59)'
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
      <div style={styles.commandDiv}>
        {commandButtons}
        {typeof onShowChart === 'function' &&
          <FlatButton
            rootStyle={styles.btRoot}
            caption="Show"
            title="Show Pane Container"
            //accessKey="s"
            onClick={onShowChart}
          />
        }
        <FlatButton
          rootStyle={styles.btRoot}
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
           isShow, caption, children, commandButtons,
           onShowChart, onFront, onClose
         } = this.props
        , _styleShow = isShow ? {display: 'block'} : {display: 'none'}
        , _classShow = isShow ? 'show-popup' : undefined;
    return (
      <div
           ref={c => this.rootDivEl = c}
           className={_classShow}
           style={Object.assign({}, styles.rootDiv, _styleShow)}
           onClick={onFront}
      >
        <div style={styles.captionDiv}>
          <span className="not-selected">
            {caption}
          </span>
          <SvgClose onClose={onClose} />
        </div>
        <div style={styles.childrenDiv}>
           {children}
        </div>
        {this._renderCommandButton(commandButtons, onShowChart, onClose)}
      </div>
    );
  }
}

export default DraggableDialog
