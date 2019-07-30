import '@tarojs/async-await';
import { Provider } from "@tarojs/redux-h5";
import Taro, { Component } from "@tarojs/taro-h5";

import dva from "./utils/dva";
import models from "./models/index";

import './styles/base.scss';

import Nerv from "nervjs";
import { Router, createHistory, mountApis } from '@tarojs/router';
Taro.initPxTransform({
  "designWidth": 750
});

const _taroHistory = createHistory({
  mode: "hash",
  basename: "/",
  customRoutes: {},
  firstPagePath: "/pages/index/index"
});

mountApis(_taroHistory);
const dvaApp = dva.createApp({
  initialState: {},
  models: models
});
const store = dvaApp.getStore();

class App extends Component {

  config = {
    pages: ["/pages/index/index", "/pages/perfect_info/index", "/pages/select_department/index", "/pages/test/index", "/pages/home/index", "/pages/set_target/index", "/pages/group_ranking/index", "/pages/today_achievement/index", "/pages/activity_detail/index", "/pages/activity_info/index", "/pages/aaa/index", "/pages/mine/index", "/pages/personal_data/index", "/pages/update_nick/index", "/pages/my_activity/index", "/pages/set_remind/index", "/pages/step_statistics/index"],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#ffffff',
      navigationBarTitleText: '',
      navigationBarTextStyle: 'black'
    }
  };

  componentDidMount() {
    this.componentDidShow();
  }

  componentDidShow() {}

  render() {
    return <Provider store={store}>
                  
              <Router history={_taroHistory} routes={[{
        path: '/pages/index/index',
        componentLoader: () => import( /* webpackChunkName: "index_index" */'./pages/index/index'),
        isIndex: true
      }, {
        path: '/pages/perfect_info/index',
        componentLoader: () => import( /* webpackChunkName: "perfect_info_index" */'./pages/perfect_info/index'),
        isIndex: false
      }, {
        path: '/pages/select_department/index',
        componentLoader: () => import(
        /* webpackChunkName: "select_department_index" */'./pages/select_department/index'),
        isIndex: false
      }, {
        path: '/pages/test/index',
        componentLoader: () => import( /* webpackChunkName: "test_index" */'./pages/test/index'),
        isIndex: false
      }, {
        path: '/pages/home/index',
        componentLoader: () => import( /* webpackChunkName: "home_index" */'./pages/home/index'),
        isIndex: false
      }, {
        path: '/pages/set_target/index',
        componentLoader: () => import( /* webpackChunkName: "set_target_index" */'./pages/set_target/index'),
        isIndex: false
      }, {
        path: '/pages/group_ranking/index',
        componentLoader: () => import( /* webpackChunkName: "group_ranking_index" */'./pages/group_ranking/index'),
        isIndex: false
      }, {
        path: '/pages/today_achievement/index',
        componentLoader: () => import( /* webpackChunkName: "today_achievement_index" */'./pages/today_achievement/index'),
        isIndex: false
      }, {
        path: '/pages/activity_detail/index',
        componentLoader: () => import( /* webpackChunkName: "activity_detail_index" */'./pages/activity_detail/index'),
        isIndex: false
      }, {
        path: '/pages/activity_info/index',
        componentLoader: () => import( /* webpackChunkName: "activity_info_index" */'./pages/activity_info/index'),
        isIndex: false
      }, {
        path: '/pages/aaa/index',
        componentLoader: () => import( /* webpackChunkName: "aaa_index" */'./pages/aaa/index'),
        isIndex: false
      }, {
        path: '/pages/mine/index',
        componentLoader: () => import( /* webpackChunkName: "mine_index" */'./pages/mine/index'),
        isIndex: false
      }, {
        path: '/pages/personal_data/index',
        componentLoader: () => import( /* webpackChunkName: "personal_data_index" */'./pages/personal_data/index'),
        isIndex: false
      }, {
        path: '/pages/update_nick/index',
        componentLoader: () => import( /* webpackChunkName: "update_nick_index" */'./pages/update_nick/index'),
        isIndex: false
      }, {
        path: '/pages/my_activity/index',
        componentLoader: () => import( /* webpackChunkName: "my_activity_index" */'./pages/my_activity/index'),
        isIndex: false
      }, {
        path: '/pages/set_remind/index',
        componentLoader: () => import( /* webpackChunkName: "set_remind_index" */'./pages/set_remind/index'),
        isIndex: false
      }, {
        path: '/pages/step_statistics/index',
        componentLoader: () => import( /* webpackChunkName: "step_statistics_index" */'./pages/step_statistics/index'),
        isIndex: false
      }]} customRoutes={{}} />
              
                </Provider>;
  }

  constructor(props, context) {
    super(props, context);
    Taro._$app = this;
  }

}

Nerv.render(<App />, document.getElementById('app'));