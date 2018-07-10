import React, { Component } from 'react'
//import PropTypes from 'prop-types'

class CellColor extends Component {
  /*
  static propTypes = {
    style: PropTypes.object,
    color: PropTypes.string,
    onClick: PropTypes.func,
    onReg: PropTypes.func
  }
  */

  componentDidMount(){
     const { onReg } = this.props;
     if (typeof onReg === 'function') {
       onReg(this.cellNode)
     }
  }

  _refCellNode = node => this.cellNode = node

  render(){
    const {
            style, color,
            onClick,
            children
          } = this.props
        , _styleColor = color
             ? { backgroundColor: color }
             : undefined
        , _onClick = onClick
              ? onClick.bind(null, color)
              : undefined;
    return (
      <span
         style={{ ...style, ..._styleColor}}
         ref={this._refCellNode}
         onClick={_onClick}
      >
         {children}
      </span>
    );
  }
}

export default CellColor
