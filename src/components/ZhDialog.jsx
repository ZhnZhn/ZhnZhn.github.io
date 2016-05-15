import React from 'react';

import SvgClose from './SvgClose.js';
import ToolBarButton from './ToolBarButton.js';

import Interact from '../utils/Interact.js';

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
    //color: 'yellow',
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


const ZhDialog = React.createClass({

  componentDidMount: function(){
     Interact.makeDragable(this.refs['rootDiv']);
  },

  _renderChildren: function(){
    let domChildren = this.props.children.map((component, index) =>{
      return <component key={index} />
    })
    return (
       <div style={{cursor: 'default'}}>
          {domChildren}
       </div>
    )
  },

  _renderCommandButton: function(){
    return (
      <div style={styles.commandDiv}>

        {this.props.commandButtons}

        <ToolBarButton
           type="TypeC"
           caption="Show"
           onClick={this.props.onShowChart}
        />
        <ToolBarButton
           type="TypeC"
           caption="Close"
           onClick={this.props.onClose}
           onTouchStart={this.props.onClose}
        />
      </div>
    );
  },

  render: function(){
    const {
      caption,
      children
    } = this.props;


   /*
   let index = 0
   let childrenWithProps = React.Children.map(this.props.children, function(child) {
           return React.cloneElement(child, {key : index++});
   });
   */

    let styleShow = this.props.isShow ? {display: 'block'} : {display: 'none'};
    let classShow = this.props.isShow ? 'show-popup' : null;

    return (
      <div
           ref="rootDiv"
           className={classShow}
           style={Object.assign({}, styles.rootDiv, styleShow)}
      >

        <div style={styles.captionDiv}>
          <span>{caption}</span>
          <SvgClose onClose={this.props.onClose} />
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
