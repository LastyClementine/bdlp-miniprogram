import Request from '../../utils/request'

export const index = data => Request({
  api: 'index/User/index',
  is_auth:true,
  data,
})
