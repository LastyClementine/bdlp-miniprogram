import Request from '../../utils/request'

export const demo = data => Request({
  api: 'demo',
  data,
})
