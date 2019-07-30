import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'

@connect(({group_ranking,common,loading}) => ({
  ...group_ranking,
  ...common,
  loading
}))
export default class Group_ranking extends Component {
  config = {
    navigationBarTitleText: '水逆退散群排名',
  }

  componentDidMount = () => {

  }

  render() {
    const {
      } = this.props
    return (
      <View className='group_ranking-page'>
        <View className="tabs">
          <View className="tab tab--active">今日群排名
            <View className="active-bar"></View>
          </View>
          <View className="tab">昨日群排名</View>
        </View>
        <View className="content">
          <View className="item">
            <View className="item-l">
              <View className="index">16</View>
              <View className="header-img"></View>
              <View className="name">哈哈哈</View>
            </View>
            <View className="steps">4900</View>
          </View>

          <View className="item">
            <View className="item-l">
              <View className="index">16</View>
              <View className="header-img"></View>
              <View className="name">哈哈哈</View>
            </View>
            <View className="steps">4900</View>
          </View>

          <View className="item">
            <View className="item-l">
              <View className="index">16</View>
              <View className="header-img"></View>
              <View className="name">哈哈哈</View>
            </View>
            <View className="steps">4900</View>
          </View>
        </View>
      </View>
    )
  }
}
