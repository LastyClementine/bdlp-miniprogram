import Request from "../../utils/request";

export const checkSchoolCode = data => Request({
  api: 'index/Index/checkSchoolCode',
  is_auth:true,
  data,
})