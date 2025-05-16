import {
  isFn,
  parseIntBy10
} from '../../utils/isTypeFn';

import {
  useRef,
  useMemo,
  getRefValue,
  getRefElementStyle
} from '../uiApi';

import crModelMore from './crModelMore';
import forEachInstance from './forEachInstance';

const CHILD_MARGIN = 36;

const _crFnByNameArgs = (
  ref,
  methodName,
  ...args
) => () => {
  const _compInstance = getRefValue(ref);
  if (_compInstance) {
    _compInstance[methodName](...args)
  }
};

const _fReflowChartByRef = parentWidth => refItem => {
  if (isFn(refItem.reflowChart)){
    refItem.reflowChart(parentWidth - CHILD_MARGIN)
  }
};

const _showCaptionByRef = refItem => {
  if (isFn(refItem.showCaption)){
    refItem.showCaption()
  }
};

const useChartContainerMenuMore = (
  isAdminMode,
  props,
  INITIAL_WIDTH,
  MIN_WIDTH,
  STEP,
  hmCharts,
  showCompareTo
) => {
  const _refRootElement = useRef()
  , _refResize = useRef()
  , {
    onSortBy,
    onRemoveAll
  } = props

  /*eslint-disable react-hooks/exhaustive-deps */
  , [
    _hResizeAfter,
    _onShowCaptions
  ] = useMemo(() => [
    (parentWidth) => {
      forEachInstance(hmCharts, _fReflowChartByRef(parentWidth))
    },
    () => {
      forEachInstance(hmCharts, _showCaptionByRef)
    }
  ], [])
  //hmCharts
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  , _fitToWidth = useMemo(() => () => {
    const { width } = getRefElementStyle(_refRootElement) || {};
    if (width) {
      _hResizeAfter(parseIntBy10(width))
    }
  }, [])
  //_hResizeAfter
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  , _modelMore = useMemo(() => crModelMore(isAdminMode, {
      onMinWidth: _crFnByNameArgs(_refResize, 'toWidth', MIN_WIDTH, true),
      onInitWidth: _crFnByNameArgs(_refResize, 'toWidth', INITIAL_WIDTH, true),
      onPlusWidth: _crFnByNameArgs(_refResize, 'resizeBy', STEP),
      onMinusWidth: _crFnByNameArgs(_refResize, 'resizeBy', -STEP),
      onFit: _fitToWidth,
      onShowCaptions: _onShowCaptions,
      onSortBy,
      onRemoveAll,
      onCompareTo: showCompareTo
  }), [isAdminMode])
  // INITIAL_WIDTH, MIN_WIDTH, STEP, showCompareTo
  // onRemoveAll, onSortBy
  // _fitToWidth, _onShowCaptions
  /*eslint-enable react-hooks/exhaustive-deps */

  return [
    _refRootElement,
    _refResize,
    _modelMore,
    _hResizeAfter
  ];
}

export default useChartContainerMenuMore
