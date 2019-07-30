import Nerv from "nervjs";
import Taro, { Component } from "@tarojs/taro-h5";
import { Text, View } from '@tarojs/components';
import { connect } from "@tarojs/redux-h5";
import './index.scss';
import { AtProgress } from "taro-ui";

export default @connect(({ my_activity, common, loading }) => ({
  ...my_activity,
  ...common,
  loading
}))
class My_activity extends Component {
  config = {
    navigationBarTitleText: '我的活动'
  };

  componentDidMount = () => {};

  render() {
    const {} = this.props;
    return <View className="my_activity-page">
                <View className="wrap">
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
                </View>

                <View className="null">
                    <View className="null-image"></View>
                    <View className="null-desc">暂无活动</View>
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