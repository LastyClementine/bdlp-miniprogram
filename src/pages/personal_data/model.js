import * as personal_dataApi from './service'
import Taro from '@tarojs/taro'
export default {
  namespace: 'personal_data',
  state: {
    personal_data:{}
  },

  effects: {
    * getUserInfo({payload}, {call, put}) {
      try {
        const {status, data} = yield call(personal_dataApi.getUserInfo, payload)
        if (status == 1) {
          yield put({
            type:'save',
            payload:{
              personal_data:data
            }
          })
        }
      } catch (e) {
        console.log(e)
      }
    },


    * syncUserAvatar({payload}, {call, put}) {
      try {
        const {status, data} = yield call(personal_dataApi.syncUserAvatar, payload)
        if (status == 1) {
          Taro.showToast({
            title:'头像同步成功'
          })
          yield put({
            type:'getUserInfo'
          })
        }
      } catch (e) {
        console.log(e)
      }
    },

    //退出登录
    * exitSchoolTest({payload}, {call, put}) {
      try {
        const {status, data} = yield call(personal_dataApi.exitSchoolTest, payload)
        if (status == 1) {
          Taro.navigateTo({
            url: '/pages/index/index'
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
