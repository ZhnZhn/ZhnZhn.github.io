import has from '../../has'

const _isWithInitialState = () => {
  const _isWideWidth = has.wideWidth();
  return {
    isToolbar: true,
    isShowLabels: _isWideWidth,
    isShowDate: _isWideWidth,    
    validationMessages: []
  };
};

const withInitialState = target => {
  Object.assign(target.prototype, {
    _isWithInitialState
  })
};

export default withInitialState
