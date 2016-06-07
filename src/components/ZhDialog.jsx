import React from 'react';

import SvgClose from './SvgClose';
import ToolBarButton from './ToolBarButton';

import Interact from '../utils/Interact';

const styles = {
  rootDiv: {
    position: 'absolute',
    top: '30px',
    left: '50px',
    backgroundColor: '#4D4D4D',
    border: 'solid 2px #232F3B',
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 6px',
    zIndex: 10,
  },
  captionDiv:{
    padding: '5px',
    color: 'rgba(164, 135, 212,1)',
    backgroundColor: '#232F3B',
    textAlign: 'center',
    fontSize: '18px',
  },
  commandDiv : {
     cursor: 'default',
     float: 'right',
     marginTop: '8px',
     marginBottom: '10px',
     marginRight: '4px'
  }
};


const ZhDialog = React.createClass({

  componentDidMount(){
     Interact.makeDragable(this.domRootDiv);
  },

  _renderCommandButton(){
    const {commandButtons, onShowChart, onClose} = this.props;
    return (
      <div style={styles.commandDiv}>

        {commandButtons}

        <ToolBarButton
           type="TypeC"
           caption="Show"
           onClick={onShowChart}
        />
        <ToolBarButton
           type="TypeC"
           caption="Close"
           onClick={onClose}
        />
      </div>
    );
  },

  render(){
    const { isShow, caption, children, onClose} = this.props
        , _styleShow = isShow ? {display: 'block'} : {display: 'none'}
        , _classShow = isShow ? 'show-popup' : null;

    return (
      <div
           ref={c => this.domRootDiv = c}
           className={_classShow}
           style={Object.assign({}, styles.rootDiv, _styleShow)}
      >
        <div style={styles.captionDiv}>
          <span>{caption}</span>
          <SvgClose onClose={onClose} />
        </div>
        <div style={{cursor: 'default'}}>
           {children}
        </div>
        {this._renderCommandButton()}
      </div>
    );
  }
});

export default ZhDialog;
