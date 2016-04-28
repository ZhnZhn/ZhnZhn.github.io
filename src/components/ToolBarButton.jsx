import React from 'react';


const ToolBarButton = React.createClass({
  render(){

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
