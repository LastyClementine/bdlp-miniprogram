import * as homeApi from './service'
import Taro from "@tarojs/taro";

export default {
  namespace: 'home',
  state: {
    index_data:{
      least_event:{},
    },
    sync_success:true,//是否同步成功

  },

  effects: {
    * index({payload}, {call, put}) {
      try {
        const {status, data} = yield call(homeApi.index, {encrypted_data:payload.encrypted_data,iv:payload.iv})
        if (status == 1) {
          yield put({
            type:'save',
            payload:{
              index_data: data,
              sync_success:true
            }
          })
          Taro.setNavigationBarTitle({
            title:data.school_name||'首页'
          })
          if (data.user_target_remind){
            Taro.showModal({
              title:"提示",
              content:"学校活动目标值已更新，是否修改",
              confirmText:'立即修改',
              confirmColor:'#0bad61'
            })
                .then(res=>{
                  console.log(res)
                })
          }
          if (payload.cb){
            payload.cb(data.user_now_step_num,data.user_target_step_num||6000)
          }
        }else {
          yield put({
            type:'save',
            payload:{
              sync_success:false
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
