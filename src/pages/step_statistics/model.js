import * as step_statisticsApi from './service'

export default {
  namespace: 'step_statistics',
  state: {
    step_statistics_data:{
      month_run_record:{}
    },
    month:new Date().getMonth()+1
  },

  effects: {
    * achieveRecord({payload}, {call, put}) {
      try {
        const {status, data} = yield call(step_statisticsApi.achieveRecord, payload)
        if (status == 1) {
          yield put({
            type: 'save',
            payload: {
              month_run_record: data
            }
          })
        }
      } catch (e) {
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
