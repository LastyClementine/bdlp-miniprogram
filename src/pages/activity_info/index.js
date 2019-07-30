import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'

@connect(({activity_info,common,loading}) => ({
  ...activity_info,
  ...common,
  loading
}))
export default class Activity_info extends Component {
  config = {
    navigationBarTitleText: '活动介绍&参与方式',
  }

  componentDidMount = () => {

  }

  render() {
    const {
      } = this.props
    return (
      <View className='activity_info-page'>
        <View className="item">
          <View className="title">活动介绍：</View>
          <View className="desc">啊哈哈哈哈哈哈哈哈哈哈安徽发的说法啊哈哈哈哈哈哈哈哈哈哈安徽发的说法啊哈哈哈哈哈哈哈哈哈哈安徽发的说法啊哈哈哈哈哈哈哈哈哈哈安徽发的说法啊哈哈哈哈哈哈哈哈哈哈安徽发的说法啊哈哈哈哈哈哈哈哈哈哈安徽发的说法</View>
        </View>
        <View className="item">
          <View className="title">活动介绍：</View>
          <View className="desc">啊哈哈哈哈哈哈哈哈哈哈安徽发的说法啊哈哈哈哈哈哈哈哈哈哈安徽发的说法啊哈哈哈哈哈哈哈哈哈哈安徽发的说法啊哈哈哈哈哈哈哈哈哈哈安徽发的说法啊哈哈哈哈哈哈哈哈哈哈安徽发的说法啊哈哈哈哈哈哈哈哈哈哈安徽发的说法</View>
        </View>
      </View>
    )
  }
}
