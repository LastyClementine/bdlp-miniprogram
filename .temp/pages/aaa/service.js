import Request from "../../utils/request";

export const index_index_register = data => Request({
  api: 'index/Index/register',
  is_auth: false,
  data
});

export const index_index_login = data => Request({
  api: 'index/Index/login',
  is_auth: false,
  data
});

export const getCodeSchoolInfo = data => Request({
  api: 'index/Index/getCodeSchoolInfo',
  is_auth: true,
  data
});

export const getUserInfo = data => Request({
  api: 'index/Index/getUserInfo',
  is_auth: true,
  data
});