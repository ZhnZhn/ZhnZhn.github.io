import D from './DialogCell'

const SelectList = ({
  isShow,
  isShowLabels,
  selectProps,
  refSelect,  
  isShowById,
  hSelect
}) => {
    return selectProps.map(({id, ...restItem}, index) => (
      <D.ShowHide key={id} isShow={isShowById(id)}>
        <D.SelectWithLoad
          //uri, jsonProp, caption, isWithInput
          {...restItem}
          ref={comp => refSelect(id, comp)}
          isShow={isShow}
          isShowLabels={isShowLabels}
          onSelect={item => hSelect(id, index, item)}
        />
      </D.ShowHide>
  ));
};

export default SelectList
