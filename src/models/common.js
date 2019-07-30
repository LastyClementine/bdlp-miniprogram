import Taro from '@tarojs/taro'
import * as aaaApi from "../pages/aaa/service";

let systemInfo = {}
let isIpx = false


export default {
    namespace: 'common',

    state: {
        systemInfo: systemInfo,
        isIpx: isIpx,
        need_authorization: false,//是否需要授权
        user_info:{},//个人信息
        shcool_info:{
            department_list:[]
        },
        gender_list:[
            {name:'男',id:1},
            {name:'女',id:2}
        ]
    },

    effects: {
        //注册
        * index_index_register({payload}, {call, put}) {
            try {
                const {status, data} = yield call(aaaApi.index_index_register, payload)
                if (status == 1) {
                    console.log('注册成功')
                }
            } catch (e) {
                console.log(e)
            }
        },

        //登录
        * index_index_login({payload}, {call, put}) {
            try {
                const {status, data} = yield call(aaaApi.index_index_login, payload)
                if (status == 1) {
                    Taro.setStorageSync('token', data.token)
                    Taro.setStorageSync('uid', data.uid)
                    yield put({
                        type:'home/index'
                    })
                    if (data.is_certified) {
                        // yield put({
                        //     type:'getUserInfo',
                        //     payload:{}
                        // })
                        Taro.navigateTo({
                            url: '/pages/index/index'
                        })
                    }
                }

                if (status == -2) {
                    yield put({
                        type: 'save',
                        payload: {need_authorization: true}
                    })
                }
            } catch (e) {
                console.log(e)
            }
        },
        //获取学校信息
        * getCodeSchoolInfo({payload}, {call, put}) {
            try {
                const {status, data} = yield call(aaaApi.getCodeSchoolInfo, payload)
                if (status == 1) {
                    yield put({
                        type:'save',
                        payload:{
                            shcool_info:data
                        }
                    })
                }
            } catch (e) {
                console.log(e)
            }
        },

        //获取用户信息
        * getUserInfo({payload}, {call, put}) {
            try {
                const {status, data} = yield call(aaaApi.getUserInfo, payload)
                if (status == 1) {
                    yield put({
                        type:'save',
                        payload:{
                            user_info:data
                        }
                    })
                    if(data.top_top_msg){
                        Taro.atMessage({
                            'message': '消息通知',
                            'type': 'error',
                        })
                    }
                }
            } catch (e) {
                console.log(e)
            }
        },
    },

    reducers: {
        save(state, {payload}) {
            return {...state, ...payload}
        }
    }
}
