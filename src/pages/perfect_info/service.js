import Request from '../../utils/request'

export const checkUserSchoolInfo = data => Request({
  api: 'index/Index/checkUserSchoolInfo',
  is_auth:true,
  data,
})
