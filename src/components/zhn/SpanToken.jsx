import {
  CL_BLACK,
  S_INLINE,
  getScreenCase,
  crNotSelectedCn,
  crBoldCn,
  crBold16Cn,
  crFs18Cn
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

const _crVmTokenCn = getScreenCase(crFs18Cn, crBold16Cn);

export const SpanValue = _fSpanToken(_crVmTokenCn("sp-value"))
export const SpanMove = _fSpanToken(_crVmTokenCn())
export const SpanDate = _fSpanToken(_crVmTokenCn("sp-date"))

const CL_SP_LABEL = crNotSelectedCn("sp-label");
export const SpanLabel = _fSpanToken(crBoldCn(CL_SP_LABEL))
export const CL_SP_INPUT_LABEL = `${CL_SP_LABEL} sp-input`
export const SpanInputLabel = _fSpanToken(crBoldCn(CL_SP_INPUT_LABEL))

export const SpanBoldBlack = _fSpanToken(crBoldCn(CL_BLACK))

export const SpanGap = ({
  width
}) => (
  <span style={{...S_INLINE, width}} />
)

export const MarkBlack = ({ children }) => (
  <mark className="tk-black">{children}</mark>
)
