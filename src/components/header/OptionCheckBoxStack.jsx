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
      onCheck={_hMode.bind(null, id, true)}
      onUnCheck={_hMode.bind(null, id, false)}
    />
 ));
}

export default OptionCheckBoxStack
