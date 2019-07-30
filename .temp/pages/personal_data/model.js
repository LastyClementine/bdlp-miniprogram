import * as personal_dataApi from "./service";

export default {
  namespace: 'personal_data',
  state: {},

  effects: {
    *effectsDemo(_, { call, put }) {
      const { status, data } = yield call(personal_dataApi.demo, {});
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