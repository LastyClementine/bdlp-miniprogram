import Nerv from "nervjs";
import Taro, { Component } from "@tarojs/taro-h5";
import { View } from '@tarojs/components';
import { connect } from "@tarojs/redux-h5";
import './index.scss';
import { AtIcon } from 'taro-ui';

export default @connect(({ mine, common, loading }) => ({
  ...mine,
  ...common,
  loading
}))
class Mine extends Component {
  config = {
    navigationBarTitleText: '个人中心'
  };

  componentDidMount = () => {};

  render() {
    const {} = this.props;
    return <View className="mine-page">
        <View className="top-wrapper">
          <View className="top">
            <View className="head-img"></View>
            <View className="info">
              <View className="name">哈哈哈</View>
              <View className="number">工号 : 20190702</View>
            </View>
          </View>

        </View>
        <View className="err-msg">有相同工号认证，请联系管理员</View>

        <View className="list">
          <View className="item">
            <View className="list-l">个人资料</View>
            <View className="list-c">体验版(点击更改)</View>
            <AtIcon value="chevron-right" size="16" color="#b3b3b3" className="chevron-right"></AtIcon>
          </View>
          <View className="item">
            <View className="list-l">我的活动</View>
            <AtIcon value="chevron-right" size="16" color="#b3b3b3" className="chevron-right"></AtIcon>
          </View>
          <View className="item">
            <View className="list-l">提醒设置</View>
            <AtIcon value="chevron-right" size="16" color="#b3b3b3" className="chevron-right"></AtIcon>
          </View>
        </View>


        <View className="list">
          <View className="item">
            <View className="list-l">关于我们</View>
            <AtIcon value="chevron-right" size="16" color="#b3b3b3" className="chevron-right"></AtIcon>
          </View>
          <View className="item">
            <View className="list-l">联系客服</View>
            <AtIcon value="chevron-right" size="16" color="#b3b3b3" className="chevron-right"></AtIcon>
          </View>
          <View className="item">
            <View className="list-l">如何开通</View>
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