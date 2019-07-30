import * as today_achievementApi from "./service";

export default {
  namespace: 'today_achievement',
  state: {},

  effects: {
    *effectsDemo(_, { call, put }) {
      const { status, data } = yield call(today_achievementApi.demo, {});
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