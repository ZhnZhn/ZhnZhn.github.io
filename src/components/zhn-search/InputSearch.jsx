import {
  useRef,
  useState,
  useReducer,
  useMemo,
  useEffect,
  focusRefElement
} from '../uiApi';

import { S_BORDER_RADIUS_2 } from '../styleFn';

import InputText from '../zhn/InputText'
import SearchOptions from './SearchOptions'
import ToggleButton from './ToggleButton'

import initialState from './flux/initialState'
import reducer from './flux/reducer'
import crAction from './flux/crAction'
import crInputChangeDf from './flux/crInputChange'

const CL_INPUT_HR = 'zhn-search__input__hr'
, S_ROOT = {
  ...S_BORDER_RADIUS_2,
  position: 'relative',
  width: 250,
  height: 36,
  background: 'none 0px 0px repeat scroll rgb(225, 225, 203)'
}
, S_INPUT = {
  ...S_BORDER_RADIUS_2,
  display: 'block',
  width: '100%',
  height: 30,
  paddingLeft: 10,
  marginLeft: 0,
  boxShadow: 'none'
};

const _isHideOptions = keyCode => keyCode === 38
 || keyCode === 46
 || keyCode === 27;
const _isShowOptions = (
  keyCode,
  options
) => keyCode === 40
 && options.length > 0;

const InputSearch = ({
  isSearch=true,
  searchApi,
  crInputChange
}) => {
  const refInput = useRef()
  , [
    inputKey,
    forceUpdate
  ] = useState(0)
  , [
    state,
    dispatch
  ] = useReducer(reducer, initialState)
  , {
      isLoading,
      isLoadingFailed,
      isOptions,
      options,
      ticket
    } = state
  , action = useMemo(
    () => crAction(dispatch),
    []
  )
  , _onInputChange = useMemo(
    () => (crInputChange || crInputChangeDf)(action, searchApi),
    [action, searchApi, crInputChange]
  );

  const _onEnter = () => {
    if (isSearch) {
      _onInputChange.cancel()
    }
  }

  const _onClickItem = (value) => {
    action.setTicket(value)
    forceUpdate(n => n+1)
  }

  const _onKeyDown = (event) => {
    const { keyCode } = event;
    if (_isHideOptions(keyCode)) {
      action.hideOptions()
      focusRefElement(refInput)
    } else if (_isShowOptions(keyCode, options)) {
      action.showOptions()
    }
  }

  useEffect(() => {
    focusRefElement(refInput)
  }, [inputKey])

  const onKeyDown = isSearch ? _onKeyDown : null
  , onInputChange = isSearch ? _onInputChange: null;

  return (
    <div
      style={S_ROOT}
      tabIndex="-1"
      role="textbox"
      onKeyDown={onKeyDown}
    >
      <InputText
        refEl={refInput}
        key={inputKey}
        style={S_INPUT}
        initValue={ticket}
        onChange={onInputChange}
        onEnter={_onEnter}
      />
      <hr className={CL_INPUT_HR} />
      { isSearch && <>
          <ToggleButton
            isLoading={isLoading}
            isLoadingFailed={isLoadingFailed}
            options={options}
            isOptions={isOptions}
            toggleOptions={action.toggleOptions}
          />
          <SearchOptions
             isShow={isOptions}
             options={options}
             onClickItem={_onClickItem}
          />
        </>
      }
    </div>
  );
}

export default InputSearch
