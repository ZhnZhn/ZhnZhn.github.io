
class BatchActions {
  constructor(arr) {
    this.arr = arr
  }

  run(){
    this.arr.forEach(item => {
      const { action, args } = item;
      action(...args)
    })
  }
}

export default BatchActions
