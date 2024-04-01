import {
  useRef,
  useEffect,
  getComboboxElement,
  focusHtmlElement
} from '../uiApi';

const FocusFirtsCombobox = ({
  is,
  children
}) => {
  const _refInputs = useRef();

  useEffect(() => {
    if (is) {
      setTimeout(
        () => focusHtmlElement(getComboboxElement(_refInputs)),
        200
      )
    }
  }, [is])

  return (
    <div ref={_refInputs}>
      {children}
    </div>
  );
};

export default FocusFirtsCombobox
