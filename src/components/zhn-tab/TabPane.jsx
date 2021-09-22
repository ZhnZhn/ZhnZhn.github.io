//import PropTypes from "prop-types";
import { cloneElement, forwardRef, useState, useImperativeHandle } from 'react';

const S_TABS = {
  marginTop: 5,
  marginRight: 5,
  marginBottom: 10,
  marginLeft: 24
}, S_BLOCK = {
  display: 'block',
  width: "100%",
  height: "100%"
}, S_NONE = { display: 'none'}
, S_COMPONENTS = {
  width: "100%",
  height: "100%"
};


const _renderTabs = (children, selectedTabIndex, hClickTab) => children
 .map((tab, index) => cloneElement(tab, {
    key: index,
    id: index,
    onClick: () => hClickTab(index),
    isSelected: index === selectedTabIndex
 }));

 const _renderComponents = (children, selectedTabIndex) => children
  .map((tab, index) => {
     const _isSelected = (index === selectedTabIndex)
     , _divStyle = _isSelected ? S_BLOCK : S_NONE;
     return (
        <div
          key={'a'+index}
          style={_divStyle}
          role="tabpanel"
          id={`tabpanel-${index}`}
          aria-labelledby={`tab-${index}`}
        >
           {cloneElement(tab.props.children, {
             isSelected: _isSelected
           })}
        </div>
     );
 });


const TabPane = forwardRef(({
  width,
  height,
  children
}, ref) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  useImperativeHandle(ref, () => ({
    getSelectedTabIndex: () => selectedTabIndex
  }), [selectedTabIndex])

  return (
    <div style={{ width, height }}>
      <div style={S_TABS}>
         {_renderTabs(children, selectedTabIndex, setSelectedTabIndex)}
      </div>
      <div style={S_COMPONENTS}>
         {_renderComponents(children, selectedTabIndex)}
      </div>
    </div>
  );
})

/*
TabPane.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.node)
}
*/

export default TabPane
