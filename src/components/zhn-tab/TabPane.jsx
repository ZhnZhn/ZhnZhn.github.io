import {
  cloneElement,
  useState,
  isBool,
  focusElementById,
  stopDefaultFor
} from '../uiApi';

import {
  S_BLOCK,
  S_NONE
} from '../styleFn';

import {
  crTabCn,
  crTabId,
  crTabPanelId
} from './tabPaneFn';

const S_TABS = {
  margin: '5px 5px 10px 24px'
}
, S_COMPONENTS = {
  width: "100%",
  height: "100%"
}
, S_COMPONENTS_BLOCK = {
  ...S_BLOCK,
  ...S_COMPONENTS
};

const _crNextId = (
  id,
  childrenLength
) => id === -1
  ? childrenLength - 1
  : id === childrenLength
      ? 0
      : id;

const TabPane = ({
  id,
  isShow,
  width,
  height,
  children,
  ...restTapPanelProps
}) => {
  const [
    selectedTabIndex,
    setSelectedTabIndex
  ] = useState(0)
  , _isSelectedTabIndex = (index) =>
      index === selectedTabIndex

  , _hKeyDown = (index, evt) => {
      const _focusTabByIndex = (tabIndex) => {
        const _nextIndex = _crNextId(
          tabIndex,
          children.length
        );
        focusElementById(crTabId(id, _nextIndex))
        setSelectedTabIndex(_nextIndex)
      }

      , { keyCode } = evt
      , _increaseIndexBy = keyCode === 39
         ? 1
         : keyCode === 37
            ? -1
            : 0;
      if (_increaseIndexBy) {
        stopDefaultFor(evt)
        _focusTabByIndex(index + _increaseIndexBy)
      }
  };

  return (
    <div style={{ width, height }}>
      <div style={S_TABS}>
         {children.map((tab, index) => {
            const isSelected = _isSelectedTabIndex(index);
            return cloneElement(tab, {
              key: index,
              isSelected,
              tabId: crTabId(id, index),
              tabPanelId: crTabPanelId(id, index),
              className: crTabCn(isSelected),
              onClick: () => setSelectedTabIndex(index),
              onKeyDown: (evt) => _hKeyDown(index, evt)
           });
        })}
      </div>
      <div style={S_COMPONENTS}>
         {children.map((tab, index) => {
             const _isSelected = _isSelectedTabIndex(index);
             return (
                <div
                  key={index}
                  style={_isSelected ? S_COMPONENTS_BLOCK : S_NONE}
                  role="tabpanel"
                  id={crTabPanelId(id, index)}
                  aria-labelledby={crTabId(id, index)}
                >
                   {cloneElement(tab.props.children, {
                     isVisible: isBool(isShow)
                       ? isShow && _isSelected
                       : _isSelected,
                     ...restTapPanelProps
                   })}
                </div>
             );
         })}
      </div>
    </div>
  );
}

export default TabPane
