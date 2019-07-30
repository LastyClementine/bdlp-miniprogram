import Request from '../../utils/request'

export const monthlyStat = data => Request({
  api: 'index/user_data/monthlyStat',
  is_auth:true,
  data,
})
