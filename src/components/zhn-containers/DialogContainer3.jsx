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

const getObjToFirst = function(arr, keyValue){
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


class DialogContainer3 extends Component {
  constructor(props){
    super()
    this._activeDialogs = []
    this.elHtml = document.getElementsByTagName('html')[0]
    this.state = {
      dialog: {},
      compDialogs : [],
      optionData: {}
    }
  }

   componentWillMount(){
     this.unsubscribe = this.props.store.listen(this._onStore)
   }
   componentWillUnmount(){
     this.unsubscribe()
   }

   _checkActiveDialogs = (dialogType) => {
     this._activeDialogs.push(dialogType)
     if (this._activeDialogs.length > this.props.maxDialog){
       this.state.dialog[this._activeDialogs[0]] = false
       this._activeDialogs = this._activeDialogs.slice(1)
     }
   }
   filterActiveDialogs = (dialogType) => {
     this._activeDialogs = this._activeDialogs.filter((value) => {
         return value !== dialogType;
     })
   }

   _onStore = (actionType, data) => {
      const { initAction, showAction, showOptionAction } = this.props;
      if (actionType === showAction){
         if (!this.state.dialog[data]){
            this.state.dialog[data] = true
            this._checkActiveDialogs(data)
         }
         this.state.compDialogs = getObjToFirst(this.state.compDialogs, data)
         this.setState(this.state)

      } else if (actionType === initAction) {
         this.state.dialog[data.dialogType] = true
         this.state.compDialogs.push(data.dialogComp)
         this._checkActiveDialogs(data.dialogType)
         this.setState(this.state)
      } else if (actionType === showOptionAction ){
         this.setState(prevState => {
           prevState.dialog[data.dialogType] = true
           prevState.compDialogs.push(data.dialogComp)
           prevState.optionData[data.dialogType] = data
           return prevState;
         })
      }
   }

  _handleToggleDialog = (dialogType) => {
    this.setState(prevState => {
      const { dialog } = prevState;
      dialog[dialogType] = !dialog[dialogType]
      if (!dialog[dialogType]) {
        this.filterActiveDialogs(dialogType)
        this.elHtml.style.cursor = ''
      }
      return prevState;
    })
  }

  _renderDialogs = () => {
    const { dialog, compDialogs, optionData } = this.state;
    return compDialogs.map((compDialog, index) => {
       const _options = optionData[compDialog.key];
       return React.cloneElement(compDialog, {
             key : compDialog.key,
             isShow  : dialog[compDialog.key],
             onClose : this._handleToggleDialog.bind(this, compDialog.key),
             optionData : _options
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

export default DialogContainer3
