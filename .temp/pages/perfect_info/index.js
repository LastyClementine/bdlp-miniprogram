import Nerv from "nervjs";
import Taro, { Component } from "@tarojs/taro-h5";
import { View, Input, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import { connect } from "@tarojs/redux-h5";
import './index.scss';

export default @connect(({ perfect_info, common, loading }) => ({
  ...perfect_info,
  ...common,
  loading
}))
class Perfect_info extends Component {
  config = {
    navigationBarTitleText: '完善信息'
  };

  componentDidMount = () => {};

  render() {
    const {} = this.props;
    return <View className="perfect_info-page">
                <View className="block">
                    <View className="form-item">
                        <View className="label">学校</View>
                        <Input value={'华中科技大学'} disabled placeholderClass="placeholder" className="value" />
                    </View>
                    <View className="form-item">
                        <View className="label">部门</View>
                        <View className="value placeholder">请选择部门</View>
                        <AtIcon value="chevron-right" size="24" color="#c4c4c7" className="chevron-right"></AtIcon>
                    </View>
                </View>

                <View className="block">
                    <View className="form-item">
                        <View className="label">姓名</View>
                        <Input disabled placeholderClass="placeholder" className="value" placeholder="请输入姓名" />
                    </View>
                    <View className="form-item">
                        <View className="label">工号</View>
                        <Input disabled placeholderClass="placeholder" className="value" placeholder="请输入工号" />
                    </View>
                </View>

                <View className="block">
                    <View className="form-item">
                        <View className="label">性别</View>
                        <View className="value placeholder">请选择性别</View>
                        <AtIcon value="chevron-right" size="24" color="#c4c4c7" className="chevron-right"></AtIcon>
                    </View>
                </View>

                <View className="mark">
                    提交认证即代表您已查看并同意
                    <Text>《用户协议》</Text>
                </View>

                <View className="submit-btn">
                    下一步
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