import React, { Component } from 'react'

const S = {
  ROOT: {
    display: 'inline-block',
    cursor: 'pointer'
  }
};

class SpanButton extends Component {

  _hKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === " ") {
      event.preventDefault()
      this.props.onClick()
    }
  }

  render(){
    const {
            style, caption='',
            onClick,
            ...rest
          } = this.props;
    return (
      <span
         role="button"
         tabIndex="0"
         style={{ ...S.ROOT, ...style }}
         onClick={onClick}
         onKeyDown={this._hKeyDown}
         {...rest}
      >
         {caption}
      </span>
    );
  }
}

export default SpanButton
