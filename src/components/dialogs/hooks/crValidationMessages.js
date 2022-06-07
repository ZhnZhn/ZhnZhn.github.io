import checkAreDatesValid from './checkAreDatesValid';

const crValidationMessages = (
  configs,
  msgOnNotSelected,
  refDates
) => {
  const msgs = configs
    .reduce((arr, conf) => {
      if (!conf[0]) {
        arr.push(msgOnNotSelected(conf[1]))
      }
      return arr;
    }, [])
  checkAreDatesValid(refDates, msgs)
  return msgs;
}

export default crValidationMessages
