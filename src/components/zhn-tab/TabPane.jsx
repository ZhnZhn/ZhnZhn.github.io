import {
  cloneElement,
  useState
} from 'react';

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
, S_NONE = { display: 'none'};


const TabPane = ({
  width,
  height,
  children
}) => {
  const [
    selectedTabIndex,
    setSelectedTabIndex
  ] = useState(0)
  , _isSelectedTabIndex = index =>
      index === selectedTabIndex;

  return (
    <div style={{ width, height }}>
      <div style={S_TABS}>
         {children.map((tab, index) => cloneElement(tab, {
             key: index,
             id: index,
             onClick: () => setSelectedTabIndex(index),
             isSelected: _isSelectedTabIndex(index)
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
};

export default TabPane
