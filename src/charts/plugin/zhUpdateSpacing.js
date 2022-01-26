import crSpacingConfig from './crSpacingConfig';

function zhUpdateSpacing(isShow) {
  this.update(crSpacingConfig(this, isShow))
}

export default zhUpdateSpacing
