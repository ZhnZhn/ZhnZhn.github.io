import getFnByPropName from '../../utils/getFnByPropName';
import RowCheckBox from '../dialogs/rows/RowCheckBox';

const OptionCheckBoxStack = ({
  data,
  configs
}) => {
 const _hMode = (
   fnName,
   mode
 ) => getFnByPropName(data, fnName)(mode);
 return configs.map(([caption, id]) => (
    <RowCheckBox
      key={caption}
      initValue={getFnByPropName(data, id, false)()}
      caption={caption}
      onCheck={_hMode.bind(null, id, true)}
      onUnCheck={_hMode.bind(null, id, false)}
    />
 ));
}

export default OptionCheckBoxStack
