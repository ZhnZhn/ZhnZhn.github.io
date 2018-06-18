import React from 'react'

import ShowHide from '../zhn/ShowHide'
import HighchartWrapper from '../zhn/HighchartWrapper';

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
  configs, idPropName,
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
        { _configs.map(c => {
          return (
            <ShowHide isShow={true} key={c[idPropName]}>
              <HighchartWrapper
                  isShow={true}
                  config={c.config}
                  absComp={absComp}
                  onLoaded={onLoaded}
                  onWillUnLoaded={onWillUnLoaded}
              />
           </ShowHide>
         );
        })
      }
    </div>
  );
}

MiniCharts.defaultProps = {
  idPropName: 'id'
}

/*
MiniCharts.propTypes = {
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
