import * as activity_detailApi from './service'

export default {
    namespace: 'activity_detail',
    state: {
        detail_data:{
            start_time:new Date().getTime(),
            end_time:new Date().getTime(),
        },
        all_scope_type:[
            {name:'学校',value:'1'},
            {name:'部门',value:'2'},
        ],
        scope_type:'0',//数据类型
        rank_type:1,//排名类型
        rank_data:{
            rank:[],
            user_rank:{}
        }
    },

    effects: {
        * detail({payload}, {call, put}) {
            try {
                const {status, data} = yield call(activity_detailApi.detail, payload)
                if (status == 1) {
                    yield put({
                        type: 'save',
                        payload: {
                            detail_data: data
                        }
                    })
                }
            } catch (e) {
                console.log(e)
            }
        },
        * getEventRank({payload}, {call, put}) {
            try {
                const {status, data} = yield call(activity_detailApi.getEventRank, payload)
                if (status == 1) {
                    yield put({
                        type: 'save',
                        payload: {
                            rank_data: data
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
