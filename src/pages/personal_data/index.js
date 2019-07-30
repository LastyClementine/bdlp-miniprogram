import Taro, {Component} from '@tarojs/taro'
import {View, Image, Button} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import './index.scss'
import {AtIcon} from "taro-ui";

@connect(({personal_data, common, loading}) => ({
    ...personal_data,
    ...common,
    loading
}))
export default class Personal_data extends Component {
    config = {
        navigationBarTitleText: '个人资料',
    }

    componentDidMount = () => {

    }

    componentDidShow() {
        this.props.dispatch({
            type: 'personal_data/getUserInfo'
        })
    }

    exit() {
        this.props.dispatch({
            type: 'personal_data/exitSchoolTest'
        })
    }

    //修改昵称
    goUpdateNick() {
        Taro.navigateTo({
            url: '/pages/update_nick/index'
        })
    }

    //同步头像
    syncUserAvatar = (e) => {
        let detail=e.detail
        this.props.dispatch({
            type:'personal_data/syncUserAvatar',
            payload:{
                encryptedData:detail.encryptedData,
                iv:detail.iv,
                raw_data:detail.raw_data,
                signature:detail.signature,
            }
        })
    }

    render() {
        const {
            personal_data
        } = this.props
        return (
            <View className='personal_data-page'>
                <View className="list">
                    <View className="item uni">
                        <Image className="list-l" src={personal_data.user_avatar}/>
                        <Button
                            className="list-c btn"
                            openType="getUserInfo"
                            onGetUserInfo={this.syncUserAvatar.bind(this)}
                        >
                            同步微信头像
                        </Button>
                    </View>
                    <View className="item" onClick={this.goUpdateNick}>
                        <View className="list-l">昵称</View>
                        <View className="list-c font-gray">{personal_data.nick_name}</View>
                        <AtIcon value='chevron-right' size='16' color='#b3b3b3' className='chevron-right'></AtIcon>
                    </View>
                </View>

                <View className="sub-title">
                    认证信息(不可修改)
                </View>

                <View className="list" style="margin-top:0;">
                    <View className="item">
                        <View className="list-l">学校</View>
                        <View className="list-c font-gray">{personal_data.school_name}</View>
                        <AtIcon value='chevron-right' size='16' color='#b3b3b3' className='chevron-right'></AtIcon>
                    </View>
                    <View className="item">
                        <View className="list-l">部门</View>
                        <View className="list-c font-gray">{personal_data.department_name}</View>
                        <AtIcon value='chevron-right' size='16' color='#b3b3b3' className='chevron-right'></AtIcon>
                    </View>
                    <View className="item">
                        <View className="list-l">姓名</View>
                        <View className="list-c font-gray">{personal_data.name}</View>
                        <AtIcon value='chevron-right' size='16' color='#b3b3b3' className='chevron-right'></AtIcon>
                    </View>
                    <View className="item">
                        <View className="list-l">工号</View>
                        <View className="list-c font-gray">{personal_data.card_id}</View>
                        <AtIcon value='chevron-right' size='16' color='#b3b3b3' className='chevron-right'></AtIcon>
                    </View>
                    <View className="item">
                        <View className="list-l">性别</View>
                        <View className="list-c font-gray">{personal_data.gender == 1 ? '男' : '女'}</View>
                        <AtIcon value='chevron-right' size='16' color='#b3b3b3' className='chevron-right'></AtIcon>
                    </View>
                </View>

                {personal_data.is_test && (
                    <View className="exit" onClick={this.exit}>
                        退出体验,正式认证
                    </View>
                )}
            </View>
        )
    }
}
