import A from '../Comp';

const _isArr = Array.isArray
, _isEmptyArr = arr =>
    !_isArr(arr) || !arr.length;

const MiniCharts = ({
  withoutAnimation,
  configs,
  idPropName='id',
  absComp,
  onLoaded,
  onWillUnLoaded
}) => _isEmptyArr(configs) ? null
 : (<div>
      {configs.map(c => (
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
       ))}
    </div>
   );


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
