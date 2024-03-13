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
