import * as mineApi from './service'

export default {
  namespace: 'mine',
  state: {
    mine_data:{}
  },

  effects: {
    * index({payload}, {call, put}) {
      try {
        const {status, data} = yield call(mineApi.index, payload)
        if (status == 1) {
          yield put({
            type:'save',
            payload:{
              mine_data:data
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
      console.log('save')
      return { ...state, ...payload }
    },
  },

}
