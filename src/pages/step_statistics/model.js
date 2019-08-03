import * as step_statisticsApi from './service'
import Taro from '@tarojs/taro'
export default {
  namespace: 'step_statistics',
  state: {
    month_data:{
      month_run_record:[]
    }
  },

  effects: {
    * achieveRecord({payload}, {call, put}) {
      try {
        Taro.showLoading({
          mask:true
        })
        const {status, data} = yield call(step_statisticsApi.achieveRecord, payload)
        Taro.hideLoading()
        if (status == 1) {
          yield put({
            type: 'save',
            payload: {
              month_data: data
            }
          })
        }
      } catch (e) {
        Taro.hideLoading()
        console.log(e)
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },

}
