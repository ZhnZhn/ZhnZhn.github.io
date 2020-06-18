import React from 'react'

const _areEqual = (prevProps, nextProps) => prevProps.isShow === nextProps.isShow

const crModalDialog = (Comp, areEqual=_areEqual) =>
  React.memo(Comp, areEqual);

export default crModalDialog
