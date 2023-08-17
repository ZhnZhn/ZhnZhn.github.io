import {
  memo,
  cloneElement,
  useState,
  focusElementById
} from '../uiApi';

const S_TABS = { margin: '5px 5px 10px 24px' }
, S_COMPONENTS = {
  width: "100%",
  height: "100%"
}
, S_BLOCK = {
  display: 'block',
  width: "100%",
  height: "100%"
}
, S_NONE = { display: 'none' };

const _crNextId = (
  id,
  childrenLength
) => id === -1
  ? childrenLength - 1
  : id === childrenLength
      ? 0
      : id;

const TabPane = memo(({
  width,
  height,
  children
}) => {
  const [
    selectedTabIndex,
    setSelectedTabIndex
  ] = useState(0)
  , _isSelectedTabIndex = (index) =>
      index === selectedTabIndex

  , _childrenLength = children.length
  , _hKeyDown = (index, evt) => {
      const _focusTabByIndex = (tabIndex) => {
        const _nextIndex = _crNextId(tabIndex, _childrenLength);
        focusElementById(`tab-${_nextIndex}`)
        setSelectedTabIndex(_nextIndex)
      }

      const { keyCode } = evt;
      if (keyCode === 39) {
        _focusTabByIndex(index + 1)
      }
      if (keyCode === 37) {
        _focusTabByIndex(index - 1)
      }
  };

  return (
    <div style={{ width, height }}>
      <div style={S_TABS}>
         {children.map((tab, index) => cloneElement(tab, {
             key: index,
             id: index,
             isSelected: _isSelectedTabIndex(index),
             onClick: () => setSelectedTabIndex(index),
             onKeyDown: (evt) => _hKeyDown(index, evt)
          }))}
      </div>
      <div style={S_COMPONENTS}>
         {children.map((tab, index) => {
             const isSelected = _isSelectedTabIndex(index);
             return (
                <div
                  key={index}
                  style={isSelected ? S_BLOCK : S_NONE}
                  role="tabpanel"
                  id={`tabpanel-${index}`}
                  aria-labelledby={`tab-${index}`}
                >
                   {cloneElement(tab.props.children, {
                     isSelected
                   })}
                </div>
             );
         })}
      </div>
    </div>
  );
});

export default TabPane
