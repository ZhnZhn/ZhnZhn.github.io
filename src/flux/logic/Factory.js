
import React from 'react';

import RouterDialog from './RouterDialog';
import RouterLoadFn from './RouterLoadFn';
import RouterFnValue from './RouterFnValue';
import RouterBrowser from './RouterBrowser';

import RouterItemOption from '../../components/zhn-select/RouterItemOption';
import RouterBrowserItem from '../../components/browser-items/RouterBrowserItem';

import ChartContainer from '../../components/zhn-containers/ChartContainer';

import Msg from '../../constants/Msg';
import { ModalDialog, LoadType, BrowserType } from '../../constants/Type';

import ComponentActions from '../actions/ComponentActions';
import ChartActions from '../actions/ChartActions';
import BrowserActions, { BrowserActionTypes as BAT } from '../actions/BrowserActions';
import DateUtils from '../../utils/DateUtils';

import BrowserConfig from '../../constants/BrowserConfig';

import ChartStore from '../stores/ChartStore';

const onLoadChart = ChartActions.loadStock
    , onShowChart = ChartActions.showChart
    , initFromDate = DateUtils.getFromDate(2)
    , initToDate = DateUtils.getToDate()
    , onTestDate = DateUtils.isValidDate
    , onTestDateOrEmpty = DateUtils.isValidDateOrEmpty;


const _showModalDialogDescription = function(option){
  ComponentActions.showModalDialog(ModalDialog.DESCRIPTION, option);
}


const createDialogComp = function (conf, browserType){
   const {
           type:itemKey,
           dialogProps={}, dialogType,
           dialogCaption,
           optionURI, optionsJsonProp,
           dataColumn,
         } = conf
       , {
           nInitFromDate,
           valueFn, valueFnPrefix,
           descrUrl,
           loadFnType,
           isContinious,
           loadId
         } = dialogProps
       , _initFromDate = (nInitFromDate)
            ? DateUtils.getFromDate(nInitFromDate)
            : initFromDate
       , _fnValue = (valueFn)
            ? (valueFnPrefix )
                 ? RouterFnValue[valueFn].bind(null, valueFnPrefix)
                 : RouterFnValue[valueFn]
            : undefined
       , onClickInfo = (descrUrl)
            ? _showModalDialogDescription
            : undefined
       , loadFn = RouterLoadFn.getFn(loadFnType, dialogType);

       if (isContinious) {
         Object.assign(dialogProps, {
           msgTestDateOrEmpty: Msg.TEST_DATE_OR_EMPTY,
           onTestDateOrEmpty: onTestDateOrEmpty
         })
       }
       if (!loadId){
         dialogProps.loadId = LoadType.Q;
       }

      return RouterDialog.getDialog(dialogType)
               .then(Comp => {
                  return React.createElement(Comp, {
                    key : itemKey,
                    caption : dialogCaption,
                    optionURI : optionURI,
                    optionsJsonProp : optionsJsonProp,
                    dataColumn : dataColumn,
                    msgOnNotSelected : Msg.NOT_SELECTED,
                    msgOnNotValidFormat : Msg.NOT_VALID_FORMAT,
                    onLoad : onLoadChart.bind(null, itemKey, browserType),
                    onShow : onShowChart.bind(null, itemKey, browserType),
                    fnValue : _fnValue,
                    initFromDate : _initFromDate,
                    initToDate, onTestDate,
                    onClickInfo,
                    loadFn,
                    ...dialogProps
                 });
               })
}


const _createOptionDialog = function(option) {
  const { dialogType } = option
  return RouterDialog.getDialog(dialogType)
           .then(Comp => {
              return React.createElement(Comp, {
                  key: dialogType
              })
           });
}


