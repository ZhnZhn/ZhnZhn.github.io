import React, { Component } from 'react'

class CellColor extends Component {

  componentDidMount(){
     const { onReg } = this.props;
     if (typeof onReg === 'function') {
       onReg(this.cellNode)
     }
  }

  render(){
    const { style, color, onClick, children } = this.props
        , _styleColor = color
             ? { backgroundColor: color }
             : undefined;
    return (
      <span
         style={{ ...style, ..._styleColor}}
         ref={ node => this.cellNode = node}
         onClick={onClick}
      >
         {children}
      </span>
    );
  }
}

export default CellColor
