
export const IfTrue = ({
  v,
  children
}) => v
  ? children
  : null

export const IfTrueOr = ({
  v,
  children
}) => v
  ? children[0]
  : children[1] 
