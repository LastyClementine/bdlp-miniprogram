 import '@tarojs/async-await'
import {Provider} from '@tarojs/redux'
import Taro, {Component} from '@tarojs/taro'
import Index from './pages/index'
import dva from './utils/dva'
import models from './models'

import './styles/base.scss'
import 'taro-ui/dist/style/index.scss'

const dvaApp = dva.createApp({
    initialState: {},
    models: models,
});
const store = dvaApp.getStore();

class App extends Component {

    config = {
        pages: [
            'pages/home/index',
            'pages/index/index',
            'pages/perfect_info/index',
            'pages/select_department/index',
            // 'pages/test/index',

            'pages/set_target/index',
            // 'pages/group_ranking/index',
            'pages/today_achievement/index',
            'pages/activity_detail/index',
            'pages/activity_info/index',
            // 'pages/aaa/index',
            'pages/mine/index',
            'pages/personal_data/index',
            'pages/update_nick/index',
            'pages/my_activity/index',
            'pages/set_remind/index',
            'pages/step_statistics/index',
            'pages/step_chart/index',
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#ffffff',
            navigationBarTitleText: '',
            navigationBarTextStyle: 'black'
        },
        "tabBar": {
            "color": "#7f8389",
            "selectedColor": "#0bad61",
            "borderStyle": "black",
            "backgroundColor": "#ffffff",
            "list": [
                {
                    "pagePath": "pages/home/index",
                    "iconPath": "assets/images/tabbar_sy_off.png",
                    "selectedIconPath": "assets/images/tabbar_sy_on.png",
                    "text": "首页"
                },
                {
                    "pagePath": "pages/mine/index",
                    "iconPath": "assets/images/tabbar_wode_off.png",
                    "selectedIconPath": "assets/images/tabbar_wode_on.png",
                    "text": "我的"
                }
            ]
        },
    }

    componentDidMount() {
    }

    componentDidShow() {
    }

    render() {
        return (
            <Provider store={store}>
                <Index/>
            </Provider>
        )
    }
}

Taro.render(<App/>, document.getElementById('app'))
