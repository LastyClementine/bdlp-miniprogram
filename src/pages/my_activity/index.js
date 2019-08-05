import Taro, {Component} from '@tarojs/taro'
import {Text, View,Image} from '@tarojs/components'
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
        this.props.dispatch({
            type: 'my_activity/getUserEvent'
        })
    }

    componentDidMount = () => {

    }

    goActivityDetail = (id,event_type) => {
        Taro.navigateTo({
            url: '/pages/activity_detail/index?id='+id+'&event_type='+event_type
        })
    }

    render() {
        const {activity_data} = this.props
        const {now_event, history_event} = activity_data
        console.log('activity_data',activity_data)
        return (
            <View className='my_activity-page'>
                <View className="wrap">
                    <View className="sub-title">
                        当前活动
                    </View>
                    <View className="activity-con">
                        <View className="activity-top">
                            <View className="name">{now_event.title}</View>
                            {now_event.event_type == 1 && (
                                <View className="btn wait">即将开始</View>
                            )}
                            {now_event.event_type == 2 && (
                                <View className="btn ing">进行中</View>
                            )}
                            {now_event.event_type == 3 && (
                                <View className="btn end">已结束</View>
                            )}
                        </View>
                        <View className="mark">我的达标次数（每日{now_event.target_step_num}步）：</View>
                        <View className="activity-footer">
                            <View className="footer-l">
                                <Text>{now_event.user_num}</Text>
                                次
                            </View>
                            <View className="footer-r">
                                <Text>{now_event.target_num}</Text>
                                次
                            </View>
                        </View>
                        <AtProgress
                            percent={now_event.target_num ? (now_event.user_num / now_event.target_num) * 100 : 0}
                            isHidePercent strokeWidth={5} color='#2f404d'/>

                        <View className="detail-wrapper">
                            <View className="detail"
                                  onClick={this.goActivityDetail.bind(this,now_event.event_id,now_event.event_type)}
                            >
                                查看详情
                            </View>
                        </View>
                    </View>
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

                {JSON.stringify(now_event)=='{}'&&history_event.length<=0&&(
                    <View className="null">
                        <Image className="null-image" src={require('../../assets/images/zanwu.png')} />
                        <View className="null-desc">暂无活动</View>
                    </View>
                )}

            </View>
        )
    }
}
