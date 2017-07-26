import React, { Component } from 'react';

const S = {
  ROOT: {
    zIndex : 1030,
    position: 'absolute',
    top: '70px',
    left: '10px',
    width: '99%'
  }
};

const _doVisible = function(arr, keyValue){
  let _index, _max = arr.length, i=0;
  for (; i<_max; i++){
    if (arr[i].key === keyValue){
      _index = i
      break;
    }
  }
  return [ ...arr.slice(0, _index), ...arr.slice(_index+1), arr[_index] ];
}

const _updateVisible = (state, key, maxDialog) => {
  const { hmIs, visibleDialogs } = state
      , _keyIndex = visibleDialogs.indexOf(key);
  if (_keyIndex !== -1) {
    visibleDialogs.splice(_keyIndex, 1)
  }
  visibleDialogs.push(key)
  hmIs[key] = true
  if (visibleDialogs.length > maxDialog ){
    hmIs[visibleDialogs[0]] = false
    visibleDialogs.splice(0, 1)
  }
}

class DialogContainer extends Component {
  static defaultProps = {
    maxDialog: 3
  }

  constructor(props){
    super()
    this.elHtml = document.getElementsByTagName('html')[0]
    this.state = {
      hmIs: {},
      compDialogs : [],
      hmData : {},
      visibleDialogs: []
    }
  }

   componentDidMount(){
     this.unsubscribe = this.props.store.listen(this._onStore)
   }
   componentWillUnmount(){
     this.unsubscribe()
   }

   _onStore = (actionType, option) => {
      const { showAction } = this.props;
      if (actionType === showAction){
         this.setState(prevState => {
           const { key, Comp, data } = option
               , { maxDialog } = this.props;
           _updateVisible(prevState, key, maxDialog)
           if (!Comp){
              prevState.compDialogs = _doVisible(prevState.compDialogs, key)
           } else {
              prevState.compDialogs.push(Comp)
           }
           prevState.hmData[key] = data
           return prevState;
         })
      }
   }

  _handleToggleDialog = (key) => {
    this.setState(prevState => {
      const { hmIs } = prevState;
      hmIs[key] = !hmIs[key]
      if (!hmIs[key]) {
        const visibleDialogs = prevState.visibleDialogs
            , _keyIndex = visibleDialogs.indexOf(key);
        visibleDialogs.splice(_keyIndex, 1)
        this.elHtml.style.cursor = ''
      }
      return prevState;
    })
  }

  _handleToFront = (key) => {
    const { visibleDialogs } = this.state;
    if (visibleDialogs[visibleDialogs.length-1] !== key) {
      this.setState(prevState => {
        prevState.compDialogs = _doVisible(prevState.compDialogs, key)
        const visibleDialogs = prevState.visibleDialogs
            , _keyIndex = visibleDialogs.indexOf(key);
        visibleDialogs.splice(_keyIndex, 1)
        visibleDialogs.push(key)
        return prevState;
      })
    }
  }

  _renderDialogs = () => {
    const { hmIs, compDialogs, hmData } = this.state;
    return compDialogs.map(Comp => {
       const key = Comp.key;
       return React.cloneElement(Comp, {
          key: key,
          isShow: hmIs[key],
          optionData: hmData[key],
          onFront: this._handleToFront.bind(this, key),
          onClose: this._handleToggleDialog.bind(this, key)
       });
    });
  }

  render(){
    return (
      <div style={S.ROOT}>
        {this._renderDialogs()}
      </div>
    );
  }
}

export default DialogContainer
