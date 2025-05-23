import {
  useRef,
  useMemo
} from '../uiApi';

import getFnByPropName from '../../utils/getFnByPropName'
import ScrollPane from '../zhn/ScrollPane'
import OpenClose from '../zhn/OpenClose'
import ItemStack from '../zhn/ItemStack'
import FlatButton from '../zhn-m/FlatButton'
import RowSecret from '../dialogs/RowSecret'
import RowButtons from './RowButtons'

const MAX_KEY = 11;

const S_SCROLL_PANE = {
  overflowY: 'auto',
  maxHeight: 340,
  paddingRight: 10
}
, S_OC_CHILD = { paddingLeft: 8 }
, S_ROW_BTS = { margLeft: 0 };

const CONF_SM_ARR = [
  ["AV", "alpha-vantage", "Alpha Vantage"],
  ["FMP","fmp","Financial Modeling Prep","32"],
  ["Intrinio","intrinio","Intrinio","32"],
  ["Twelve", "twelve", "Twelve Data"],
  ["PLG", "polygon-io", "Polygon.io"]
];

const CONF_EC_ARR = [
  ["NDL","nasdaq-data-link","Nasdaq Data Link"],
  ["WTO","wto","WTO", "32"],
];

const CONF_EC_USA_ARR = [
  ["BEA","bea","BEA","36"],
  ["BLS","bls","BLS","32"],
  ["EIA","eia","EIA","32"]
];

const _crPwdItem = (
  item,
  index , {
    isShowLabels,
    titleStyle,
    i,
    elRefs,
    fOnEnter
  }) => {
    const _i = index + i;
    return (
      <RowSecret
         key={item[0]}
         refEl={elRefs[_i]}
         isTitle={isShowLabels}
         titleStyle={titleStyle}
         title={item[0]}
         name={item[1]}
         placeholder={`${item[2]} API Key`}
         maxLength={item[3]}
         onEnter={fOnEnter(_i)}
      />
  );
};

const PaneApiKey = ({
  isVisible,
  isShowLabels,
  titleStyle,
  btStyle,
  data,
  onClose,
  setRefFocusLast
}) => {
  const _ref1 = useRef()
  , _ref2 = useRef()
  , _ref3 = useRef()
  , _ref4 = useRef()
  , _ref5 = useRef()
  , _ref6 = useRef()
  , _ref7 = useRef()
  , _ref8 = useRef()
  , _ref9 = useRef()
  , _ref10 = useRef()
  , _ref11 = useRef()
  /*eslint-disable react-hooks/exhaustive-deps*/
  , [
    _refs,
    fSetApiKey,
    _hSetAll,
    _hClearAll
  ] = useMemo(() => [
    [_ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _ref10, _ref11],
    i => getFnByPropName(data, 'key'+i),
    () => {
      for(let i = 1; i<MAX_KEY; i++) {
        fSetApiKey(i)(_refs[i].current.getValue())
      }
    },
    () => {
      for(let i = 1; i<MAX_KEY; i++) {
        fSetApiKey(i)("")
        _refs[i].current.clear()
      }
    }
  ], []);
  /*eslint-enable react-hooks/exhaustive-deps*/
  //data

  return isVisible ? (
    <ScrollPane style={S_SCROLL_PANE}>
      <OpenClose caption="Economics" childStyle={S_OC_CHILD}>
        <ItemStack
          items={CONF_EC_ARR}
          crItem={_crPwdItem}
          isShowLabels={isShowLabels}
          titleStyle={titleStyle}
          i={1}
          elRefs={_refs}
          fOnEnter={fSetApiKey}
        />
      </OpenClose>
      <OpenClose caption="U.S. Economics" childStyle={S_OC_CHILD}>
         <ItemStack
           items={CONF_EC_USA_ARR}
           crItem={_crPwdItem}
           isShowLabels={isShowLabels}
           titleStyle={titleStyle}
           i={3}
           elRefs={_refs}
           fOnEnter={fSetApiKey}
         />
      </OpenClose>
      <OpenClose caption="Stock Market" childStyle={S_OC_CHILD}>
        <ItemStack
          items={CONF_SM_ARR}
          crItem={_crPwdItem}
          isShowLabels={isShowLabels}
          titleStyle={titleStyle}
          i={6}
          elRefs={_refs}
          fOnEnter={fSetApiKey}
        />
      </OpenClose>
      <RowButtons
         style={S_ROW_BTS}
         btStyle={btStyle}
         onClose={onClose}
         setRefFocusLast={setRefFocusLast}
      >
        <FlatButton
          style={btStyle}
          caption="SET ALL"
          onClick={_hSetAll}
        />
        <FlatButton
          style={btStyle}
          caption="CLEAR ALL"
          onClick={_hClearAll}
        />
      </RowButtons>
    </ScrollPane>
  ) : null;
};

export default PaneApiKey
