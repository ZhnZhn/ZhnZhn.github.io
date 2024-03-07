import { crBoldCn } from '../styleFn';

const _fSpanToken = (
  className
) => ({
  style,
  children
}) => (
  <span
    className={className}
    style={style}
  >{children}</span>
)

export const SpanValue = _fSpanToken(crBoldCn("sp-value"))
export const SpanLabel = _fSpanToken(crBoldCn("sp-label"))
export const SpanDate = _fSpanToken(crBoldCn("sp-date"))