import React, { Component } from 'react';

class ScrollPane extends Component {
  render(){
    const { style, className="", children } = this.props;
    return (
      <div
        ref={ node => this.rootNode = node}
        className={`with-scroll ${className}`}
        style={style}
      >
         {children}
      </div>
    );
  }

  scrollTop(){
    this.rootNode.scrollTop = 0
  }
}

export default ScrollPane
