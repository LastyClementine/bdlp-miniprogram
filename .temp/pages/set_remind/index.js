import Nerv from "nervjs";
import Taro, { Component } from "@tarojs/taro-h5";
import { View, Switch } from '@tarojs/components';
import { connect } from "@tarojs/redux-h5";
import './index.scss';
import { AtIcon } from "taro-ui";

export default @connect(({ set_remind, common, loading }) => ({
  ...set_remind,
  ...common,
  loading
}))
class Set_remind extends Component {
  config = {
    navigationBarTitleText: '设置提醒'
  };

  componentDidMount = () => {};

  render() {
    const {} = this.props;
    return <View className="set_remind-page">
        <View className="sub-title">
          每日运动提醒
        </View>
        <View className="list" style="margin-top:0;">
          <View className="item">
            <View className="list-l">开启推送提醒</View>
            <Switch />
          </View>
        </View>


        <View className="list">
          <View className="item">
            <View className="list-l">设置提醒时间</View>
            <View className="list-c font-gray">每天20:30</View>
            <AtIcon value="chevron-right" size="16" color="#b3b3b3" className="chevron-right"></AtIcon>
          </View>
        </View>
      </View>;
  }

  componentDidMount() {
    super.componentDidMount && super.componentDidMount();
  }

  componentDidShow() {
    super.componentDidShow && super.componentDidShow();
  }

  componentDidHide() {
    super.componentDidHide && super.componentDidHide();
  }

}