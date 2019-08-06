import Taro, {Component} from '@tarojs/taro'
import {View, Image, Button} from '@tarojs/components'
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

        if(Taro.getStorageSync('token')&&this.props.is_certified!=1){
            this.props.dispatch({
                type: 'mine/index'
            })
        }

    }

    goPersonalData() {
        if (this.props.is_certified==1){
            Taro.navigateTo({
                url: '/pages/index/index'
            })
        } else {
            Taro.navigateTo({
                url: '/pages/personal_data/index'
            })
        }

    }

    //跳转我的活动
    goMyActivity() {
        Taro.navigateTo({
            url: '/pages/my_activity/index'
        })
    }

    //跳转提醒设置
    goRemind = () => {
        if (this.props.is_certified) {
            Taro.showToast({
                title:'请先认证',
                icon:'none'
            })
            return
        }
        Taro.navigateTo({
            url: '/pages/set_remind/index'
        })
    }

    onGetUserInfo = (e) => {
        let detail = e.detail.userInfo
        console.log(detail.userInfo)
        this.props.dispatch({
            type: 'mine/save',
            payload: {
                mine_data:{
                    ...this.props.mine_data,
                    user_avatar:detail.avatarUrl,
                    nick_name:detail.nickName
                }
            }
        })
    }

    render() {
        const {
            mine_data,
            is_certified,
            need_authorization//是否需要授权
        } = this.props
        console.log('mine_data',mine_data,is_certified)
        return (
            <View className='mine-page'>
                <View className="top-wrapper">
                    <View className="top">
                        <Image className="head-img" src={mine_data.user_avatar}/>
                        <View className="info">
                            <View className="name">
                                {mine_data.nick_name ? (
                                    <Text>{mine_data.nick_name}</Text>
                                ) : (
                                    <Button
                                        openType="getUserInfo"
                                        onGetUserInfo={this.onGetUserInfo.bind(this)}
                                    >
                                        获取昵称
                                    </Button>
                                )}
                            </View>
                            <View className="number">工号 : {mine_data.card_id || '暂无'}</View>
                        </View>
                    </View>

                </View>
                {mine_data.top_msg && (<View className="err-msg">{mine_data.top_msg}</View>)}


                <View className="list">
                    <View className="item" onClick={this.goPersonalData.bind(this)}>
                        <View className="list-l">个人资料</View>
                        {mine_data.is_test && (
                            <View className="list-c">体验版(点击更改)</View>
                        )}
                        {is_certified==1&&(
                            <View className="list-c">点击认证</View>
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
