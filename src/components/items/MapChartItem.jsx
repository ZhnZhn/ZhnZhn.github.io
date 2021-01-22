import { useState, useCallback, useEffect } from 'react';
//import PropTypes from "prop-types";
import useToggle from '../hooks/useToggle';

import ChoroplethMap from '../../adapters/eurostat/ChoroplethMap';

import A from '../Comp';
import ItemHeader from './ItemHeader';
import PanelDataInfo from './PanelDataInfo';

const S = {
  ROOT_DIV: {
    position: 'relative',
    marginBottom: 10,
    marginRight: 12
  },
  TIME: {
    display: 'inline-block',
    color: '#fdb316',
    paddingLeft: 16,
    fontWeight: 'bold'
  },
  TAB_DIV: {
    position: 'relative',
    height: 30,
    backgroundColor: 'transparent',
    zIndex: 2
  },
  MAP_DIV: {
    height: 400
  },
  SPINNER_LOADING: {
    margin: '64px auto 0'
  },
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  }
};

const BtTabInfo = ({ isShow, onClick }) => {
  if (!isShow) { return null; }
  return (
    <div style={S.TAB_DIV}>
       <A.ButtonTab
          caption="Info"
          onClick={onClick}
       />
    </div>
  );
};

const _crMapId = caption => `map_${caption}`;

const MapChartItem = ({
  caption,
  config,
  onCloseItem
 }) => {
  const [state, setState] = useState({ isLoading: true, time: '' })
  , { isLoading, time } = state
  , [isOpen, toggleIsOpen] = useToggle(true)
  , [isShowInfo, setIsShowInfo] = useState(false)
  , _hClickInfo = useCallback(()=>setIsShowInfo(true), [])
  , _hClickChart = useCallback(()=>setIsShowInfo(false), []);

  useEffect(()=>{
    const { json:jsonCube, zhMapSlice, zhDialog={} } = config
    , { time } = zhDialog;

   /*eslint-disable react-hooks/exhaustive-deps */
    ChoroplethMap.draw({
      id: _crMapId(caption),
      jsonCube, zhMapSlice, time
    }).then(({ time }) => {
         setState({ isLoading: false, time })
       })
       .catch(err => {
         setState({ isLoading: false })
       });
   }, [])
   // config, caption
   /*eslint-enable react-hooks/exhaustive-deps */

   const _mapId = _crMapId(caption)
   , { zhDialog, info } = config
   , { itemCaption='' } = zhDialog || {}
   , _styleMap = isShowInfo ? S.NONE : S.BLOCK;

   return (
     <div style={S.ROOT_DIV}>
       <ItemHeader
         isOpen={isOpen}
         caption={itemCaption}
         onClick={toggleIsOpen}
         onClose={onCloseItem}
       >
         <span style={S.TIME}>
           {time}
         </span>
       </ItemHeader>

       <A.ShowHide isShow={isOpen}>
          <BtTabInfo
            isShow={!isShowInfo}
            onClick={_hClickInfo}
          />
          <div
             id={_mapId}
             style={{...S.MAP_DIV, ..._styleMap}}
          >
            {
              isLoading && <A.SpinnerLoading style={S.SPINNER_LOADING} />
            }
          </div>
          <PanelDataInfo
             isShow={isShowInfo}
             info={info}
             onClickChart={_hClickChart}
          />
       </A.ShowHide>
     </div>
   );
};

/*
MapChartItem.propTypes = {
  caption: PropTypes.string,
  config: PropTypes.shape({
    json: PropTypes.object,
    zhMapSlice: PropTypes.object,
    zhDialog: PropTypes.shape({
      subtitle: PropTypes.string,
      time: PropTypes.string
    })
  }),
  onCloseItem: PropTypes.func
}
*/

export default MapChartItem
