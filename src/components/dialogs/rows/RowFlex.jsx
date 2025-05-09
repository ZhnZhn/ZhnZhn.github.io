import {
  S_FLEX,
  crStyle2
} from '../../styleFn';

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
  ...S_FLEX,
  alignItems: 'center',
  margin: '5px 8px'
}
export const RowFlex = _fRowFlex(S_ROW_FLEX)

const S_ROW_FLEX_END = {
  ...S_FLEX,
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
  padding: '6px 4px 6px 0'
};
export const RowFlexEnd = _fRowFlex(S_ROW_FLEX_END)
