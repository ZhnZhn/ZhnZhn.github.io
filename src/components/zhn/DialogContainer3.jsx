import React from 'react';

const styles = {
  rootDiv: {
    zIndex : 30,
    position: 'absolute',
    top: '70px',
    left: '10px',
    width: '99%'
  }
};

const getObjToFirst = function(arr, keyValue){
  let index;
  for (var i=0, max=arr.length; i<max; i++){
    if (arr[i].key === keyValue){
      index = i;
      break;
    }
  }
  return [...arr.slice(0, index), ...arr.slice(index+1), arr[index]]
}


const DialogContainer3 = React.createClass({
  getInitialState: function(){
    this._activeDialogs = [];
    return {
      dialog: {},
      compDialogs : []
    }
  },

   componentWillMount: function(){
     this.unsubscribe = this.props.store.listen(this._onStore);
   },

   componentWillUnmount: function(){
     this.unsubscribe();
   },

   _checkActiveDialogs(dialogType){
     this._activeDialogs.push(dialogType);
     if (this._activeDialogs.length > this.props.maxDialog){
       this.state.dialog[this._activeDialogs[0]] = false;
       this._activeDialogs = this._activeDialogs.slice(1);
     }
   },
   filterActiveDialogs(dialogType){
     this._activeDialogs = this._activeDialogs.filter((value) => {
         return value !== dialogType;
     })
   },

   _onStore: function(actionType, data){
      const {initAction, showAction} = this.props;
      if (actionType === showAction){

         if (!this.state.dialog[data]){
            this.state.dialog[data] = true;
            this._checkActiveDialogs(data);
         }
         this.state.compDialogs = getObjToFirst(this.state.compDialogs, data);
         this.setState(this.state);

      } else if (actionType === initAction) {

         this.state.dialog[data.dialogType] = true;
         this.state.compDialogs.push(data.dialogComp);
         this._checkActiveDialogs(data.dialogType);
         this.setState(this.state);

      }
   },

  _handlerToggleDialog: function(dialogType){
    const {dialog} = this.state;
    dialog[dialogType] = !dialog[dialogType];
    this.setState(this.state);

    if (!dialog[dialogType]) {
      this.filterActiveDialogs(dialogType);
      document.getElementsByTagName('html')[0].style.cursor = '';
    }
  },

  _renderDialogs(){
    const {dialog, compDialogs} = this.state;
    return compDialogs.map((compDialog, index) => {
       return React.cloneElement(compDialog,
          {
             key : compDialog.key,
             isShow  : dialog[compDialog.key],
             onClose : this._handlerToggleDialog.bind(this, compDialog.key)
          });
    })
  },

  render(){
    return (
      <div style={styles.rootDiv}>
        {this._renderDialogs()}
      </div>
    );
  }

});

export default DialogContainer3;
