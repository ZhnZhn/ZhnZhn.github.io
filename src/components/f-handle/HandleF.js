
const HandleF = {
  set: (propName, value) => {
    return function() {
      this[propName] = value
    };
  },

  reg: (propName) => {
    return function(node) {
      this[propName] = node
    };
  },

  enterTo: (propName) => {
    return function(value) {
      this.setState({ [propName]: value })
    };
  },
  closeTo: (propName) => {
    return function() {
      this.setState({ [propName]: false })
    }
  },

  toggleModalBy: (propName1, propName2) => {
    return function (...args) {
      const event = args[args.length-1];
      if (event && event.target === this[propName2].current) {
        this.setState((prevState) => ({
          [propName1]: !prevState[propName1]
        }))
      }
    };
  }

};

export default HandleF
