import Request from '../../utils/request'

export const detail = data => Request({
  api: 'index/event/detail',
  is_auth:true,
  data,
})

export const getEventRank = data => Request({
  api: 'index/event/getEventRank',
  is_auth:true,
  data,
})
