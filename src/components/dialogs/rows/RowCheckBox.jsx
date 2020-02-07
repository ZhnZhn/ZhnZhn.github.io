import React, { Component } from 'react';
//import PropTypes from "prop-types";

import withTheme from '../../hoc/withTheme'

import SvgCheckBox from '../../zhn/SvgCheckBox'

const CL = "bt-chb";
const TH_ID = 'ROW_CHECKBOX';

const CHECKED_COLOR = '#1b2836';

const S = {
  ROOT: {
    paddingTop: 6,
    paddingLeft: 16
  },
  CAPTION: {
    display: 'inline-block',
    color: 'grey',
    paddingLeft: 12,
    fontSize: '16px',
    fontWeight: 'bold',
    userSelect: 'none',
    cursor: 'pointer'
  },
  CHECKED: {
    color: CHECKED_COLOR
  }
};

const _isFn = fn => typeof fn == 'function';
const _isUndefined = v => typeof v === 'undefined';

const _crCheckedStyle = color => ({
  color
});

class RowCheckBox extends Component {
  /*
  static propTypes = {
    rootStyle : PropTypes.object,
    checkedRestStroke: PropTypes.string,
    checkedRestFill: PropTypes.string,
    caption: PropTypes.string,
    styleCheckedCaption: PropTypes.object,
    initValue: PropTypes.bool,
    value: PropTypes.bool,
    onCheck: PropTypes.func,
    onUnCheck: PropTypes.func,
    onToggle: PropTypes.func
  }
  */
  static defaultProps = {
    checkedColor: CHECKED_COLOR
  }

  constructor(props){
    super(props)
    if ( _isUndefined(props.value) ) {
      this.state = {
        isChecked: !!props.initValue
      }
    }
  }

  _hCheck = () => {    
    const { onCheck, onToggle } = this.props;
    if (_isFn(onCheck)){
      onCheck()
    } else if (_isFn(onToggle)) {
      onToggle()
    }
    if (this.state) {
      this.setState({ isChecked: true })
    }
  }
  _hUnCheck = () => {
    const { onUnCheck, onToggle } = this.props;
    if (_isFn(onUnCheck)){
      onUnCheck()
    } else if (_isFn(onToggle)) {
      onToggle()
    }
    if (this.state) {
      this.setState({ isChecked: false })
    }
  }
  _hToggle = () => {
    const _is = this.state
      ? this.state.isChecked
      : this.props.value;
    if (_is) {
      this._hUnCheck()
    } else {
      this._hCheck()
    }
  }

  render(){
    const {
      theme,
      rootStyle,
      checkedColor,
      caption,
      captionStyle,
      value
    } = this.props
    , TS = theme.getStyle(TH_ID)
    , _value = this.state
         ? this.state.isChecked
         : value
    , _style = _value
        ? { ...captionStyle, ..._crCheckedStyle(checkedColor) }
        : captionStyle;
    return (
      <div style={{...S.ROOT, ...rootStyle}}>
        <SvgCheckBox
          value={_value}
          checkedRestStroke={checkedColor}
          checkedRestFill={checkedColor}
          checkedColor={TS.CHECKED_COLOR}
          onCheck={this._hCheck}
          onUnCheck={this._hUnCheck}
        />
        {
          caption && (
            <button
              className={CL}
              tabIndex="-1"
              style={{...S.CAPTION, ..._style }}
              onClick={this._hToggle}
            >
              {caption}
            </button>
          )
        }
      </div>
    );
  }
}

export default withTheme(RowCheckBox)
