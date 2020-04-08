import React from 'react'

import A from '../Comp'

const _fIsTitle = (title, idPropName) => c => c[idPropName] === title;

const _arrangeBy = (titles, configs, idPropName) => {
  const _configs = [];
  if (!titles || !titles.length) {
    return _configs;
  }
  titles.forEach(title => {
    const _isTitle = _fIsTitle(title, idPropName)
        , _c = configs.find(_isTitle);
    if (_c) {
      _configs.push(_c)
    }
  })
  return _configs;
};

const MiniCharts = ({
  withoutAnimation,
  configs, idPropName='id',
  ids,
  absComp,
  onLoaded,
  onWillUnLoaded
}) => {
  if (!configs || !configs.length) {
    return null;
  }

  const _configs = Array.isArray(ids)
    ? _arrangeBy(ids, configs, idPropName)
    : configs;
  if (_configs.length === 0) {
    return null;
  }

  return (
    <div>
        { _configs.map(c => (
            <A.ShowHide
               key={c[idPropName]}
               isShow={true}
               withoutAnimation={withoutAnimation}
             >
              <A.HighchartWrapper
                  config={c.config}
                  absComp={absComp}
                  onLoaded={onLoaded}
                  onWillUnLoaded={onWillUnLoaded}
              />
           </A.ShowHide>
         ))
       }
    </div>
  );
}

/*
MiniCharts.propTypes = {
  withoutAnimation: PropTypes.bool,
  configs: PropTypes.arrayOf(
    PropTypes.shape({
      config: PropTypes.object
  })),
  idPropName: PropTypes.string,
  ids: PropTypes.arrayOf(PropTypes.string),
  absComp: PropTypes.node,
  onLoaded: PropTypes.func,
  onWillUnLoaded: PropTypes.func
}
*/

export default MiniCharts
