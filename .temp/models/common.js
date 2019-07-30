import Taro from "@tarojs/taro-h5";
import * as aaaApi from "../pages/aaa/service";

let systemInfo = {};
let isIpx = false;

export default {
  namespace: 'common',

  state: {
    systemInfo: systemInfo,
    isIpx: isIpx
  },

  effects: {
    //注册
    *index_index_register({ payload }, { call, put }) {
      try {
        const { status, data } = yield call(aaaApi.index_index_register, payload);
        if (status == 1) {
          console.log('注册成功');
        }
      } catch (e) {
        console.log(e);
      }
    },

    //登录
    *index_index_login({ payload }, { call, put }) {
      try {
        const { status, data } = yield call(aaaApi.index_index_login, payload);
        if (status == 1) {
          Taro.setStorageSync('token', data.token);
          Taro.setStorageSync('uid', data.uid);
        }
      } catch (e) {
        console.log(e);
      }
    },
    //获取部门信息
    *getCodeSchoolInfo({ payload }, { call, put }) {
      try {
        const { status, data } = yield call(aaaApi.getCodeSchoolInfo, payload);
        if (status == 1) {
          console.log('学校信息', data);
        }
      } catch (e) {
        console.log(e);
      }
    },

    //获取用户信息
    *getUserInfo({ payload }, { call, put }) {
      try {
        const { status, data } = yield call(aaaApi.getUserInfo, payload);
        if (status == 1) {
          console.log('用户信息', data);
        }
      } catch (e) {
        console.log(e);
      }
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};