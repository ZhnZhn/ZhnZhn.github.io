import React from 'react';


const ToolBarButton = React.createClass({
  render(){
    const { type, style, title, caption, onClick} = this.props;

    let _className;
    switch (type) {
      case 'TypeA': _className = 'button-type-a'; break;
      case 'TypeC': _className = 'button-type-c'; break;
      default     : _className = 'button-type-b';
    }

    return (
      <button
           className={_className}
           style={style}
           title={title}
           onClick={onClick}
       >
         {caption}
      </button>
    );
  }
});

export default ToolBarButton;
