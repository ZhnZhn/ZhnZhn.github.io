import { crStyle2 } from '../../styleFn';

const _fRowFlex = (
  initialStyle
) => ({
  style,
  children
}) => (
  <div style={crStyle2(initialStyle, style)}>
    {children}
  </div>
);

export const S_ROW_FLEX = {
  display: 'flex',
  alignItems: 'center',
  margin: 5
}
export const RowFlex = _fRowFlex(S_ROW_FLEX)

const S_ROW_FLEX_END = {
  display: 'flex',
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
  margin: '8px 4px 10px 0'
};
export const RowFlexEnd = _fRowFlex(S_ROW_FLEX_END)
