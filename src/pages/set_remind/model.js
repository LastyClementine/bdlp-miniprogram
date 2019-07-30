import * as set_remindApi from './service'

export default {
    namespace: 'set_remind',
    state: {
        is_remind: '',
        remind_time: ''
    },

    effects: {
        * setRemind({payload}, {call, put}) {
            try {
                const {status, data} = yield call(set_remindApi.setRemind, payload)
                if (status == 1) {
                    yield put({
                        type: 'set_target/getTargetInfo',
                        payload: {}
                    })
                    yield put({
                        type:'reset'
                    })
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

        reset(state) {
            let obj = {
                ...state,
                is_remind: '',
                remind_time: ''
            }
            return obj
        },
    },

}
