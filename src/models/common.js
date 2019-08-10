import Taro from '@tarojs/taro'
import * as aaaApi from "../pages/aaa/service";

let systemInfo = {}
let isIpx = false


export default {
    namespace: 'common',

    state: {
        systemInfo: systemInfo,
        is_certified:1,
        isIpx: isIpx,
        need_authorization: false,//是否需要授权
        need_run_auth:false,
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
            Taro.showLoading({
                mask:true
            })
            try {
                let params = {
                    js_code: payload.js_code,
                    encrypted_data: payload.encrypted_data,
                    iv: payload.iv,
                    raw_data: payload.raw_data,
                    signature: payload.signature,
                }
                const {status, data} = yield call(aaaApi.index_index_register, params)
                Taro.hideLoading()
                if (status == 1) {
                    console.log('注册成功')
                    payload.cb()
                }
            } catch (e) {
                Taro.hideLoading()
                console.log(e)
            }
        },

        //登录
        * index_index_login({payload}, {call, put}) {
            try {
                const {status, data} = yield call(aaaApi.index_index_login, {js_code:payload.js_code})
                if (status == 1) {
                    Taro.setStorageSync('token', data.token)
                    Taro.setStorageSync('uid', data.uid)
                    yield put({
                        type:'save',
                        payload:{
                            is_certified:data.is_certified
                        }
                    })
                    if (data.is_certified) {
                        Taro.navigateTo({
                            url: '/pages/index/index'
                        })
                    }else {
                        payload.cb()
                    }
                }

                //需要授权注册
                if (status == -3) {
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
            console.log('common save',payload)
            return {...state, ...payload}
        }
    }
}
