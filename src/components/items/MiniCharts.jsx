import { safeMap } from '../uiApi';

import ShowHide from '../zhn/ShowHide';
import HighchartWrapper from '../zhn/HighchartWrapper';

const MiniCharts = ({
  withoutAnimation,
  configs,
  idPropName='id',
  absComp,
  onLoaded,
  onWillUnLoaded
}) => safeMap(configs, item => (
  <ShowHide
    key={item[idPropName]}
    isShow={true}
    withoutAnimation={withoutAnimation}
  >
    <HighchartWrapper
      config={item.config}
      absComp={absComp}
      onLoaded={onLoaded}
      onWillUnLoaded={onWillUnLoaded}
    />
  </ShowHide>
));


/*
MiniCharts.propTypes = {
  withoutAnimation: PropTypes.bool,
  configs: PropTypes.arrayOf(
    PropTypes.shape({
      config: PropTypes.object
  })),
  idPropName: PropTypes.string,
  absComp: PropTypes.node,
  onLoaded: PropTypes.func,
  onWillUnLoaded: PropTypes.func
}
*/

export default MiniCharts
