import Nerv from "nervjs";
import Taro, { Component } from "@tarojs/taro-h5";
import { View, Text } from '@tarojs/components';
import { connect } from "@tarojs/redux-h5";
import './index.scss';

export default @connect(({ today_achievement, common, loading }) => ({
  ...today_achievement,
  ...common,
  loading
}))
class Today_achievement extends Component {
  config = {
    navigationBarTitleText: '今日成就'
  };

  componentDidMount = () => {};

  render() {
    const {} = this.props;
    return <View className="today_achievement-page">
        <View className="wrapper">
          <View className="bg-image"></View>
          <View className="content">
            <View className="top">
              <View className="header-img"></View>
              <View className="desc">
                <View className="name">乌云背后的幸福线</View>
                <View className="date">2019/7/1</View>
              </View>
            </View>

            <View className="sum-data">
              <View className="item">
                <View className="desc">累计打卡</View>
                <View className="value">
                  <View className="num">2</View>
                  <View className="unit">天</View>
                </View>
              </View>
              <View className="item">
                <View className="desc">累计打卡</View>
                <View className="value">
                  <View className="num">2</View>
                  <View className="unit">天</View>
                </View>
              </View>
            </View>

            <View className="footer">
              <Text>"</Text>
              运动是一切生命的源泉
              <Text>"</Text>
            </View>
          </View>
        </View>

         <View className="btn">
           保存图片
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