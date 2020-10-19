import { cloneElement, Component } from 'react';

const S = {
  ROOT: {
    zIndex: 1030,
    position: 'absolute',
    top: 70,
    left: 10,
    width: '98%'
  }
};

const _findCompIndex = (arr, key) => {
  for (let i=0; i<arr.length; i++){
    if (arr[i].key === key){
      return i;
    }
  }
  return;
};

const _doVisible = function(arr, keyValue){
  const _index = _findCompIndex(arr, keyValue) || 0;
  return [
    ...arr.slice(0, _index),
    ...arr.slice(_index+1),
    arr[_index]
  ];
};

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
};

const _findCompByKey = (comps, key) => {
  const index = _findCompIndex(comps, key);
  return typeof index !== 'undefined'
     ? comps[index]
     : void 0;
};

class DialogContainer extends Component {
  static defaultProps = {
    maxDialog: 3
  }

  state = {
    hmIs: {},
    compDialogs: [],
    hmData: {},
    visibleDialogs: []
  }

   componentDidMount(){
     this.unsubscribe = this.props.store.listen(this._onStore)
   }
   componentWillUnmount(){
     this.unsubscribe()
   }


   componentDidCatch(error, info){
     /*
     console.log(error)
     console.log(info)
     */
   }


   _onStore = (actionType, option) => {
      const { showAction } = this.props;
      if (actionType === showAction){
         this.setState(prevState => {
           const { key, Comp, data } = option
               , { maxDialog } = this.props;
            if (Comp && typeof _findCompIndex(prevState.compDialogs, key) !== 'undefined') {
              return null;
            }
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
    const { hmIs, compDialogs } = this.state;
    if (hmIs[key]){
      const { onCloseDialog } = this.props
          , _Comp = _findCompByKey(compDialogs, key);
      if (typeof onCloseDialog === 'function' && _Comp){
        onCloseDialog(_Comp)
      }
    }

    this.setState(prevState => {
      const { hmIs } = prevState;
      hmIs[key] = !hmIs[key]
      if (!hmIs[key]) {
        const visibleDialogs = prevState.visibleDialogs
            , _keyIndex = visibleDialogs.indexOf(key);
        visibleDialogs.splice(_keyIndex, 1)
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
       return cloneElement(Comp, {
          key: key,
          isShow: hmIs[key],
          optionData: hmData[key],
          onFront: this._handleToFront.bind(this, key),
          onClose: this._handleToggleDialog.bind(this, key)
       });
    });
  }

  render() {
    return (
      <div style={S.ROOT}>
        {this._renderDialogs()}
      </div>
    );
  }
}

export default DialogContainer
