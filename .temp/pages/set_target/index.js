import Nerv from "nervjs";
import Taro, { Component } from "@tarojs/taro-h5";
import { View } from '@tarojs/components';
import { connect } from "@tarojs/redux-h5";
import './index.scss';
import { AtIcon } from 'taro-ui';

export default @connect(({ set_target, common, loading }) => ({
  ...set_target,
  ...common,
  loading
}))
class Set_target extends Component {
  config = {
    navigationBarTitleText: '设置目标'
  };

  componentDidMount = () => {};

  render() {
    const {} = this.props;
    return <View className="set_target-page">
        <View className="sub-title">
          每日运动目标设置
        </View>
        <View className="radios">
          <View className="item">
            <View className="num">6000</View>
            <View className="desc">入门级</View>
            <View className="check">y</View>
          </View>
          <View className="item">
            <View className="num">6000</View>
            <View className="desc">入门级</View>
            <View className="check">y</View>
          </View>
          <View className="item">
            <View className="num">6000</View>
            <View className="desc">入门级</View>
            <View className="check">y</View>
          </View>

          <View className="item">
            <View className="num">6000</View>
            <View className="desc">入门级</View>
            <View className="check">y</View>
          </View>

        </View>

        <View className="time">
          <View className="desc">设置提醒时间</View>
          <View className="time-r">
            <View className="status">未开启</View>
            <AtIcon value="chevron-right" size="24" color="#c4c4c7" className="chevron-right"></AtIcon>
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