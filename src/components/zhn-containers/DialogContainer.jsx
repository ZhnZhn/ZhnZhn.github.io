import {
  safeMap,
  cloneUiElement,
  crObjWithNullPrototype
} from '../uiApi';

import useRefInit from '../hooks/useRefInit';
import useStoreState from '../hooks/useStoreState';

import {
  closeDialog,
  useMsShowDialog
} from '../../flux/stores/compStore';

import {
  findElementIndexByKey,
  doVisible,
  updateVisible,
  filterArrByKey
} from './DialogContainerFn';

const S_ROOT = {
  zIndex: 1030,
  position: 'absolute',
  top: 70,
  left: 10
};

const fUpdateState = maxDialog => (
  msShowDialog,
  setState
) => {
  const _hToTopLayer = key => {
     setState(prevState => {
      const visibleDialogs = prevState.visibleDialogs;
      if (visibleDialogs[visibleDialogs.length-1] !== key) {
        prevState.elementDialogs = doVisible(prevState.elementDialogs, key)
        filterArrByKey(visibleDialogs, key)
        visibleDialogs.push(key)
        return {...prevState};
      } else {
        return prevState;
      }
     })
  }
  , _hToggleDialog = key => {
     setState(prevState => {
       const {
         hmIs,
         elementDialogs
       } = prevState;

       if (hmIs[key]){
         const _elementIndex = findElementIndexByKey(elementDialogs, key);
         if (_elementIndex > -1){
           setTimeout(() => closeDialog(elementDialogs[_elementIndex]), 200)
         }
       }

       hmIs[key] = !hmIs[key]
       if (!hmIs[key]) {
         filterArrByKey(prevState.visibleDialogs, key)
       }
       return {...prevState};
     })
  };
  if (msShowDialog) {
    setState(prevState => {
      const {
        key,
        Comp,
        data
      } = msShowDialog
      , { elementDialogs } = prevState;
      if (Comp && findElementIndexByKey(elementDialogs, key) > -1) {
         return prevState;
      }
      updateVisible(
        prevState.hmIs,
        prevState.visibleDialogs,
        key,
        maxDialog
      )
      if (!Comp){
         prevState.elementDialogs = doVisible(elementDialogs, key)
      } else {
         elementDialogs.push(Comp)
      }
      if (!prevState.elementProps[key]) {
        prevState.elementProps[key] = {
          toTopLayer: () => _hToTopLayer(key),
          onClose: () => _hToggleDialog(key)
        }
      }
      prevState.hmData[key] = data
      return {...prevState};
    })
  }
};

const DialogContainer = ({
  maxDialog=3
}) => {
  const _upateState = useRefInit(
    () => fUpdateState(maxDialog)
  )
  , {
    hmIs,
    hmData,
    elementProps,
    elementDialogs
  } = useStoreState(() => ({
      hmIs: crObjWithNullPrototype(),
      hmData: crObjWithNullPrototype(),
      elementProps: crObjWithNullPrototype(),
      elementDialogs: [],
      visibleDialogs: []
    }),
    useMsShowDialog,
    _upateState
  )[0];

  return (
    <div style={S_ROOT}>
      {safeMap(elementDialogs, DialogElement => {
         const key = DialogElement.key;
         return cloneUiElement(
           DialogElement, {
             isShow: hmIs[key],
             optionData: hmData[key],
             ...elementProps[key]
           }, key
         );
      })}
    </div>
  );
};

export default DialogContainer
