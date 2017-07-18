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
  let index
    , max = arr.length
    , i;
  for (i=0; i<max; i++){
    if (arr[i].key === keyValue){
      index = i
      break;
    }
  }
  return [ ...arr.slice(0, index), ...arr.slice(index+1), arr[index] ];
}

const _updateVisible = (state, key, maxDialog) => {
  const { hmIs } = state;
  if (!hmIs[key]){
    let { visibleDialogs } = state;
    hmIs[key] = true
    visibleDialogs.push(key)
    if (visibleDialogs.length > maxDialog){
      hmIs[visibleDialogs[0]] = false
      visibleDialogs = visibleDialogs.slice(1)
    }
  }
}

class DialogContainer extends Component {
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
        prevState.visibleDialogs = prevState.visibleDialogs.filter(value => {
           return value !== key;
        })
        this.elHtml.style.cursor = ''
      }
      return prevState;
    })
  }

  _renderDialogs = () => {
    const { hmIs, compDialogs, hmData } = this.state;
    return compDialogs.map(Comp => {
       const key = Comp.key;
       return React.cloneElement(Comp, {
             key : key,
             isShow  : hmIs[key],
             optionData: hmData[key],
             onClose : this._handleToggleDialog.bind(this, key)
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
