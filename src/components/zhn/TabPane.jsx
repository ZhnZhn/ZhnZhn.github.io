import React, { useState, useCallback, useImperativeHandle } from 'react';
//import PropTypes from "prop-types";

const CL = "tabpane__tabs";

const S = {
  UL: {
    listStyle: 'outside none none',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 5,
    borderBottom: '2px solid rgba(164, 135, 212, 1)'
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
    onClick: hClickTab.bind(null, index),
    isSelected: index === selectedTabIndex
 }));

 const _renderComponents = (children, selectedTabIndex) => children
  .map((tab, index) => {
     const _isSelected = (index === selectedTabIndex)
     , _divStyle = _isSelected ? S.BLOCK : S.NONE;
     return (
        <div style={_divStyle} key={'a'+index}>
           {React.cloneElement(tab.props.children, {
             key: 'comp'+index,
             isSelected: _isSelected
           })}
        </div>
     );
 });


const TabPane = React.forwardRef(({ width, height, children }, ref) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  , _hClickTab = useCallback(
       (index)=>setSelectedTabIndex(index),
    []);

  useImperativeHandle(ref, () => ({
    getSelectedTabIndex: () => selectedTabIndex
  }), [selectedTabIndex])

  return (
    <div style={{ width, height }}>
      <ul className={CL} style={S.UL}>
         {_renderTabs(children, selectedTabIndex, _hClickTab)}
      </ul>
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
