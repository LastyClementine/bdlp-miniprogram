import Nerv from "nervjs";
import Taro, { Component } from "@tarojs/taro-h5";
import { View, Text } from '@tarojs/components';
import { connect } from "@tarojs/redux-h5";
import './index.scss';
import { AtProgress } from 'taro-ui';

export default @connect(({ home, common, loading }) => ({
  ...home,
  ...common,
  loading
}))
class Home extends Component {
  config = {
    navigationBarTitleText: '首页'
  };

  componentDidMount = () => {};

  render() {
    const {} = this.props;
    return <View className="home-page">
        <View className="wrapper">
          <View className="page-top">
            <View className="title">
              今日全校工2313人打卡，你已几百30%人
            </View>
            <View className="circle-wrapper">
              <View className="desc">当前步数</View>
              <View className="num">9487</View>
              <View className="target">今日目标：100000</View>
            </View>
            <View className="cell">
              <View className="cell-it">
                <View className="image"></View>
                <View className="text">步数统计</View>
              </View>
              <View className="cell-it">
                <View className="image"></View>
                <View className="text">邀请加入</View>
              </View>
              <View className="cell-it">
                <View className="image"></View>
                <View className="text">今日成就</View>
              </View>
              <View className="cell-it">
                <View className="image"></View>
                <View className="text">设置提醒</View>
              </View>
            </View>
          </View>

          <View className="sub-title">
            当前活动
          </View>
          <View className="activity-con">
            <View className="activity-top">
              <View className="name">2019年春季健康走活动</View>
              <View className="btn">即将开始</View>
            </View>
            <View className="mark">我的达标次数（每日6500步）：</View>
            <View className="activity-footer">
              <View className="footer-l">
                <Text>0</Text>
                次
              </View>
              <View className="footer-r">
                <Text>90</Text>
                次
              </View>
            </View>
            <AtProgress percent={75} isHidePercent strokeWidth={5} color="#2f404d" />

            <View className="detail-wrapper">
              <View className="detail">
                查看详情
              </View>
            </View>
          </View>

          <View className="activity-con" style="display:none;">
            <View className="null">
              <View className="null-image"></View>
              <View className="null-desc">暂无活动</View>
            </View>
            <View className="create-btn">
              创建活动
            </View>
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