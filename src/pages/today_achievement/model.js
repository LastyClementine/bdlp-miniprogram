import * as today_achievementApi from './service'

export default {
  namespace: 'today_achievement',
  state: {
    achievement_data:{}
  },

  effects: {
    //注册
    * getTodayAchievement({payload}, {call, put}) {
      try {
        const {status, data} = yield call(today_achievementApi.getTodayAchievement, payload)
        if (status == 1) {
          yield put({
            type:'save',
            payload:{
              achievement_data: data,
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
