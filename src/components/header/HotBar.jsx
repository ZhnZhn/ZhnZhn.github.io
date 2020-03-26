import React, { Component } from 'react'

import has from '../has'
import FlatButton from '../zhn-m/FlatButton'

const S = {
  ROOT: {
    display: 'inline-block'
  },
  BT_D: {
    color: '#c0c0c0'
  },
  BT_CL: {
    color: '#f44336'
  }
};

const _isIn = (arr, type) => {
  const len = arr.length;
  let i = 0;
  for(;i<len;i++){
    if (arr[i].type === type){
      return true;
    }
  }
  return false;
}

const _calcMaxButtons = (props) => {
  switch(has.strWidth){
    case '"W600"': return 3;
    case '"W500"': return 2;
    case '"W380"': return 1;
    default: return props.maxButtons;
  }
};

class HotBar extends Component {
  static defaultProps = {
    maxButtons: 5
  }

  constructor(props){
    super(props)
    this._btCleanEl = (
      <FlatButton
        key="BT_CLEAN"
        timeout={0}
        rootStyle={S.BT_CL}
        caption="CL"
        title="Clean Hot Bar"
        onClick={this._hClean}
      />
    )
    this._maxButtons = _calcMaxButtons(props)
    this.state = {
      countButtons: 0,
      hotButtons: []
    }
  }

  componentDidMount(){
    const { store } = this.props;
    this.unsubscribe = store.listen(this._onStore)
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  _onStore = (actionType, option) => {
    const { closeDialogAction } = this.props;
    if (actionType === closeDialogAction ) {
      this.setState(prevState => {
        const { hotButtons, countButtons } = prevState;
        if (!_isIn(hotButtons, option.type)) {
          hotButtons[countButtons % this._maxButtons] = option
          prevState.countButtons += 1
        }
        return prevState;
      })
    }
  }

  _hClean = () => {
    this.setState({
      countButtons: 0,
      hotButtons: []
    })
  }

  _renderHotButtons = (hotButtons, onShowDialog) => {
    return hotButtons.map((conf, index) => {
      const { type, caption='' } = conf
      , _accessKey = (index+1).toString()
      , _shortCaption = _accessKey + caption.substr(0, 3);
      return (
        <FlatButton
          key={type}
          timeout={0}
          rootStyle={S.BT_D}
          caption={_shortCaption}
          title={caption}
          accessKey={_accessKey}
          onClick={onShowDialog.bind(null, type)}
        />
      );
    })
  }

  render(){
    const { onShowDialog } = this.props
        , { hotButtons } = this.state
        , _cleanBtEl = (hotButtons.length !== 0)
             ? this._btCleanEl
             : null;
    return (
      <div style={S.ROOT}>
        {this._renderHotButtons(hotButtons, onShowDialog)}
        {_cleanBtEl}
      </div>
    );
  }
}

export default HotBar
