import Request from '../../utils/request'

export const setRemind = data => Request({
  api: 'index/user_set/setRemind',
  is_auth:true,
  data,
})
