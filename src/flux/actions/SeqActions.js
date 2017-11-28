import Store from '../stores/ChartStore'

const C = {
  TIMEOUT: 10000
};

class SeqActions {

  constructor(arr){
    this.arr = arr
    this.max = arr.length - 1
    this.index = 0
    this.unsubscribe = Store.listen(this._onStore.bind(this))
  }

  run() {
    this._timeID = setTimeout(this._clearByTime, C.TIMEOUT)
    this._runStep()
  }

  _clearByTime() {
    if (typeof this.unsubscribe === 'function') {
       this.unsubscribe()
    }
  }
  _clear(){
    clearTimeout(this._timeID)
    this.unsubscribe()
  }

  _runStep() {
    const step = this.arr[this.index];
    step.action(...step.args)
  }

   _onStore(type){
     const step = this.arr[this.index];
     if (type === step.type) {
       if (this.index < this.max) {
         this.index +=1;
         this._runStep()
       } else {
         this._clear()
       }
     }
   }

}

export default SeqActions
