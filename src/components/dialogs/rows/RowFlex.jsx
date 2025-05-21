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

const _crJustifyContentStyle = (
  justifyContent
) => ({
  justifyContent
});

const S_ROW_FLEX_PADDING = {
  padding: '6px 8px 6px 0'
};
export const RowFlexEnd = _fRowFlex({
  ...S_FLEX,
  ...S_ROW_FLEX_PADDING,
  ..._crJustifyContentStyle('flex-end'),
  flexWrap: 'wrap',
})

export const RowFlexReverseStart = _fRowFlex({
  ...S_FLEX,
  ...S_ROW_FLEX_PADDING,
  ..._crJustifyContentStyle('flex-start'),
  flexFlow: 'row-reverse wrap'
})
