import Taro, {Component} from '@tarojs/taro'
import {View, Switch, Picker} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import './index.scss'
import {AtIcon} from "taro-ui";

@connect(({set_remind, common, set_target, loading}) => ({
    ...set_remind,
    ...set_target,
    ...common,
    loading
}))
export default class Set_remind extends Component {
    config = {
        navigationBarTitleText: '设置提醒',
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'set_target/getTargetInfo',
            payload: {}
        })
    }

    componentWillUnmount() {
        const {is_remind, remind_time, target_info} = this.props

        console.log('is_remind', is_remind)
        this.props.dispatch({
            type: 'set_remind/setRemind',
            payload: {
                is_remind: (is_remind ? is_remind * 1 : 1).toString(),
                remind_hour: remind_time ? remind_time.split(':')[0] : target_info.remind_hour,
                remind_minute: remind_time ? remind_time.split(':')[1] : target_info.remind_minute,
            }
        })
    }

    onTimeChange = e => {
        this.props.dispatch({
            type: 'set_remind/save',
            payload: {
                remind_time: e.detail.value
            }
        })
    }

    onSwitchChange = e => {
        console.log(e)
        this.props.dispatch({
            type: 'set_remind/save',
            payload: {
                is_remind: e.detail.value ? '1' : '0'
            }
        })
    }


    render() {
        const {
            target_info,
            remind_time,
        } = this.props
        console.log('target_info',target_info)
        console.log('remind_time',remind_time)
        return (
            <View className='set_remind-page'>
                <View className="sub-title">
                    每日运动提醒
                </View>
                <View className="list" style="margin-top:0;">
                    <View className="item">
                        <View className="list-l">开启推送提醒</View>
                        <Switch checked={target_info.is_remind} onChange={this.onSwitchChange}/>
                    </View>
                </View>


                <View className="list">
                    <Picker
                        mode='time'
                        onChange={this.onTimeChange}
                        value={target_info.remind_hour + ':' + target_info.remind_minute}
                    >
                        <View className="item">
                            <View className="list-l">设置提醒时间</View>
                            <View
                                className="list-c font-gray"
                            >
                                {remind_time ? ('每天' + remind_time) : '未开启' }
                            </View>
                            <AtIcon value='chevron-right' size='16' color='#b3b3b3' className='chevron-right'></AtIcon>
                        </View>
                    </Picker>

                </View>
            </View>
        )
    }
}
