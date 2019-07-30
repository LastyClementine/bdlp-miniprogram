import * as update_nickApi from './service'
import Taro from '@tarojs/taro'

export default {
    namespace: 'update_nick',
    state: {
        nick_name: ''
    },

    effects: {
        * editUserNickName({payload}, {call, put}) {
            try {
                const {status, data} = yield call(update_nickApi.editUserNickName, payload)
                if (status == 1) {
                    Taro.navigateBack({delta: 1})
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
