import * as perfect_infoApi from "./service";

export default {
  namespace: 'perfect_info',
  state: {},

  effects: {
    *effectsDemo(_, { call, put }) {
      const { status, data } = yield call(perfect_infoApi.demo, {});
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