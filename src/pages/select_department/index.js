import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {AtRadio} from 'taro-ui'
import './index.scss'

@connect(({select_department, common, loading}) => ({
    ...select_department,
    ...common,
    loading
}))
export default class Select_department extends Component {
    config = {
        navigationBarTitleText: '选择部门',
    }

    state = {
        value: ''
    }

    componentDidMount = () => {

    }


    handleChange(value) {
        this.setState({
            value
        })
    }

    render() {
        const {} = this.props
        return (
            <View className='select_department-page'>
                <AtRadio
                    className='dpt-radio'
                    options={[
                        {label: '单选项一', value: 'option1'},
                        {label: '单选项二', value: 'option2'},
                        {label: '单选项二', value: 'option3'},
                        {label: '单选项二', value: 'option4'},
                        {label: '单选项二', value: 'option5'},
                    ]}
                    value={this.state.value}
                    onClick={this.handleChange.bind(this)}
                />
            </View>
        )
    }
}
