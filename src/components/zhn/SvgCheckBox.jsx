import React from 'react';

const styles = {
  rootDiv : {
    width: '16px',
    height: '16px',
    display: 'inline-block'
  },
  rootSvg : {
    display: 'inline-block'
  }
}

const SvgCheckBox = React.createClass({

  getInitialState(){
    const isOnCheck = (typeof this.props.onCheck === 'function') ? true : false;
    const isOnUnCheck = (typeof this.props.onUnCheck === 'function') ? true : false;
    return {
      isChecked: false,
      isOnCheck,
      isOnUnCheck
    }
  },

  _handlerClick(){
    const {isChecked, isOnCheck, isOnUnCheck} = this.state;

    if (!isChecked && isOnCheck){
      this.props.onCheck(this);
    } else if (isOnUnCheck){
      this.props.onUnCheck(this);
    }

    this.setState({isChecked: !isChecked});
  },

  render(){
    const {rootStyle} = this.props;

    let pathChecked;
    if (this.state.isChecked){
      pathChecked = (
          <path
              d="M 2,3 L 8,14 14,3"
              strokeWidth="2"
              stroke="yellow"
              fill="#4D4D4D"
          >
          </path>
      );
    }
    return (
      <div
           style={Object.assign({}, styles.rootDiv, rootStyle)}
           onClick={this._handlerClick}
      >
        <svg viewBox="0 0 16 16" width="100%" height="100%"
             preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
             style={styles.rootSvg}
        >
          <rect
                x="1" y="1"
                height="14" width="14"
                strokeWidth="2" stroke="#777777"
                fill="#4D4D4D" rx="3"
          >
          </rect>
          {pathChecked}
        </svg>

      </div>
    )
  },

  setUnchecked(){
    this.setState({isChecked : false});
  },

})

export default SvgCheckBox;
