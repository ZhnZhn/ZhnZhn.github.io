import React from 'react';

import SvgClose from '../SvgClose.js';
import ToolBarButton from '../ToolBarButton.js';

const styles = {
  rootDiv: {
    position: 'absolute',
    top: '20%',
    left: '40%',
    display: 'block',
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
  rowDiv: {
    margin: '5px'
  },
  labelSpan : {
    color: '#1B75BB',
    display: 'inline-block',
    textAlign: 'right',
    width: '90px'
  },
  commandDiv : {
     cursor: 'default',
     float: 'right',
     marginTop: '8px',
     marginBottom: '10px',
     marginRight: '4px'
  },
  inputText: {
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    height: '30px',
    paddingLeft: '10px',
    color: 'green'
  },
};


const ModalDialog = React.createClass({

  _handlerClickDialog(event){
    event.stopPropagation();
  },

  _renderCommandButton: function(){
    const {commandButtons, onClose} = this.props;
    return (
      <div style={styles.commandDiv}>
        {commandButtons}
        <ToolBarButton
           type="TypeC"
           caption="Close"
           onClick={onClose}
        />
      </div>
    );
  },

  render: function(){
    const {
      caption,
      isShow,
      children,
      onClose
    } = this.props;

    const _rootStyle = isShow ? {display: 'block'} : {display: 'none'};

    return (
      <div className="modal-root" style={_rootStyle} onClick={onClose}>
         <div
             ref="rootDiv"
             className="show-popup"
             style={styles.rootDiv}
             onClick={this._handlerClickDialog}
         >
              <div style={styles.captionDiv}>
                 <span>{caption}</span>
                 <SvgClose onClose={onClose} />
              </div>

             <div>
               {children}
             </div>

            {this._renderCommandButton()}

        </div>
      </div>
    );
  }
});

export default ModalDialog;
