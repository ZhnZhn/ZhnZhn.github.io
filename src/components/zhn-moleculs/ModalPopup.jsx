import {
  createContext,
  useContext,
  useRef,
  useMemo
} from '../uiApi';

import { useFocusFirstItem } from '../hooks/useFocus';

import ModalPane from './ModalPane';
import FocusTrap from './FocusTrap';

const useFocusTrap = (props) => {
  const refFirst = useFocusFirstItem(props.isShow)
  , refLast = useRef();
  /*eslint-disable react-hooks/exhaustive-deps*/
  return useMemo(() => [
    refFirst,
    refLast
  ], []);
  //_refFirstItem
  /*eslint-enable react-hooks/exhaustive-deps*/
}

const ModalPopupContext = createContext()
, ModalPopupProvider = ModalPopupContext.Provider;

export const useModalPopup = () => useContext(ModalPopupContext)

export const ModalPopup = (props) => {
  const modalPopupContextValue = useFocusTrap(props);
  return (
    <ModalPane
      {...props}
      aria-modal={props.isShow ? "true" : void 0}
    >
      <ModalPopupProvider value={modalPopupContextValue}>
        <FocusTrap
          refEl={modalPopupContextValue[0]}
          refFirst={modalPopupContextValue[0]}
          refLast={modalPopupContextValue[1]}
        >
          {props.children}
        </FocusTrap>
      </ModalPopupProvider>
    </ModalPane>
  );
}

export const fCrModalPopup = crStyle => CompView => ({
  isShow,
  style,
  className,
  onClose,
  ...restProps
}) => (
  <ModalPopup
    {...crStyle(className, style)}
    isShow={isShow}
    onClose={onClose}
  >
    <CompView {...restProps} />
  </ModalPopup>
);
