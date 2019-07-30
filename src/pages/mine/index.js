import Taro, {Component} from '@tarojs/taro'
import {View,Image} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import './index.scss'
import {AtIcon} from 'taro-ui'

@connect(({mine, common, loading}) => ({
    ...mine,
    ...common,
    loading
}))
export default class Mine extends Component {
    config = {
        navigationBarTitleText: '个人中心',
    }

    componentDidMount = () => {

    }

    componentDidShow() {
        this.props.dispatch({
            type: 'mine/index'
        })
    }

    goPersonalData(){
        Taro.navigateTo({
            url: '/pages/personal_data/index'
        })
    }

    //跳转我的活动
    goMyActivity(){
        Taro.navigateTo({
            url: '/pages/my_activity/index'
        })
    }

    //跳转提醒设置
    goRemind=()=>{
        Taro.navigateTo({
            url: '/pages/set_remind/index'
        })
    }

    render() {
        const {
            mine_data
        } = this.props
        return (
            <View className='mine-page'>
                <View className="top-wrapper">
                    <View className="top">
                        <Image className="head-img" src={mine_data.user_avatar}/>
                        <View className="info">
                            <View className="name">{mine_data.nick_name}</View>
                            <View className="number">工号 : {mine_data.card_id}</View>
                        </View>
                    </View>

                </View>
                {mine_data.top_msg&&(<View className="err-msg">{mine_data.top_msg}</View>)}


                <View className="list">
                    <View className="item" onClick={this.goPersonalData.bind(this)}>
                        <View className="list-l">个人资料</View>
                        {mine_data.is_test&&(
                            <View className="list-c">体验版(点击更改)</View>
                        )}
                        <AtIcon value='chevron-right' size='16' color='#b3b3b3' className='chevron-right'></AtIcon>
                    </View>
                    <View className="item" onClick={this.goMyActivity.bind(this)}>
                        <View className="list-l">我的活动</View>
                        <AtIcon value='chevron-right' size='16' color='#b3b3b3' className='chevron-right'></AtIcon>
                    </View>
                    <View className="item" onClick={this.goRemind}>
                        <View className="list-l">提醒设置</View>
                        <AtIcon value='chevron-right' size='16' color='#b3b3b3' className='chevron-right'></AtIcon>
                    </View>
                </View>


                <View className="list">
                    <View className="item">
                        <View className="list-l">关于我们</View>
                        <AtIcon value='chevron-right' size='16' color='#b3b3b3' className='chevron-right'></AtIcon>
                    </View>
                    <View className="item">
                        <View className="list-l">联系客服</View>
                        <AtIcon value='chevron-right' size='16' color='#b3b3b3' className='chevron-right'></AtIcon>
                    </View>
                    <View className="item">
                        <View className="list-l">如何开通</View>
                        <AtIcon value='chevron-right' size='16' color='#b3b3b3' className='chevron-right'></AtIcon>
                    </View>
                </View>
            </View>
        )
    }
}
