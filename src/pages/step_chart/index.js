import Taro, {Component} from '@tarojs/taro'
import {View, Text, Picker, ScrollView} from '@tarojs/components'
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

    state = {
        unit: 0
    }

    componentDidMount = () => {
        const pieChartData = [
            {value: 9, name: '9天'},
            {value: 14, name: '14天'},
            {value: 20, name: '20天'},
            {value: 12, name: '12天'},
        ];

        Taro.getSystemInfo()
            .then(res => {
                this.setState({
                    unit: res.windowWidth / 375
                }, () => {

                })
            })

        //初始化表格
        this.pieChart.refresh(pieChartData);

        //获取月统计数据
        this.monthlyStat()
    }

    refPieChart = (node) => this.pieChart = node

    //获取数据
    monthlyStat = () => {
        const {month, year} = this.props
        this.props.dispatch({
            type: 'step_chart/monthlyStat',
            payload: {
                month,
                year
            }
        })
    }

    onMonthChange = e => {
        this.props.dispatch({
            type: 'step_chart/save',
            payload: {
                month: new Date(e.detail.value).getMonth() + 1,
                year: new Date(e.detail.value).getFullYear()
            }
        })
        this.monthlyStat()
    }


    formatDate = (date) => {
        date = date * 1000
        let month = new Date(date).getMonth() + 1
        let day = new Date(date).getDate()
        var week = new Date(date).getDay();//获取存储当前日期
        var weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        return {
            day: month + '/' + day,
            week: weekday[week]
        }
    }

    //计算高度
    calcHeight = (data) => {
        let arr = []
        let max
        for (let i in data) {
            arr.push(data[i].step_num)
        }
        if (arr.length > 0) {
            arr.sort()
            max = arr[arr.length - 1]
        }
        return max || 0
    }

    render() {
        const {
            month_data_chart,
            month,
            year
        } = this.props
        const {month_run_record} = month_data_chart
        let max = this.calcHeight(month_run_record)
        console.log('month_data_chart', month_data_chart)
        return (
            <View className='step_chart-page'>
                <View className="bar-chart">

                    <ScrollView
                        className='scroll-view'
                        scrollX
                        scrollWithAnimation
                    >
                        {month_run_record.map((item, index) => (
                            <View className="item" key={item.date}>
                                <View className="line"></View>
                                <View className="date">
                                    <View className="day">{this.formatDate(item.date).day}</View>
                                    <View className="week">{this.formatDate(item.date).week}</View>
                                </View>
                                {max&&(
                                    <View className="bar-wrapper">
                                        <View className="bar" style={'height:' + (item.step_num / max) * 100 + '%;'}>
                                            {item.step_num}
                                        </View>
                                    </View>
                                )}

                            </View>
                        ))}
                    </ScrollView>
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
                        <Text className='num'>{month_data_chart.month_sum_step}</Text>
                        <Text className="unit">步</Text>
                    </View>
                </View>

                <View className="pie-chart">
                    <View className="title">7月步数分布图</View>
                    <View className="content">
                        <View className="chart">
                            <PieChart ref={this.refPieChart}/>
                        </View>
                        <View className="line"></View>
                        <View className="sum">
                            <View className="item">
                                <View className="name">本月累计</View>
                                <View className="value">
                                    <Text className="num">{month_data_chart.month_sum_step}</Text>
                                    <Text className="unit">步</Text>
                                </View>
                            </View>
                            <View className="item">
                                <View className="name">本月最高</View>
                                <View className="value">
                                    <Text className="num">{month_data_chart.month_max}</Text>
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
