import * as homeApi from "./service";

export default {
  namespace: 'home',
  state: {},

  effects: {
    *effectsDemo(_, { call, put }) {
      const { status, data } = yield call(homeApi.demo, {});
      if (status === 'ok') {
        yield put({ type: 'save',
          payload: {
            topData: data
          } });
      }
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }

};