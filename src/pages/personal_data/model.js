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
        Taro.showLoading({
          mask:true,
          title:'同步中...'
        })
        const {status, data} = yield call(personal_dataApi.syncUserAvatar, payload)
        Taro.hideLoading()
        if (status == 1) {
          Taro.showToast({
            title:'头像同步成功'
          })
          yield put({
            type:'getUserInfo'
          })
        }
      } catch (e) {
        Taro.hideLoading()
        console.log(e)
      }
    },

    //退出登录
    * exitSchoolTest({payload}, {call, put}) {
      try {
        const {status, data} = yield call(personal_dataApi.exitSchoolTest, payload)
        if (status == 1) {
          // Taro.removeStorageSync('token')
          yield put({
            type:'common/save',
            payload:{
              is_certified:0
            }
          })
          yield put({
            type:'mine/save',
            payload:{
              mine_data: {
              },
            }
          })
          yield put({
            type:'common/save',
            payload:{
              is_certified:1,
              need_authorization: false,//是否需要授权
              need_run_auth:false,
              user_info:{},//个人信息
            }
          })
          Taro.switchTab({
            url: '/pages/home/index'
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
