import Taro, {Component} from '@tarojs/taro'
import {View, Text, ScrollView, Image, Input} from '@tarojs/components'
import {AtMessage} from 'taro-ui'
import {connect} from '@tarojs/redux'
import './index.scss'

@connect(({index, common, loading}) => ({
    ...index,
    ...common,
    loading
}))
export default class Index extends Component {
    config = {
        navigationBarTitleText: '教职工认证',
    }

    componentDidShow() {
        this.getUserInfo()
    }

    onChange = (e) => {
        const {value} = e.detail
        const key = e.target.id
        this.props.dispatch({
            type: 'index/save',
            payload: {
                [`${key}`]: value,
            }
        })
    }

    checkSchoolCode = () => {
        const {
            verify_code
        } = this.props
        console.log(verify_code)
        if (verify_code.length !== 6) {
            Taro.showToast({title: '请填写6位口令码！', icon: 'none'})
            return
        }
        this.props.dispatch({
            type: 'index/checkSchoolCode',
            payload: {
                verify_code
            }
        })
    }

    getUserInfo = () => {
        this.props.dispatch({
            type: 'common/getUserInfo',
            payload: {}
        })
    }

    render() {
        const {
            verify_code,
            user_info
        } = this.props
        return (
            <View className='index-page'>
                <AtMessage/>
                <Image className="avatar" src={user_info.user_avatar}/>
                <View className="title">教职工认证</View>
                <View className="mark">需完成教职工认证后，才可参加校园活动，请联系学校管理员索取口令码：</View>
                <View className="experience">
                    <View className="label">体验版请输入：</View>
                    <View className="value">123456</View>
                </View>
                <Input
                    placeholder='请输入口令码'
                    className='input'
                    placeholderClass='input-placeholder'
                    value={verify_code}
                    type='number'
                    onInput={this.onChange.bind(this)} id='verify_code'
                />
                <View className="submit-btn" onClick={this.checkSchoolCode.bind(this)}>
                    下一步
                </View>
            </View>
        )
    }
}
