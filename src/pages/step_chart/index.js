import Taro, {Component} from '@tarojs/taro'
import {View, Text, Picker} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import './index.scss'
import {AtIcon} from "taro-ui";
import PieChart from "../../components/PieChart"
import BarChart from "../../components/BarChart"

@connect(({step_chart, common, loading}) => ({
    ...step_chart,
    ...common,
    loading
}))
export default class Step_chart extends Component {
    config = {
        navigationBarTitleText: '步数统计',
    }

    componentDidMount = () => {
        const barChartData = {
            dimensions: {
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            measures: [{
                data: [10, 52, 200, 334, 390, 330, 220]
            }]
        }

        console.log('fadfadfdsfasd',this.barChart)
        this.barChart.refresh(barChartData);
        const pieChartData = [
            {value: 9, name: '9天'},
            {value: 14, name: '14天'},
            {value: 20, name: '20天'},
            {value: 12, name: '12天'},
        ];
        this.pieChart.refresh(pieChartData);



        this.monthlyStat()
    }

    refPieChart = (node) => this.pieChart = node
    refBarChart = (node) => this.barChart = node
    //获取数据
    monthlyStat = () => {
        const {month} = this.props
        this.props.dispatch({
            type: 'step_chart/monthlyStat',
            payload: {
                month
            }
        })
    }


    onMonthChange = e => {
        this.props.dispatch({
            type: 'step_chart/save',
            payload: {
                month: new Date(e.detail.value).getMonth()+1
            }
        })
        this.monthlyStat()
    }

    render() {
        const {
            month_data,
            month
        } = this.props
        return (
            <View className='step_chart-page'>
                <View className="bar-chart">
                    <BarChart ref={this.refBarChart} />
                </View>

                <View className="sum-wrapper">
                    <View className="title">
                        <View className="title-l">{month}月总步数：</View>
                        <Picker
                            className="title-r"
                            mode='date'
                            fields='month'
                            onChange={this.onMonthChange}
                        >
                            筛选时间
                            <AtIcon value='chevron-down' size='12' color='#c4c4c7' className='chevron-down'></AtIcon>
                        </Picker>

                    </View>
                    <View className="con">
                        <Text className='num'>{month_data.month_sum_step}</Text>
                        <Text className="unit">步</Text>
                    </View>
                </View>

                <View className="pie-chart">
                    <View className="title">7月步数分布图</View>
                    <View className="content">
                        <View className="chart">
                            <PieChart ref={this.refPieChart} />
                        </View>
                        <View className="line"></View>
                        <View className="sum">
                            <View className="item">
                                <View className="name">本月累计</View>
                                <View className="value">
                                    <Text className="num">{month_data.month_sum_step}</Text>
                                    <Text className="unit">步</Text>
                                </View>
                            </View>
                            <View className="item">
                                <View className="name">本月最高</View>
                                <View className="value">
                                    <Text className="num">{month_data.month_max}</Text>
                                    <Text className="unit">步</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className="footer">
                        <View className="item">
                            <View className="dot" style='background-color: #f14864;'></View>
                            <View className="desc">6000步以下</View>
                        </View>
                        <View className="item">
                            <View className="dot" style='background-color: #1890ff;'></View>
                            <View className="desc">6000~8000步</View>
                        </View>
                        <View className="item">
                            <View className="dot" style='background-color: #2fc25b;'></View>
                            <View className="desc">8000~10000步</View>
                        </View>
                        <View className="item">
                            <View className="dot" style='background-color: #facd13;'></View>
                            <View className="desc">10000步以上</View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
