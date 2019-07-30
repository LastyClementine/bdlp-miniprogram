import * as indexApi from './service'
import Taro from "@tarojs/taro";

export default {
    namespace: 'index',
    state: {
        verify_code:''
    },

    effects: {
        //注册
        * checkSchoolCode({payload}, {call, put}) {
            try {
                const {status, data} = yield call(indexApi.checkSchoolCode, payload)
                if (status == 1) {
                    Taro.navigateTo({
                        url: '/pages/perfect_info/index'
                    })
                }
            } catch (e) {
                console.log(e)
            }
        }
    },

    reducers: {
        save(state, {payload}) {
            return {...state, ...payload}

        },
    },

}
