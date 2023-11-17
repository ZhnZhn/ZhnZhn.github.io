import ItemStack from '../zhn/ItemStack';

const _crItem = (
  item,
  index, {
    selectedIndex,
    className,
    refOptionNode,
    onClick,
    propCaption,
    ItemComp
  }
) => (
  /*eslint-disable jsx-a11y/click-events-have-key-events*/
  <div
    role="option"
    aria-selected={selectedIndex === index}
    tabIndex="-1"
    key={index}
    className={className}
    ref={n => refOptionNode(n, index)}
    onClick={() => onClick(item, index)}
  >
    <ItemComp
       item={item}
       propCaption={propCaption}
    />
  </div>
  /*eslint-enable jsx-a11y/click-events-have-key-events*/
);

const OptionList = ({
  options,
  ...restProps
}) => (
  <ItemStack
    items={options}
    crItem={_crItem}
    {...restProps}
  />
);

 export default OptionList
