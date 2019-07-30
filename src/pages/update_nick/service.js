import Request from '../../utils/request'

export const editUserNickName = data => Request({
  api: 'index/Index/editUserNickName',
  is_auth:true,
  data,
})
