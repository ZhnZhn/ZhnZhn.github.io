import React, { Component } from 'react';

const styles = {
  rootDiv : {
    width: '16px',
    height: '16px',
    display: 'inline-block',
    cursor: 'pointer'
  },
  rootSvg : {
    display: 'inline-block'
  }
}

class SvgCheckBox extends Component {
  constructor(props){
    super();

    const { onCheck, onUnCheck, chartType } = props
        , isOnCheck = (typeof onCheck === 'function') ? true : false
        , isOnUnCheck = (typeof onUnCheck === 'function') ? true : false;

    this.chartType = (chartType) ? chartType : 'Uknown';

    this.state = {
        isChecked: false,
        isOnCheck,
        isOnUnCheck
    }
  }

  _handleClick = () => {
    const {isChecked, isOnCheck, isOnUnCheck} = this.state;
    if (!isChecked && isOnCheck){
      this.props.onCheck(this);
    } else if (isOnUnCheck){
      this.props.onUnCheck(this);
    }
    this.setState({isChecked: !isChecked});
  }

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
           onClick={this._handleClick}
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
  }

  setUnchecked = () => {
    this.setState({ isChecked : false });
  }
}

export default SvgCheckBox
