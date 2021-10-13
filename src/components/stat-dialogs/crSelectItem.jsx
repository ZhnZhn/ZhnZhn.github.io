
import D from '../dialogs/DialogCell';
import crIsId from './crIsId';

const crSelectItem = (
  conf,
  index, {
    isShowLabels,
    isRow,
    fSelect
  }
) => {
  const { id, caption, options } = conf
  , _isShow = !isRow[crIsId(id)];
  return (
    <D.ShowHide key={id} isShow={_isShow}>
      <D.RowInputSelect
        isShowLabels={isShowLabels}
        caption={caption}
        options={options}
        onSelect={fSelect(index)}
      />
    </D.ShowHide>
  );
};

export default crSelectItem
