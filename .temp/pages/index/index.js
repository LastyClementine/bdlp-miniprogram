import Nerv from "nervjs";
import Taro, { Component } from "@tarojs/taro-h5";
import { View, Image, Input } from '@tarojs/components';

import { connect } from "@tarojs/redux-h5";
import './index.scss';

export default @connect(({ index, common, loading }) => ({
  ...index,
  ...common,
  loading
}))
class Index extends Component {
  config = {
    navigationBarTitleText: '教职工认证'
  };

  componentDidShow() {}

  render() {
    const {} = this.props;
    return <View className="index-page">
                <Image className="avatar" />
                <View className="title">教职工认证</View>
                <View className="mark">需完成教职工认证后，才可参加校园活动，请联系学校管理员索取口令码：</View>
                <View className="experience">
                    <View className="label">体验版请输入：</View>
                    <View className="value">123456</View>
                </View>
                <Input placeholder="请输入口令码" className="input" placeholderClass="input-placeholder" />
                <View className="submit-btn">
                    下一步
                </View>
            </View>;
  }

  componentDidMount() {
    super.componentDidMount && super.componentDidMount();
  }

  componentDidHide() {
    super.componentDidHide && super.componentDidHide();
  }

}