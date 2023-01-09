import ShowHide from '../zhn/ShowHide';
import HighchartWrapper from '../zhn/HighchartWrapper';

const _isArr = Array.isArray
, _isNotEmptyArr = (
  arr
) => _isArr(arr) && arr.length > 0;

const MiniCharts = ({
  withoutAnimation,
  configs,
  idPropName='id',
  absComp,
  onLoaded,
  onWillUnLoaded
}) => _isNotEmptyArr(configs) ? (<>
      {configs.map(c => (
        <ShowHide
           key={c[idPropName]}
           isShow={true}
           withoutAnimation={withoutAnimation}
        >
           <HighchartWrapper
              config={c.config}
              absComp={absComp}
              onLoaded={onLoaded}
              onWillUnLoaded={onWillUnLoaded}
           />
         </ShowHide>
       ))}
    </>
  ) : null;

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
