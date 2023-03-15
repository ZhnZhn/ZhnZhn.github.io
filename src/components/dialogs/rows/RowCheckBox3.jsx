//import PropTypes from "prop-types";
import { useMemo } from '../../uiApi';

import RowCheckBoxView from './RowCheckBoxView';

const DF_ON_TOGGLE = () => {};

const RowCheckBox3 = ({
  onToggle=DF_ON_TOGGLE,
  ...restProps
}) => {
  const [
    _hCheck,
    _hUnCheck
  ] = useMemo(() => [
    () => {
      onToggle(true)
    },
    () => {
      onToggle(false)
    }
  ], [onToggle]);

  return (
    <RowCheckBoxView
      {...restProps}
      hCheck={_hCheck}
      hUnCheck={_hUnCheck}
    />
  );
};

/*
RowCheckBox.propTypes = {
  style: PropTypes.object,
  caption: PropTypes.string,
  captionStyle: PropTypes.object,
  color: PropTypes.string,
  value: PropTypes.bool,

  onToggle: PropTypes.func
}
*/

export default RowCheckBox3
