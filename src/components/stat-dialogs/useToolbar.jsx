import {useMemo} from 'react';

import useToggle from '../hooks/useToggle';
import D from '../dialogs/DialogCell';

const _crToolbarBt = (
  caption,
  title,
  onClick
) => ({
  caption,
  title,
  onClick
});

const useToolbar = (
  _toggleLabels,
  _toggleInputs,
  _toggleOptions,
  onClickInfo
) => {
  const [isToolbar, toggleToolBar] = useToggle(true)
  /*eslint-disable react-hooks/exhaustive-deps */
  , _toolbarButtons = useMemo(()=>[
    _crToolbarBt('L', 'Click to toggle input labels', _toggleLabels),
    _crToolbarBt('T', 'Toggle Inputs', _toggleInputs),
    _crToolbarBt('O', 'Chart Options', _toggleOptions),
    _crToolbarBt('A', 'About Datasource', onClickInfo)
  ], [])
  //_toggleLabels, _toggleInputs, _toggleOptions, onClickInfo
  /*eslint-enable react-hooks/exhaustive-deps */
  return [
    /*eslint-disable react-hooks/exhaustive-deps */
    useMemo(()=>(
      <D.Toolbar
        isShow={isToolbar}
        buttons={_toolbarButtons}
      />
    ), [isToolbar])
    //_toolbarButtons
    /*eslint-enable react-hooks/exhaustive-deps */
    , toggleToolBar
  ];
};

export default useToolbar
