import React from 'react';

const ScrollPane = React.createClass({
  render(){
    const {style, children} = this.props;
    return (
      <div className="with-scroll" style={style}>
         {children}
      </div>
    )
  }
});

export default ScrollPane
