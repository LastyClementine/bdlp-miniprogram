import Request from '../../utils/request'

export const index = data => Request({
  api: 'index/Index/index',
  is_auth:true,
  data,
})
