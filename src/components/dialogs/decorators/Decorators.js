
import withForDate from './withForDate'
import withToolbar from './withToolbar'
import withValidationLoad from './withValidationLoad'
import withLoad from './withLoad'
import withInitialState from './withInitialState'

const Decorators = {
  dialog: (target) => {
    withToolbar(target)
    withValidationLoad(target)
    withLoad(target)
    withInitialState(target)
  },
  withForDate,

  withToolbar,
  withValidationLoad,
  withLoad,
  withInitialState
};

export default Decorators
