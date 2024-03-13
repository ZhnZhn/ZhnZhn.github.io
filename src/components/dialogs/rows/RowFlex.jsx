import { crStyle2 } from '../../styleFn';

export const S_ROW_FLEX = {
  display: 'flex',
  alignItems: 'center',
  margin: 5
};

export const RowFlex = ({
  style,
  children
}) => (
  <div style={crStyle2(S_ROW_FLEX, style)}>
    {children}
  </div>
)

const S_ROW_FLEX_END = {
  display: 'flex',
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
  margin: '8px 4px 10px 0'
}

export const RowFlexEnd = ({
  style,
  children
}) => (
  <div style={crStyle2(S_ROW_FLEX_END, style)}>
    {children}
  </div>
)
