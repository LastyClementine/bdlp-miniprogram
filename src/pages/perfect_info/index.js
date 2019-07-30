import Taro, {Component} from '@tarojs/taro'
import {View, Input, Text, Picker} from '@tarojs/components'
import {AtIcon} from 'taro-ui'
import {connect} from '@tarojs/redux'
import './index.scss'

@connect(({perfect_info, common, loading}) => ({
    ...perfect_info,
    ...common,
    loading
}))
export default class Perfect_info extends Component {
    config = {
        navigationBarTitleText: '完善信息',
    }

    componentDidMount = () => {
        this.getCodeSchoolInfo()
    }

    getCodeSchoolInfo = () => {
        this.props.dispatch({
            type: 'common/getCodeSchoolInfo',
            payload: {}
        })
    }


    onChange = (e) => {
        const {value} = e.detail
        const key = e.target.id
        this.props.dispatch({
            type: 'perfect_info/save',
            payload: {
                [`${key}`]: value,
            }
        })
    }

    submit = () => {
        const {
            shcool_info,
            department_id,
            name,
            card_id,
            gender,
            gender_list
        } = this.props
        const department_list = shcool_info.department_list
        if (!department_id) {
            Taro.showToast({title: '请选择部门！', icon: 'none'})
            return
        }

        if (!name) {
            Taro.showToast({title: '请填写姓名！', icon: 'none'})
            return
        }

        if (!card_id) {
            Taro.showToast({title: '请填写工号！', icon: 'none'})
            return
        }

        if (!gender) {
            Taro.showToast({title: '请选择性别！', icon: 'none'})
            return
        }


        Taro.showModal({
            title:'提示',
            content:"信息提交后不可更改，请确认填写正确！",
        })
            .then(res=>{
                this.props.dispatch({
                    type: 'perfect_info/checkUserSchoolInfo',
                    payload: {
                        department_id:department_list[department_id].id,
                        name,
                        card_id,
                        gender:gender_list[gender].id
                    }
                })
            })

    }

    render() {
        const {
            shcool_info,
            department_id,
            name,
            card_id,
            gender,
            gender_list
        } = this.props
        const department_list = shcool_info.department_list
        return (
            <View className='perfect_info-page'>
                <View className="block">
                    <View className="form-item">
                        <View className="label">学校</View>
                        <Input
                            value={shcool_info.school_name}
                            disabled
                            placeholderClass='placeholder'
                            className="value"/>
                    </View>
                    <View className="form-item">
                        <View className="label">部门</View>

                        <Picker
                            className="value"
                            rangeKey='name'
                            id='department_id'
                            range={department_list}
                            onChange={this.onChange.bind(this)}
                        >

                            {department_id ? (
                                <View className="value">{department_list[department_id].name}</View>
                            ) : (
                                <View className="placeholder">请选择部门</View>
                            )}
                        </Picker>
                        <AtIcon value='chevron-right' size='24' color='#c4c4c7' className='chevron-right'></AtIcon>
                    </View>
                </View>

                <View className="block">
                    <View className="form-item">
                        <View className="label">姓名</View>
                        <Input
                            id='name'
                            value={name}
                            onInput={this.onChange.bind(this)}
                            placeholderClass='placeholder'
                            className="value"
                            placeholder='请输入姓名'/>
                    </View>
                    <View className="form-item">
                        <View className="label">工号</View>
                        <Input
                            id='card_id'
                            value={card_id}
                            onInput={this.onChange.bind(this)}
                            placeholderClass='placeholder'
                            className="value"
                            placeholder='请输入工号'/>
                    </View>
                </View>

                <View className="block">
                    <View className="form-item">
                        <View className="label">性别</View>
                        <Picker
                            className="value"
                            rangeKey='name'
                            id='gender'
                            range={gender_list}
                            onChange={this.onChange.bind(this)}
                        >
                            {gender ? (
                                <View className="value">{gender_list[gender].name}</View>
                            ) : (
                                <View className="placeholder">请选择性别</View>
                            )}
                        </Picker>
                        <AtIcon value='chevron-right' size='24' color='#c4c4c7' className='chevron-right'></AtIcon>
                    </View>
                </View>

                <View className="mark">
                    提交认证即代表您已查看并同意
                    <Text>《用户协议》</Text>
                </View>

                <View className="submit-btn" onClick={this.submit.bind(this)}>
                    下一步
                </View>
            </View>
        )
    }
}
