import useBool from '../hooks/useBool';

import CellColor from './CellColor';
import ModalPalette from './ModalPalette';

const InputColor = ({
  className,
  model,
  color,
  setColor
}) => {
  const [
    _isShowPallete,
    _hOpenPallete,
    _hClosePalette
  ] = useBool(false);
  return (
    <CellColor
       className={className}
       color={color}
       onClick={_hOpenPallete}
    >
      <ModalPalette
         isShow={_isShowPallete}
         model={model}
         onClickCell={setColor}
         onClose={_hClosePalette}
      />
    </CellColor>
  );
};

export default InputColor
