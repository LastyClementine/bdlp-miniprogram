import Request from '../../utils/request'

export const achieveRecord = data => Request({
  api: 'index/user_data/achieveRecord',
  is_auth:true,
  data,
})
