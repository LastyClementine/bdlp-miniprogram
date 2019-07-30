import Request from "../../utils/request";

export const customer_web_statistics = data => Request({
  api: 'customer.web.statistics',
  data
});

export const goods_web_search = data => Request({
  api: 'goods.web.search',
  data
});