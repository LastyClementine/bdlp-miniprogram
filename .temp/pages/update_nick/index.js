import Nerv from "nervjs";
import Taro, { Component } from "@tarojs/taro-h5";
import { View, Input, Button } from '@tarojs/components';
import { connect } from "@tarojs/redux-h5";
import './index.scss';

export default @connect(({ update_nick, common, loading }) => ({
  ...update_nick,
  ...common,
  loading
}))
class Update_nick extends Component {
  config = {
    navigationBarTitleText: '修改昵称'
  };

  componentDidMount = () => {};

  render() {
    const {} = this.props;
    return <View className="update_nick-page">
        <View className="input-con">
          <Input />
          <View className="clear"></View>
        </View>
        <View className="note">还可输入6个字</View>
        <Button>确认修改</Button>
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