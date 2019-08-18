import Taro, {Component} from '@tarojs/taro'
import {Text, View, Image, Button} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import './index.scss'
import {AtProgress} from "taro-ui";

@connect(({my_activity, common, loading}) => ({
    ...my_activity,
    ...common,
    loading
}))
export default class My_activity extends Component {
    config = {
        navigationBarTitleText: '我的活动',
    }

    componentDidShow() {
        if (this.props.is_certified!=1) {
            this.props.dispatch({
                type: 'my_activity/getUserEvent'
            })
        }

    }

    componentDidMount = () => {

    }

    goActivityDetail = (id,event_type) => {
        Taro.navigateTo({
            url: '/pages/activity_detail/index?id='+id+'&event_type='+event_type
        })
    }

    regist = (e) => {
        let detail = e.detail
        if (detail.errMsg == 'getUserInfo:ok') {
            Taro.login().then(res => {
                if (res.code) {
                    let detail = e.detail
                    let payload = {
                        js_code: res.code,
                        encrypted_data: detail.encryptedData,
                        iv: detail.iv,
                        raw_data: detail.rawData,
                        signature: detail.signature,
                        cb:this.login
                    }
                    this.props.dispatch({
                        type: 'common/index_index_register',
                        payload
                    })
                    this.props.dispatch({
                        type: 'common/save',
                        payload: {
                            need_authorization: false
                        }
                    })
                }
            })
        } else {//授权失败
            console.log('授权被拒绝')
        }

    }


    //登录
    login = () => {
        Taro.login().then(res => {
            if (res.code) {
                this.props.dispatch({
                    type: 'common/index_index_login',
                    payload: {
                        js_code: res.code,
                        cb: this.index
                    }
                })
            }
        })
    }

    render() {
        const {activity_data,is_certified} = this.props
        const {now_event, history_event} = activity_data
        console.log('activity_data',activity_data)
        return (
            <View className='my_activity-page'>
                {is_certified==1?(
                    <View className="activity-con">
                        <View className="null">
                            <View className="null-desc">认证学校后可参与校园活动</View>
                        </View>
                        <Button
                            className="create-btn"
                            openType="getUserInfo"
                            onGetUserInfo={this.regist.bind(this)}
                        >
                            授权认证
                        </Button>
                    </View>
                ):(
                    <View>
                        <View className="wrap">

                            {now_event.length>0&&(
                                <View>
                                    <View className="sub-title">
                                        当前活动
                                    </View>
                                    {now_event.map((item, index) => (
                                        <View className="activity-con" key={index} style='margin-bottom:10px;'>
                                            <View className="activity-top">
                                                <View className="name">{item.title}</View>
                                                {item.event_type == 1 && (
                                                    <View className="btn wait">即将开始</View>
                                                )}
                                                {item.event_type == 2 && (
                                                    <View className="btn ing">进行中</View>
                                                )}
                                                {item.event_type == 3 && (
                                                    <View className="btn end">已结束</View>
                                                )}
                                            </View>
                                            <View className="mark">我的达标次数（每日{item.target_step_num}步）：</View>
                                            <View className="activity-footer">
                                                <View className="footer-l">
                                                    <Text>{item.user_num}</Text>
                                                    次
                                                </View>
                                                <View className="footer-r">
                                                    <Text>{item.target_num}</Text>
                                                    次
                                                </View>
                                            </View>
                                            <AtProgress
                                                percent={item.target_num ? (item.user_num / item.target_num) * 100 : 0}
                                                isHidePercent strokeWidth={5}
                                                color='#2f404d'
                                            />

                                            <View className="detail-wrapper">
                                                <View
                                                    className="detail"
                                                    onClick={this.goActivityDetail.bind(this,item.event_id,item.event_type)}
                                                >
                                                    查看详情
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            )}

                            {history_event.length>0&&(
                                <View>
                                    <View className="sub-title">
                                        历史活动
                                    </View>
                                    {history_event.map((item, index) => (
                                        <View className="activity-con" key={index} style='margin-bottom:10px;'>
                                            <View className="activity-top">
                                                <View className="name">{item.title}</View>
                                                {item.event_type == 1 && (
                                                    <View className="btn wait">即将开始</View>
                                                )}
                                                {item.event_type == 2 && (
                                                    <View className="btn ing">进行中</View>
                                                )}
                                                {item.event_type == 3 && (
                                                    <View className="btn end">已结束</View>
                                                )}
                                            </View>
                                            <View className="mark">我的达标次数（每日{item.target_step_num}步）：</View>
                                            <View className="activity-footer">
                                                <View className="footer-l">
                                                    <Text>{item.user_num}</Text>
                                                    次
                                                </View>
                                                <View className="footer-r">
                                                    <Text>{item.target_num}</Text>
                                                    次
                                                </View>
                                            </View>
                                            <AtProgress
                                                percent={item.target_num ? (item.user_num / item.target_num) * 100 : 0}
                                                isHidePercent strokeWidth={5}
                                                color='#2f404d'
                                            />

                                            <View className="detail-wrapper">
                                                <View
                                                    className="detail"
                                                    onClick={this.goActivityDetail.bind(this,item.event_id,item.event_type)}
                                                >
                                                    查看详情
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            )}


                        </View>
                        {JSON.stringify(now_event)=='{}'&&history_event.length<=0&&(
                            <View className="null">
                                <Image className="null-image" src={require('../../assets/images/zanwu.png')} />
                                <View className="null-desc">暂无活动</View>
                            </View>
                        )}
                    </View>
                )}
            </View>
        )
    }
}
