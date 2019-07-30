import Request from '../../utils/request'

export const getUserInfo = data => Request({
  api: 'index/User/getUserInfo',
  is_auth:true,
  data,
})

export const syncUserAvatar = data => Request({
  api: 'index/User/syncUserAvatar',
  is_auth:true,
  data,
})

export const exitSchoolTest = data => Request({
  api: 'index/User/exitSchoolTest',
  is_auth:true,
  data,
})
