import { bindTo } from '../uiApi';
import { getColorBlack } from '../styleFn';

import getFnByPropName from '../../utils/getFnByPropName';
import RowCheckBox1 from '../dialogs/rows/RowCheckBox1';

const OptionCheckBoxStack = ({
  data,
  configs
}) => {
 const _hMode = (
   fnName,
   mode
 ) => getFnByPropName(data, fnName)(mode)
 , _colorBlack = getColorBlack();
 return configs.map(([caption, id]) => (
    <RowCheckBox1
      key={caption}
      caption={caption}
      initialValue={getFnByPropName(data, id, false)()}
      color={_colorBlack}
      onCheck={bindTo(_hMode, id, true)}
      onUnCheck={bindTo(_hMode, id, false)}
    />
 ));
}

export default OptionCheckBoxStack
