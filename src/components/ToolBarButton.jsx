import React from 'react';

/*
const styles = {
  button : {
    color: 'rgba(235,240,16,1)',
    background: 'linear-gradient(to top, #804000, gray)',
    border: '2px solid #696969',
    padding: '2px 3px',
    borderRadius: '4px',
  },
  buttonTypeA : {
    color: 'rgba(235,240,16,1)',
    background: 'linear-gradient(to top, #222222, gray)',
    border: '2px solid #696969',
    padding: '2px 3px',
    borderRadius: '4px',
  }
};
*/

const ToolBarButton = React.createClass({
  render: function(){
    //let className = this.props.isTypeA ? 'button-type-a' : 'button-type-b';
    let className;

    switch (this.props.type) {
      case 'TypeA': className = 'button-type-a'; break;
      case 'TypeC': className = 'button-type-c'; break;
      default     : className = 'button-type-b';
    }

    return (
      <button
           className={className}
           title={this.props.title}
           onClick={this.props.onClick}
       >
         {this.props.caption}
      </button>
    );
  }
});

export default ToolBarButton;
