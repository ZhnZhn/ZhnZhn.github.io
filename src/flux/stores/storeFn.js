import { joinBy } from '../../utils/arrFn';

const LOG_ERR_COLOR = 'color:rgb(237, 88, 19);'
, _consoleLogErr = str => {
  console.log('%c' + str, LOG_ERR_COLOR)
};

export const logErrorToConsole = ({
  alertCaption,
  alertItemId,
  alertDescr
}) => {
  _consoleLogErr(joinBy(": ", alertCaption, alertItemId));
  _consoleLogErr(alertDescr);
}
