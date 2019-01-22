
const _setStateByWithSet = function(propName, value) {
  this.setState({ [propName]: value })
};

const withSet = target => {
  if (!target.prototype._setStateByWithSet) {
    Object.assign(target.prototype, {
      _setStateByWithSet
    })
  }
};

export default withSet
