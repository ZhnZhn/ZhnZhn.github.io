import { bindTo } from '../uiApi';
import {
  CL_CHB_BLACK,
  CL_BLACK
} from '../styleFn';

import getFnByPropName from '../../utils/getFnByPropName';
import RowCheckBox1 from '../dialogs/rows/RowCheckBox1';

const OptionCheckBoxStack = ({
  data,
  configs
}) => {
 const _hMode = (
   fnName,
   mode
 ) => getFnByPropName(data, fnName)(mode);
 return configs.map(([caption, id]) => (
    <RowCheckBox1
      key={caption}
      caption={caption}
      initialValue={getFnByPropName(data, id, false)()}
      chbCn={CL_CHB_BLACK}
      btCn={CL_BLACK}
      onCheck={bindTo(_hMode, id, true)}
      onUnCheck={bindTo(_hMode, id, false)}
    />
 ));
}

export default OptionCheckBoxStack
