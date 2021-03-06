import { useRef, useState, useReducer, useEffect, Fragment } from 'react'

import InputText from '../zhn/InputText'
import SearchOptions from './SearchOptions'
import ToggleButton from './ToggleButton'

import initialState from './flux/initialState'
import reducer from './flux/reducer'
import crAction from './flux/crAction'
import crInputChangeDf from './flux/crInputChange'

const CL = {
  INPUT_HR: 'zhn-search__input__hr'
};

const S = {
  ROOT: {
    position: 'relative',
    width: 250,
    height: 36,
    borderRadius: 14,
    background: 'none 0px 0px repeat scroll rgb(225, 225, 203)'
  },
  ROOT_OPTIONS: {
    borderRadius: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  INPUT: {
    display: 'block',
    width: '100%',
    height: 30,
    paddingLeft: 10,
    marginLeft: 0,
    borderRadius: 15,
    boxShadow: 'none'
  }
};

const _isHideOptions = keyCode => keyCode === 38
 || keyCode === 46
 || keyCode === 27;
const _isShowOptions = (keyCode, options) => keyCode === 40
 && options.length > 0;

const InputSearch = ({
  isSearch=true,
  searchApi,
  crInputChange=crInputChangeDf
}) => {
  const refInput = useRef()
  , [inputKey, forceUpdate] = useState(0)
  , [state, dispatch] = useReducer(reducer, initialState)
  , {
      isLoading, isLoadingFailed,
      isOptions, options,
      ticket
    } = state
  , action = crAction(dispatch)
  , _onInputChange = crInputChange(action, searchApi);

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
      refInput.current.focus()
    } else if (_isShowOptions(keyCode, options)) {
      action.showOptions()
    }
  }

  useEffect(() => {
    if (refInput.curent) {
      refInput.current.focus()
    }
  }, [inputKey])

  const onKeyDown = isSearch ? _onKeyDown : null
  , onInputChange = isSearch ? _onInputChange: null
  , _rootStyle = isOptions
    ? { ...S.ROOT, ...S.ROOT_OPTIONS }
    : S.ROOT;

  return (
    <div style={_rootStyle}
      tabIndex={"-1"}
      role="textbox"
      onKeyDown={onKeyDown}
    >
      <InputText
        ref={refInput}
        key={inputKey}
        style={S.INPUT}
        initValue={ticket}
        onChange={onInputChange}
        onEnter={_onEnter}
      />
      <hr className={CL.INPUT_HR} />
      { isSearch && <Fragment>
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
        </Fragment>
      }
    </div>
  );
}

export default InputSearch
