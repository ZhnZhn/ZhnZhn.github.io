import {
  CL_BLACK,
  S_INLINE,
  crCnNotSelected,
  crBoldCn
} from '../styleFn';

const _fSpanToken = (
  className
) => ({
  id,
  style,
  children
}) => (
  <span
    id={id}
    className={className}
    style={style}
  >{children}</span>
);

export const SpanValue = _fSpanToken(crBoldCn("sp-value"))
export const SpanDate = _fSpanToken(crBoldCn("sp-date"))

const CL_SP_LABEL = crCnNotSelected("sp-label");
export const SpanLabel = _fSpanToken(crBoldCn(CL_SP_LABEL))
export const CL_SP_INPUT_LABEL = `${CL_SP_LABEL} sp-input`
export const SpanInputLabel = _fSpanToken(crBoldCn(CL_SP_INPUT_LABEL))

export const SpanBlack = _fSpanToken(CL_BLACK)
export const SpanBoldBlack = _fSpanToken(crBoldCn(CL_BLACK))
export const SpanBold = _fSpanToken(crBoldCn())

export const SpanGap = ({
  width
}) => (
  <span style={{...S_INLINE, width}} />
)
