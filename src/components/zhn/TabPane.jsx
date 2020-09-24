import React, { useState, useCallback, useImperativeHandle } from 'react';
//import PropTypes from "prop-types";

const S = {
  TABS: {
    marginTop: 5,
    marginRight: 5,
    marginBottom: 10,
    marginLeft: 24
  },
  BLOCK: {
    display: 'block',
    width: "100%",
    height: "100%"
  },
  NONE: {
    display: 'none'
  },
  DIV: {
    width: "100%",
    height: "100%"
  }
};

const _renderTabs = (children, selectedTabIndex, hClickTab) => children
 .map((tab, index) => React.cloneElement(tab, {
    key: index,
    id: index,
    onClick: hClickTab.bind(null, index),
    isSelected: index === selectedTabIndex
 }));

 const _renderComponents = (children, selectedTabIndex) => children
  .map((tab, index) => {
     const _isSelected = (index === selectedTabIndex)
     , _divStyle = _isSelected ? S.BLOCK : S.NONE;
     return (
        <div
          key={'a'+index}
          style={_divStyle}
          role="tabpanel"
          id={`tabpanel-${index}`}
          aria-labelledby={`tab-${index}`}          
        >
           {React.cloneElement(tab.props.children, {
             key: 'comp'+index,
             isSelected: _isSelected
           })}
        </div>
     );
 });


const TabPane = React.forwardRef(({
  width,
  height,
  children
}, ref) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  , _hClickTab = useCallback(
       (index)=>setSelectedTabIndex(index),
    []);

  useImperativeHandle(ref, () => ({
    getSelectedTabIndex: () => selectedTabIndex
  }), [selectedTabIndex])

  return (
    <div style={{ width, height }}>
      <div style={S.TABS}>
         {_renderTabs(children, selectedTabIndex, _hClickTab)}
      </div>
      <div style={S.DIV}>
         {_renderComponents(children, selectedTabIndex)}
      </div>
    </div>
  );
})

/*
TabPane.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node)
}
*/

export default TabPane
