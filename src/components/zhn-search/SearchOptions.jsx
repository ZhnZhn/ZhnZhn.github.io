import { useState, useRef, useEffect } from 'react';

import ShowHide from '../zhn/ShowHide';
import ItemStack from '../zhn/ItemStack';

const CL_ROOT = 'zhn-search__options'
, CL_OPTIONS = 'zhn-search__options__div'
, CL_ITEM = 'zhn-search__row'
, CL_FOOTER = 'zhn-search__footer'
, S_OPTIONS = { width: 250 }
, S_BOLD = { fontWeight: 'bold' }
, S_FOOTER = {
  color: 'black',
  width: 250,
  height: 32,
  padding: '4px 0 4px 10px',
  fontWeight: 'bold'
};

const BoldSpan = ({ text='' }) => <span style={S_BOLD}>{text}</span>;
const Delimeter = () => <span>{` - `}</span>;
const Span = ({ text='' }) => <span>{text}</span>;

const Item = ({
  item,
  onClick,
  onFocus
}) => {
  const { value, name, type, region, currency } = item;
  return(
  <button
    className={CL_ITEM}
    onClick={onClick}
    onFocus={onFocus}
  >
    <BoldSpan text={value} />
    <Delimeter />
    <Span text={name} />
    <Delimeter />
    <BoldSpan text={type} />
    <Delimeter />
    <Span text={region} />
    <Delimeter />
    <BoldSpan text={currency} />
  </button>
  );
}

const _crItem = (
  item,
  index, {
    onClick,
    onFocus
  }
) => (
  <Item
    key={item.value+index}
    item={item}
    onClick={onClick.bind(null, item.value)}
    onFocus={onFocus.bind(null, index+1)}
  />
);

const SearchOptions = ({
  isShow,
  options,
  onClickItem
}) => {
  const refRecentItem = useRef()
  , [itemIndex, setItemIndex] = useState('')
  , _onFocusItem = (index, event) => {
    refRecentItem.current = event.target
    setItemIndex(index)
  };

  useEffect(()=>{
    refRecentItem.current = null
    setItemIndex('')
  }, [options])
  useEffect(()=>{
    if (isShow && refRecentItem.current) {
      refRecentItem.current.focus()
    }
  }, [isShow])

  const _total = options.length || '';

  return (
    <ShowHide
      isShow={isShow}
      className={CL_ROOT}
      style={S_OPTIONS}
      withoutAnimation={true}
    >
      <div className={CL_OPTIONS} style={S_OPTIONS}>
        <ItemStack
          items={options}
          crItem={_crItem}
          onClick={onClickItem}
          onFocus={_onFocusItem}
        />
      </div>
      <div className={CL_FOOTER} style={S_FOOTER}>
        <span>{itemIndex}:</span>
        <span>{_total}</span>
      </div>
    </ShowHide>
  );
};

export default SearchOptions
