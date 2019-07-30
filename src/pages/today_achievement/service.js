import Request from '../../utils/request'

export const getTodayAchievement = data => Request({
  api: 'index/Index/getTodayAchievement',
  is_auth:true,
  data,
})
