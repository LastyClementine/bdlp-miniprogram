import Taro, {Component} from '@tarojs/taro'
import {View, Image, Picker} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import './index.scss'
import {AtIcon} from 'taro-ui'

@connect(({set_target, common, loading}) => ({
    ...set_target,
    ...common,
    loading
}))
export default class Set_target extends Component {
    config = {
        navigationBarTitleText: '设置目标',
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'set_target/getTargetInfo',
            payload: {}
        })
    }

    componentWillUnmount() {
        const {target_type,target_info} = this.props

        this.props.dispatch({
            type: 'set_target/setTarget',
            payload: {
                target_type: target_type?target_type:target_info.target_type
            }
        })
    }

    onChangeTargetType = (value) => {
        this.props.dispatch({
            type: 'set_target/save',
            payload: {
                target_type: value
            }
        })
    }

    //跳转设置提醒时间
    goSetTime=()=>{
        Taro.navigateTo({
            url: '/pages/set_remind/index'
        })
    }

    render() {
        const {
            target_info,
            target_type
        } = this.props
        const {targets} = target_info
        let targetList = []
        for (let key in targets) {
            targetList.push({
                id: key,
                name: targets[key][0],
                value: targets[key][1],
            })
        }
        return (
            <View className='set_target-page'>
                <View className="sub-title">
                    每日运动目标设置
                </View>
                <View className="radios">
                    {targetList.map((item, index) => (
                        <View className="item" key={index} onClick={this.onChangeTargetType.bind(this, item.id)}>
                            <View className="num">{item.value}</View>
                            <View className="desc">{item.name}</View>
                            {target_type == item.id && (
                                <Image className="check" src={require('../../assets/images/list_choosed.png')}/>
                            )}
                        </View>
                    ))}

                </View>

                <View className="time" onClick={this.goSetTime}>
                    <View className="desc">设置提醒时间</View>
                    <View className="time-r">
                        <View
                            className="status"
                        >
                            {target_info.is_remind ? target_info.remind_hour + ':' + target_info.remind_minute : '未开启'}
                        </View>
                        <AtIcon
                            value='chevron-right'
                            size='24'
                            color='#c4c4c7'
                            className='chevron-right'
                        />
                    </View>
                </View>
            </View>
        )
    }
}
