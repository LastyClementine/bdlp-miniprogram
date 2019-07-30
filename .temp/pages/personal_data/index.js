import Nerv from "nervjs";
import Taro, { Component } from "@tarojs/taro-h5";
import { View } from '@tarojs/components';
import { connect } from "@tarojs/redux-h5";
import './index.scss';
import { AtIcon } from "taro-ui";

export default @connect(({ personal_data, common, loading }) => ({
  ...personal_data,
  ...common,
  loading
}))
class Personal_data extends Component {
  config = {
    navigationBarTitleText: '个人资料'
  };

  componentDidMount = () => {};

  render() {
    const {} = this.props;
    return <View className="personal_data-page">
        <View className="list">
          <View className="item uni">
            <View className="list-l"></View>
            <View className="list-c">同步微信头像</View>
          </View>
          <View className="item">
            <View className="list-l">昵称</View>
            <View className="list-c font-gray">良研社七</View>
            <AtIcon value="chevron-right" size="16" color="#b3b3b3" className="chevron-right"></AtIcon>
          </View>
        </View>

        <View className="sub-title">
          认证信息(不可修改)
        </View>

        <View className="list" style="margin-top:0;">
          <View className="item">
            <View className="list-l">学校</View>
            <View className="list-c font-gray">华中科技大学</View>
            <AtIcon value="chevron-right" size="16" color="#b3b3b3" className="chevron-right"></AtIcon>
          </View>
          <View className="item">
            <View className="list-l">部门</View>
            <View className="list-c font-gray">体育学院</View>
            <AtIcon value="chevron-right" size="16" color="#b3b3b3" className="chevron-right"></AtIcon>
          </View>
          <View className="item">
            <View className="list-l">姓名</View>
            <View className="list-c font-gray">张琪</View>
            <AtIcon value="chevron-right" size="16" color="#b3b3b3" className="chevron-right"></AtIcon>
          </View>
          <View className="item">
            <View className="list-l">工号</View>
            <View className="list-c font-gray">20190702</View>
            <AtIcon value="chevron-right" size="16" color="#b3b3b3" className="chevron-right"></AtIcon>
          </View>
          <View className="item">
            <View className="list-l">性别</View>
            <View className="list-c font-gray">男</View>
            <AtIcon value="chevron-right" size="16" color="#b3b3b3" className="chevron-right"></AtIcon>
          </View>
        </View>

        <View className="exit">
          退出体验,正式认证
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