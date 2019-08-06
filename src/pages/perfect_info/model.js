import * as perfect_infoApi from './service'
import Taro from '@tarojs/taro'
export default {
    namespace: 'perfect_info',
    state: {
        department_id: '',
        name: '',
        card_id: '',
        gender: '',
    },

    effects: {
        //提交学校信息认证
        * checkUserSchoolInfo({payload}, {call, put}) {
            console.log(payload)
            try {
                const {status, data} = yield call(perfect_infoApi.checkUserSchoolInfo, payload)
                if (status == 1) {
                    yield put({
                        type:"common/save",
                        payload:{
                            is_certified:0
                        }
                    })
                    Taro.showToast({
                        title:'认证成功'
                    })

                    setTimeout(()=>{
                        Taro.switchTab({
                            url: '/pages/home/index'
                        })
                    },2000)

                }
            } catch (e) {
                console.log(e)
            }
        },
    },

    reducers: {
        save(state, {payload}) {
            return {...state, ...payload}
        },
    },

}
