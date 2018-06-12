import React from 'react'

import ShowHide from '../zhn/ShowHide'
import HighchartWrapper from '../zhn/HighchartWrapper';

const _fIsBtTitle = title => c => c.btTitle === title;

const MiniCharts = ({
  titles, configs,
  absComp,
  onLoaded,
  onWillUnLoaded
}) => {
  if (!titles || !titles.length
      || !configs || !configs.length
  ) {
    return null;
  }
  return (
    <div>
      {
        titles.map(title => {
          const _isBtTitle = _fIsBtTitle(title)
              , _c = configs.find(_isBtTitle);
          return _c ? (
            <ShowHide isShow={true} key={title}>
              <HighchartWrapper
                  isShow={true}
                  config={_c.config}
                  absComp={absComp}
                  onLoaded={onLoaded}
                  onWillUnLoaded={onWillUnLoaded}
              />
           </ShowHide>
          ) : null;
        })
      }
    </div>
  );
}

/*
MiniCharts.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string),
  configs: PropTypes.arrayOf(
    PropTypes.shape({
      btTitle: PropTypes.string,
      config: PropTypes.object
  })),
  absComp: PropTypes.node,
  onLoaded: PropTypes.func,
  onWillUnLoaded: PropTypes.func
}
*/

export default MiniCharts
