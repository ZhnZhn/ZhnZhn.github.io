import { useMemo } from 'react';

import D from '../dialogs/DialogCell';

const useCommandButtons = _hLoad => useMemo(()=>[
  <D.Button.Load key="load" onClick={_hLoad} />
], [_hLoad])

export default useCommandButtons
