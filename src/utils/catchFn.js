import { MSG_OFFLINE } from '../constants/Msg';

export const resolvePromise = Promise.resolve.bind(Promise)

export const catchDynamicLoad = () => {
  throw new Error(MSG_OFFLINE);
}

export const catchLogErr = err => {
  console.log(err.message)
}
