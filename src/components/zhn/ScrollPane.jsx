import React from 'react';

const ScrollPane = React.createClass({
  render(){
    const {style, className="", children} = this.props;
    return (
      <div className={`with-scroll ${className}`} style={style}>
         {children}
      </div>
    )
  }
});

export default ScrollPane
