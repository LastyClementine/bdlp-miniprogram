import Nerv from "nervjs";
import Taro, { Component } from "@tarojs/taro-h5";
import { View, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import { connect } from "@tarojs/redux-h5";
import './index.scss';

export default @connect(({ activity_detail, common, loading }) => ({
  ...activity_detail,
  ...common,
  loading
}))
class Activity_detail extends Component {
  config = {
    navigationBarTitleText: '活动详情',
    navigationBarBackgroundColor: '#0aae62',
    navigationBarTextStyle: 'white'
  };

  componentDidMount = () => {};

  render() {
    const {} = this.props;
    return <View className="activity_detail-page">
                <View className="info">
                    <View className="info-item">
                        <View className="label">活动名称</View>
                        <View className="desc">2019年春季健康走活动</View>
                    </View>
                    <View className="info-item">
                        <View className="label">活动日期</View>
                        <View className="desc">2019.06.01-2019.06.01</View>
                    </View>
                    <View className="info-item">
                        <View className="label">活动目标</View>
                        <View className="desc">每日6500步为目标，共需达标90次</View>
                    </View>
                    <View className="btns">
                        <View className="btn">活动介绍</View>
                        <View className="btn">参与方式</View>
                    </View>
                </View>

                <View className="opt-bar">
                    <View className="name">暂无达标记录</View>
                    <AtIcon value="chevron-right" size="18" color="#c4c4c7" className="chevron-right"></AtIcon>
                </View>

                <View className="ranking">
                    <View className="title">活动排名</View>

                    {false}

                    <View className="filter">
                        全部数据
                        <AtIcon value="chevron-down" size="14" color="#00ad5a" className="chevron-down"></AtIcon>
                    </View>
                    <View className="sum-data">
                        <View className="sum-it">
                            <View className="label">今日目标：</View>
                            <View className="value">
                                <Text>335</Text>
                                人
                            </View>
                        </View>
                        <View className="sum-it">
                            <View className="label">今日目标：</View>
                            <View className="value">
                                <Text>335</Text>
                                人
                            </View>
                        </View>
                    </View>

                    {false}
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