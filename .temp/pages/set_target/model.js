import * as set_targetApi from "./service";

export default {
  namespace: 'set_target',
  state: {},

  effects: {
    *effectsDemo(_, { call, put }) {
      const { status, data } = yield call(set_targetApi.demo, {});
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