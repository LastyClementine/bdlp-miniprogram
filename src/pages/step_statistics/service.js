import Request from '../../utils/request'

export const achieveRecord = data => Request({
  api: 'index/User/achieveRecord',
  is_auth:true,
  data,
})
