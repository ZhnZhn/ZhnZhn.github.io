import React, { useState, useRef, useEffect } from 'react'

const CL = {
  ROOT: 'zhn-search__options',
  OPTIONS: 'zhn-search__options__div',
  ITEM: 'zhn-search__row',
  FOOTER: 'zhn-search__footer'
};

const S = {
  HIDE: {
    display: 'none'
  },
  OPTIONS: {
    width: 250
  },
  BOLD: {
    fontWeight: 'bold'
  },
  FOOTER: {
    width: 250,
    height: 32,
    color: 'gray',
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingTop: 4,
    paddingBottom: 4
  }
};

const BoldSpan = ({ text='' }) => <span style={S.BOLD}>{text}</span>;
const Delimeter = () => <span>{` - `}</span>;
const Span = ({ text='' }) => <span>{text}</span>;

const Item = ({ item, onClick, onFocus }) => {
  const { value, name, type, region, currency } = item;
  return(
  <button
    className={CL.ITEM}
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

const SearchOptions = ({ isShow, options, onClickItem }) => {
  const refRecentItem = useRef();
  const [itemIndex, setItemIndex] = useState('');

  const _onFocusItem = (index, event) => {
    refRecentItem.current = event.target
    setItemIndex(index)
  }
  useEffect(()=>{
    refRecentItem.current = null
    setItemIndex('')
  }, [options])
  useEffect(()=>{
    if (isShow && refRecentItem.current) {
      refRecentItem.current.focus()
    }
  }, [isShow])

  const _style = isShow ? null : S.HIDE
  const _total = options.length || '';

  return (
    <div
      className={CL.ROOT}
      style={{ ...S.OPTIONS, ..._style }}
    >
      <div className={CL.OPTIONS} style={S.OPTIONS}>
        {options.map((item, index) => (
          <Item
            key={item.value+index}
            item={item}
            onClick={onClickItem.bind(null, item.value)}
            onFocus={_onFocusItem.bind(null, index+1)}
          />
        ))}
      </div>
      <div className={CL.FOOTER} style={S.FOOTER}>
        <span>{itemIndex}:</span>
        <span>{_total}</span>
      </div>
    </div>
  );
}

export default SearchOptions
