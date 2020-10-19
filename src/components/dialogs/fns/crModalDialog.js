import { memo } from 'react'

const DF_ARE_EQUAL = (prevProps, nextProps) => prevProps.isShow === nextProps.isShow

const crModalDialog = (
  Comp,
  areEqual=DF_ARE_EQUAL
) => memo(Comp, areEqual);

export default crModalDialog
