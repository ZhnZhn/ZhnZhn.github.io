import { focusRefElement } from '../uiApi';
import { HAS_KEYBOARD_FOCUS } from '../has';

// biome-ignore-start lint/a11y/noAriaHiddenOnFocusable: focus trap sentinel
// biome-ignore-start lint/a11y/noNoninteractiveTabindex: focus trap sentinel
/*eslint-disable jsx-a11y/no-noninteractive-tabindex*/
const TrapDiv = ({
  style,
  onFocus
}) => (
  <div
    style={style}
    tabIndex="0"
    aria-hidden="true"
    onFocus={onFocus}
  />
);
/*eslint-enable jsx-a11y/no-noninteractive-tabindex*/
// biome-ignore-end lint/a11y/noAriaHiddenOnFocusable: focus trap sentinel
// biome-ignore-end lint/a11y/noNoninteractiveTabindex: focus trap sentinel

const FocusTrap = ({
  refEl,
  refFirst,
  refLast,
  style,
  children
}) => HAS_KEYBOARD_FOCUS ? (
  <>
    <TrapDiv
      style={style}
      onFocus={() => {
        focusRefElement(refLast, refEl)
      }}
    />
    {children}
    <TrapDiv
      style={style}
      onFocus={() => {
        focusRefElement(refFirst, refEl)
      }}
    />
  </>
) : children;

export default FocusTrap
