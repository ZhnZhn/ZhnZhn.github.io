import ShowHide from '../zhn/ShowHide';
import RowInputSelect from '../dialogs/rows/RowInputSelect';
import { crIsId } from './crIsId';

const S_CAPTION = {
  wordBreak: 'break-word'
};

const crSelectItem = (
  conf,
  index,
  props
) => (
  <ShowHide
    key={conf.id}
    isShow={!props.isRow[crIsId(conf.id)]}
  >
    <RowInputSelect
      captionStyle={S_CAPTION}
      caption={conf.caption}
      placeholder={conf.placeholder}
      options={conf.options}
      isShowLabels={props.isShowLabels}
      onSelect={props.fSelect(index)}
    />
  </ShowHide>
);

export default crSelectItem
