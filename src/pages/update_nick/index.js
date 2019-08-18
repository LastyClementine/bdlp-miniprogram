import Taro, {Component} from '@tarojs/taro'
import {View, Input, Button, Image} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import './index.scss'

@connect(({update_nick, common, loading}) => ({
    ...update_nick,
    ...common,
    loading
}))
export default class Update_nick extends Component {
    config = {
        navigationBarTitleText: '修改昵称',
    }

    componentDidMount = () => {
        this.props.dispatch({
            type:'update_nick/save',
            payload:{
                nick_name:this.$router.params.nickname
            }
        })
    }

    onChange = (e) => {
        const {value} = e.detail
        const key = e.target.id
        if (value.length > 6) {
            value.substring(0, 5)
        }
        this.props.dispatch({
            type: 'update_nick/save',
            payload: {
                [`${key}`]: value,
            }
        })
    }


    clear = () => {
        this.props.dispatch({
            type: 'update_nick/save',
            payload: {
                nick_name: '',
            }
        })
    }

    submit = () => {
        if (!this.props.nick_name) {
            Taro.showToast({title: '请填写昵称！', icon: 'none'})
            return
        }
        this.props.dispatch({
            type: 'update_nick/editUserNickName',
            payload: {
                nick_name: this.props.nick_name,
            }
        })
    }

    render() {
        const {
            nick_name
        } = this.props
        return (
            <View className='update_nick-page'>
                <View className="input-con">
                    <Input
                        maxLength={6}
                        value={nick_name}
                        id='nick_name'
                        onInput={this.onChange.bind(this)}
                        placeholder={'请输入昵称'}
                    />
                    {nick_name.length > 0 && (
                        <Image src={require('../../assets/images/input_reset.png')} className="clear"
                               onClick={this.clear.bind(this)}/>
                    )}

                </View>
                <View className="note">还可输入{6 - nick_name.length}个字</View>
                <Button onClick={this.submit}>确认修改</Button>
            </View>
        )
    }
}
