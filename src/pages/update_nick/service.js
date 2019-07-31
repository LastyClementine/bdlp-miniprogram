import Request from '../../utils/request'

export const editUserNickName = data => Request({
  api: 'index/User/editUserNickName',
  is_auth:true,
  data,
})
