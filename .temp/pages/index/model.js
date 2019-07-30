import * as indexApi from "./service";

export default {
  namespace: 'index',
  state: {
    sumData: {},
    goodList: []
  },

  effects: {
    *customer_web_statistics({ payload }, { call, put }) {
      try {
        const { status, result } = yield call(indexApi.customer_web_statistics, payload);
        if (status == 'ok') {
          yield put({
            type: 'save',
            payload: {
              sumData: result.sum_data
            }

          });
        }
      } catch (e) {}
    },

    *goods_web_search({ payload }, { call, put }) {
      try {
        const { status, result } = yield call(indexApi.goods_web_search, payload);
        if (status == 'ok') {
          yield put({
            type: 'save',
            payload: {
              goodList: result.data_list
            }

          });
        }
      } catch (e) {}
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }

};