const onCloseItem = ChartActions.closeChart;
const fnCloseChartContainer = function(chartType, browserType){
  return ComponentActions.closeChartContainer.bind(null, chartType, browserType);
}
const createChartContainerComp = function(conf={}, browserType){
  const Comp = (conf.chartContainerComp)
                 ? conf.chartContainerComp
                 : ChartContainer
      , _type = (conf.type)
             ? conf.type
             : BrowserConfig[browserType].chartContainerType
      , _caption = (conf.chartContainerCaption)
             ? conf.chartContainerCaption
             : BrowserConfig[browserType].chartContainerCaption;

  return React.createElement(Comp, {
            key : _type,
            caption : _caption,
            chartType : _type,
            browserType : browserType,
            onCloseContainer : fnCloseChartContainer(_type, browserType),
            onCloseItem
  });
}


const _getDialogConf = function(dialogType){
  const _browserId = dialogType.split('_')[0];
  return ChartStore.getSourceConfig(_browserId, dialogType);
}

const Factory = {
  createDialog(dialogType, browserType){
   return createDialogComp(_getDialogConf(dialogType), browserType);
 },
 createOptionDialog(option){
   return _createOptionDialog(option)
 },

 createChartContainer(dialogType, browserType){
  return createChartContainerComp(_getDialogConf(dialogType), browserType);
 },

 _crBrowserDynamic(option) {
    const {
             browserType, caption='Source Browser' , sourceMenuUrl,
             chartContainerType,
             modalDialogType, itemOptionType, itemType, descrUrl
           } = option
        , comp = RouterBrowser[browserType] || RouterBrowser.DEFAULT
        , ItemOptionComp = (itemOptionType)
              ? ( RouterItemOption[itemOptionType] || RouterBrowserItem.DEFAULT )
              : RouterBrowserItem.DEFAULT
        , ItemComp = (itemType)
              ? ( RouterBrowserItem[itemType] || RouterBrowserItem.DEFAULT )
              : undefined
        , onClickInfo = (typeof ItemComp !== "undefined")
             ? _showModalDialogDescription
             : undefined
        , onShowContainer = ChartActions.showChart.bind(null, chartContainerType, browserType);

    return React.createElement(comp , {
      key : browserType,
      browserType : browserType,
      store : ChartStore,
      isInitShow : true,
      caption : caption,
      sourceMenuUrl : sourceMenuUrl,
      modalDialogType : modalDialogType,
      chartContainerType : chartContainerType,
      ItemOptionComp: ItemOptionComp,
      ItemComp : ItemComp,
      descrUrl : descrUrl,
      onClickInfo : onClickInfo,
      onShowContainer : onShowContainer,

      showAction : BAT.SHOW_BROWSER_DYNAMIC,
      loadCompletedAction : BAT.LOAD_BROWSER_DYNAMIC_COMPLETED,
      updateAction : BAT.UPDATE_BROWSER_MENU,  //for Type
      onLoadMenu : BrowserActions.loadBrowserDynamic,
      onShowLoadDialog : ComponentActions.showModalDialog  //for Type2

    });
  },

  crAsyncBrowser(option) {
    const { browserType } = option;
    switch (browserType) {
      case BrowserType.WATCH_LIST:
        /*eslint-disable no-undef */
        if ( process.env.NODE_ENV === 'development') {
          return import("js/components/watch-browser/WatchBrowser.js")
            .then(module => React.createElement(module.default, {
               key: browserType,
               browserType: browserType,
               caption: "Watch List",
               isInitShow: true,
               store: ChartStore,
               //showAction: BAT.SHOW_BROWSER,
               showAction: BAT.SHOW_BROWSER_DYNAMIC,
               updateAction: BAT.UPDATE_WATCH_BROWSER
            }));
        }
        /*eslint-enable no-undef */
        return import(
           /* webpackChunkName: "watch-browser" */
           /* webpackMode: "lazy" */
           "../../components/watch-browser/WatchBrowser"
         ).then(module => React.createElement(module.default, {
             key: browserType,
             browserType: browserType,
             caption: "Watch List",
             isInitShow: true,
             store: ChartStore,
             showAction: BAT.SHOW_BROWSER_DYNAMIC,
             updateAction: BAT.UPDATE_WATCH_BROWSER
         }));
      default: return Promise.resolve(
           this._crBrowserDynamic(option)
      )
    }
  }

}

export default Factory
