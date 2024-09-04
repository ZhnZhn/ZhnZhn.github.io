import {
  safeMap,
  cloneElement
} from '../uiApi';

import useRefInit from '../hooks/useRefInit';
import useStoreState from '../hooks/useStoreState';

import {
  closeDialog,
  useMsShowDialog
} from '../../flux/stores/compStore';

import {
  findCompIndex,
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
  if (msShowDialog) {
    setState(prevState => {
      const {
        key,
        Comp,
        data
      } = msShowDialog
      , { compDialogs } = prevState;
      if (Comp && findCompIndex(compDialogs, key) > -1) {
         return prevState;
      }
      updateVisible(
        prevState.hmIs,
        prevState.visibleDialogs,
        key,
        maxDialog
      )
      if (!Comp){
         prevState.compDialogs = doVisible(compDialogs, key)
      } else {
         compDialogs.push(Comp)
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
  , [
    state,
    setState
  ] = useStoreState({
    hmIs: {},
    hmData: {},
    compDialogs: [],
    visibleDialogs: []
  },
    useMsShowDialog,
    _upateState
  )
  , {
    hmIs,
    hmData,
    compDialogs
  } = state
  , _hToTopLayer = key => {
       setState(prevState => {
         const visibleDialogs = prevState.visibleDialogs;
         if (visibleDialogs[visibleDialogs.length-1] !== key) {
           prevState.compDialogs = doVisible(prevState.compDialogs, key)
           filterArrByKey(visibleDialogs, key)
           visibleDialogs.push(key)
           return {...prevState};
         } else {
           return prevState;
         }
       })
    }
  , _hToggleDialog = key => {
     if (hmIs[key]){
       const _compIndex = findCompIndex(compDialogs, key);
       if (_compIndex > -1){
         closeDialog(compDialogs[_compIndex])
       }
     }
     setState(prevState => {
       const { hmIs } = prevState;
       hmIs[key] = !hmIs[key]
       if (!hmIs[key]) {
         filterArrByKey(prevState.visibleDialogs, key)
       }
       return {...prevState};
     })
  };

  return (
    <div style={S_ROOT}>
      {safeMap(compDialogs, Comp => {
        const key = Comp.key;
        return cloneElement(Comp, {
          isShow: hmIs[key],
          optionData: hmData[key],
          toTopLayer: () => _hToTopLayer(key),
          onClose: () => _hToggleDialog(key)
        });
      })}
    </div>
  );
}

export default DialogContainer
