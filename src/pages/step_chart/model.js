import * as step_chartApi from './service'

export default {
    namespace: 'step_chart',
    state: {
        month_data_chart:{
            month_run_record:[],
            month_step_distribution:{}
        },
        month:new Date().getMonth()+1,
        year:new Date().getFullYear()
    },

    effects: {
        //每月步数统计
        * monthlyStat({payload}, {call, put}) {
            try {
                const {status, data} = yield call(step_chartApi.monthlyStat, payload)
                if (status == 1) {
                    yield put({
                        type: 'save',
                        payload: {
                            month_data: data
                        }
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
