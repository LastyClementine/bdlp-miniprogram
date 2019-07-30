import Nerv from "nervjs";
import Taro, { Component } from "@tarojs/taro-h5";
import { View, Button } from '@tarojs/components';
import { connect } from "@tarojs/redux-h5";
import './index.scss';

export default @connect(({ aaa, common, loading }) => ({
  ...aaa,
  ...common,
  loading
}))
class Aaa extends Component {
  config = {
    navigationBarTitleText: '首页'
  };

  componentDidMount = () => {};

  regist = e => {
    Taro.login().then(res => {
      if (res.code) {
        let detail = e.detail;
        let payload = {
          js_code: res.code,
          encryptedData: detail.encryptedData,
          iv: detail.iv,
          raw_data: detail.raw_data,
          signature: detail.signature
        };
        this.props.dispatch({
          type: 'common/index_index_register',
          payload
        });
      }
    });
  };

  login = () => {
    Taro.login().then(res => {
      if (res.code) {
        this.props.dispatch({
          type: 'common/index_index_login',
          payload: {
            js_code: res.code
          }
        });
      }
    });
  };

  getCodeSchoolInfo = () => {
    this.props.dispatch({
      type: 'common/getCodeSchoolInfo',
      payload: {}
    });
  };

  getUserInfo = () => {
    this.props.dispatch({
      type: 'common/getUserInfo',
      payload: {}
    });
  };

  render() {
    const {} = this.props;
    return <View className="aaa-page">
                <Button openType="getUserInfo" onGetUserInfo={this.regist.bind(this)}>添加</Button>
                <Button onClick={this.login.bind(this)}>aa</Button>
                <Button onClick={this.getCodeSchoolInfo.bind(this)}>bb</Button>
                <Button onClick={this.getUserInfo.bind(this)}>getUserInfo</Button>
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