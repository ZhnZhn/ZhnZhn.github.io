//import PropTypes from "prop-types";
import {
  useState,
  useEffect
} from '../uiApi';

import useToggle from '../hooks/useToggle';
import { useBool } from '../hooks/useBool';

import ChoroplethMap from '../../adapters/eurostat/ChoroplethMap';

import A from '../Comp';
import ItemHeader from './ItemHeader';
import PanelDataInfo from './PanelDataInfo';

const S_ROOT_DIV = {
  position: 'relative',
  margin: '0 12px 10px 0'
},
S_TIME = {
  display: 'inline-block',
  color: '#fdb316',
  paddingLeft: 16,
  fontWeight: 'bold'
},
S_TAB_DIV = {
  position: 'relative',
  height: 30,
  backgroundColor: 'transparent',
  zIndex: 2
}
, S_MAP_DIV = { height: 400 }
, S_SPINNER_LOADING = { margin: '64px auto 0' }
, S_BLOCK = { display: 'block' }
, S_NONE = { display: 'none' }
, S_ERR_MSG = { paddingLeft: 12 }
, CL_ERR_MSG = "err-msg"
, ERR_MSG = "Error during loading map.";

const ErrMsg = () => (
  <span className={CL_ERR_MSG} style={S_ERR_MSG}>
    {ERR_MSG}
  </span>
);

const BtTabInfo = ({
  isShow,
  onClick
}) => isShow ? (
  <div style={S_TAB_DIV}>
     <A.ButtonTab
        caption="Info"
        onClick={onClick}
     />
  </div>
) : null;

const _crMapId = caption => `map_${caption}`;

export const MapChartItem = ({
  caption,
  config,
  onCloseItem
 }) => {
  const [
    state,
    setState
  ] = useState({
    isLoading: true,
    time: ''
  })
  , {
    isLoading,
    time,
    isErr
  } = state
  , [
    isOpen,
    toggleIsOpen
  ] = useToggle(true)
  , [
    isShowInfo,
    showInfo,
    hideInfo
  ] = useBool();

  useEffect(()=>{
    const {
      json:jsonCube,
      zhMapSlice,
      zhDialog
    } = config
    , { time } = zhDialog || {};

   /*eslint-disable react-hooks/exhaustive-deps */
    ChoroplethMap.draw({
      id: _crMapId(caption),
      jsonCube, zhMapSlice, time
    }).then(({ time }) => {
         setState({ isLoading: false, time })
       })
       .catch(err => {
         setState({ isLoading: false, isErr: true })
       });
   }, [])
   // config, caption
   /*eslint-enable react-hooks/exhaustive-deps */

   const _mapId = _crMapId(caption)
   , { zhDialog, info } = config
   , { itemCaption } = zhDialog || {}
   , _styleMap = isShowInfo ? S_NONE : S_BLOCK;

   return (
     <div style={S_ROOT_DIV}>
       <ItemHeader
         isOpen={isOpen}
         caption={itemCaption}
         onClick={toggleIsOpen}
         onClose={onCloseItem}
       >
         <span style={S_TIME}>
           {time}
         </span>
       </ItemHeader>

       <A.ShowHide isShow={isOpen}>
          <BtTabInfo
            isShow={!isShowInfo}
            onClick={showInfo}
          />
          <div
             id={_mapId}
             style={{...S_MAP_DIV, ..._styleMap}}
          >
            { isLoading && <A.SpinnerLoading style={S_SPINNER_LOADING} /> }
            { isErr && <ErrMsg /> }
          </div>
          <PanelDataInfo
             isShow={isShowInfo}
             info={info}
             onClickChart={hideInfo}
          />
       </A.ShowHide>
     </div>
   );
}

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
