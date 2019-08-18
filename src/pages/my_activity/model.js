import * as my_activityApi from './service'

export default {
  namespace: 'my_activity',
  state: {
    activity_data:{
      now_event:[],
      history_event:[]
    }
  },

  effects: {
    * getUserEvent({payload}, {call, put}) {
      try {
        const {status, data} = yield call(my_activityApi.getUserEvent, payload)
        if (status == 1) {
          yield put({
            type:'save',
            payload:{
              activity_data:data
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
