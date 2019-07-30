import Request from '../../utils/request'

export const getUserEvent = data => Request({
  api: 'index/User/getUserEvent',
  is_auth:true,
  data,
})
