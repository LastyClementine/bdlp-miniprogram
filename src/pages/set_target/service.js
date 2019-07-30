import Request from '../../utils/request'

export const getTargetInfo = data => Request({
  api: 'index/user_set/getTargetInfo',
  is_auth:true,
  data,
})

export const setTarget = data => Request({
  api: 'index/user_set/setTarget',
  is_auth:true,
  data,
})
