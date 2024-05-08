import RowCaptionInput from './RowCaptionInput';
import SeriaConfigs from './SeriaConfigs';

const RowType2 = ({
  refEl,
  caption,
  initValue,
  configs,
  onAdd,
  onRemove
}) => (
  <>
    <RowCaptionInput
      refEl={refEl}
      caption={caption}
      initValue={initValue}
      onAdd={onAdd}
    />
    <SeriaConfigs
      configs={configs}
      onRemove={onRemove}
    />
  </>
);

export default RowType2
