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
