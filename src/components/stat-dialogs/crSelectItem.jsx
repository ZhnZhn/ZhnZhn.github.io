
import D from '../dialogs/DialogCell';
import { crIsId } from './crIsId';

const S_CAPTION = {
  wordBreak: 'break-word'
};

const crSelectItem = (
  conf,
  index, {
    isShowLabels,
    isRow,
    fSelect
  }
) => {
  const {
    id,
    caption,
    options,
    placeholder
  } = conf
  , _isShow = !isRow[crIsId(id)];
  return (
    <D.ShowHide key={id} isShow={_isShow}>
      <D.RowInputSelect
        isShowLabels={isShowLabels}
        caption={caption}
        captionStyle={S_CAPTION}
        placeholder={placeholder}
        options={options}
        onSelect={fSelect(index)}
      />
    </D.ShowHide>
  );
};

export default crSelectItem
