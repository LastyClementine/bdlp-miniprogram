import * as set_targetApi from './service'

export default {
    namespace: 'set_target',
    state: {
        target_info: {
            targets: {}
        },
        target_type:''
    },

    effects: {
        * getTargetInfo({payload}, {call, put}) {
            try {
                const {status, data} = yield call(set_targetApi.getTargetInfo, payload)
                if (status == 1) {
                    yield put({
                        type: 'save',
                        payload: {
                            target_info: data,
                            target_type:data.target_type
                        }
                    })
                    if (data.is_remind){
                        yield put({
                            type:'set_remind/save',
                            payload:{
                                is_remind:data.is_remind,
                                remind_time:data.remind_hour+':'+data.remind_minute
                            }
                        })
                    }
                }
            } catch (e) {
                console.log(e)
            }
        },

        * setTarget({payload}, {call, put}) {
            try {
                const {status, data} = yield call(set_targetApi.setTarget, payload)
                if (status == 1) {
                    yield put({
                        type: 'getTargetInfo',
                        payload: {}
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
    },

}
