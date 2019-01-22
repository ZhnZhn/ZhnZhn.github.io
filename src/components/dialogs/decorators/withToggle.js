
const _toggleStateByWithToggle = function(propName){
  this.setState(prevState => ({
    [propName]: !prevState[propName]
  }))
}

const withToggle = target => {
  if (!target.prototype._toggleStateByWithToggle) {
    Object.assign(target.prototype, {
      _toggleStateByWithToggle
    })
  }
}

export default withToggle
