import { bindTo } from '../uiApi';
import { getFnByPropName } from '../../utils/objFn';

import InputSwitch from '../zhn/InputSwitch';

const S_DIV_OPTIONS = {
  padding: '4px 12px 8px 22px'
}
, S_INPUT_SWITCH = {
  paddingTop: 12
};

const OptionInputSwitchStack = ({
  data,
  configs
}) => {
 const _hMode = (
   fnName,
   mode
 ) => getFnByPropName(data, fnName)(mode);
 return (
   <div style={S_DIV_OPTIONS}>
     {configs.map(([caption, id]) => (
       <InputSwitch
         key={caption}
         style={S_INPUT_SWITCH}
         caption={caption}
         initialValue={getFnByPropName(data, id, !1)()}
         onCheck={bindTo(_hMode, id, !0)}
         onUnCheck={bindTo(_hMode, id, !1)}
       />
     ))}
   </div>
  );
}

export default OptionInputSwitchStack
