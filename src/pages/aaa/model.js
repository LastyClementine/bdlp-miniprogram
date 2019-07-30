

export default {
  namespace: 'aaa',
  state: {
  },

  effects: {

  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },

}
