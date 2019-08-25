import Taro, {Component} from '@tarojs/taro'
import {Text, View, Image} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import './index.scss'
import moment from 'moment'

@connect(({step_statistics, common, loading}) => ({
    ...step_statistics,
    ...common,
    loading
}))
export default class Step_statistics extends Component {
    config = {
        navigationBarTitleText: '达标记录',
    }


    state = {
        weekList: [
            {name: '日', className: ''},
            {name: '一', className: ''},
            {name: '二', className: ''},
            {name: '三', className: ''},
            {name: '四', className: ''},
            {name: '五', className: ''},
            {name: '六', className: ''},
        ],
        curYear: new Date().getFullYear(),
        curMonth: new Date().getMonth(),
        curDate: new Date().getDate(),
        dayList: [],
    }

    componentDidMount = () => {
        this.initCalendar(this.state.curYear, this.state.curMonth)
        this.achieveRecord()
    }

    //达标记录数据
    achieveRecord = () => {
        const {curMonth, curYear} = this.state
        this.props.dispatch({
            type: 'step_statistics/achieveRecord',
            payload: {
                month: curMonth + 1,
                year: curYear,
                event_id: this.$router.params.id
            }

        })
    }


    //判断是否是闰年
    isLeapYear = (year) => {
        return (year % 400 === 0) || ((year % 4 === 0) && (year % 100 !== 0))
    }

    initCalendar = (curYear, curMonth) => {
        let daysInMonth = [31, this.isLeapYear(curYear) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let firstDayInMonth = new Date(curYear, curMonth, 1),
            firstDayWeek = firstDayInMonth.getDay();
        let calendarRows = Math.ceil((firstDayWeek + daysInMonth[curMonth]) / 7);
        let rows = [];
        for (let i = 0; i < calendarRows; i++) {
            rows[i] = [];
            for (let j = 0; j < 7; j++) {
                let idx = i * 7 + j,
                    date = idx - firstDayWeek + 1;
                if (date <= 0 || date > daysInMonth[curMonth]) {
                    rows[i].push('')
                } else if (date === this.state.curDate) {
                    rows[i].push(date)
                } else {
                    rows[i].push(date)
                }
            }
        }
        this.setState({
            dayList: rows
        })
    }

    nextMonth = () => {
        let {curMonth, curYear} = this.state
        curMonth = curMonth + 1
        if (curMonth > 11) {
            curMonth = 0
            curYear = curYear + 1
        }
        this.setState({
            curMonth, curYear
        }, () => {
            this.initCalendar(curYear, curMonth)
            this.achieveRecord()
        })

    }

    preMonth = () => {
        let {curMonth, curYear} = this.state
        curMonth = curMonth - 1
        if (curMonth < 0) {
            curMonth = 11
            curYear = curYear - 1
        }
        this.setState({
            curMonth, curYear
        }, () => {
            this.initCalendar(curYear, curMonth)
            this.achieveRecord()
        })
    }

    render() {
        const {month_data} = this.props
        let {month_run_record} = month_data
        const target_step_num=month_data.target_step_num||0
        const {curMonth, curYear, dayList} = this.state
        return (
            <View className='step_statistics-page'>
                <View className='calendar'>
                    <View className='calendar-header'>
                        <View className='calendar-header-left'>
                            <Image
                                src={require('../../assets/images/calendar_last.png')}
                                onClick={this.preMonth.bind(this)}/>
                        </View>
                        <View className='calendar-header-center'>
                            {curYear}年{curMonth + 1}月
                        </View>
                        <View className='calendar-header-right'>
                            <Image
                                src={require('../../assets/images/calendar_next.png')}
                                onClick={this.nextMonth.bind(this)}/>
                        </View>
                    </View>
                    <View className='calendar-body'>
                        <View className='week-container'>
                            {this.state.weekList.map(week => {
                                return <View key={week.name} className={`week ${week.className}`}>{week.name}</View>
                            })}
                        </View>
                        <View className='day-container'>
                            {dayList.map((item, index) => (
                                <View className="row" key={index}>
                                    {item.map((it, idx) => {
                                        return (
                                            <View key={idx} className='day'>
                                                {(it && month_run_record[it * 1 - 1]) && (moment(month_run_record[it * 1 - 1].date * 1000).format('YYYY-MM-DD') == moment(month_data.event_start_time * 1000).format('YYYY-MM-DD')) && (
                                                    <View className="flag start">
                                                        始
                                                    </View>
                                                )}
                                                {(it && month_run_record[it * 1 - 1]) && (moment(month_run_record[it * 1 - 1].date * 1000).format('YYYY-MM-DD') == moment(month_data.event_end_time * 1000).format('YYYY-MM-DD')) && (
                                                    <View className="flag start">
                                                        终
                                                    </View>
                                                )}
                                                {it && (
                                                    <View className="data-wrap">
                                                        <View className="date">{it}</View>
                                                        <View className="steps">
                                                            {month_run_record[it * 1 - 1].is_active ? (
                                                                <Text>{(month_run_record[it * 1 - 1].step_num)>target_step_num?(
                                                                    <Text>{month_run_record[it * 1 - 1].step_num}</Text>
                                                                ):(
                                                                    <Text style='color:#999;'>{month_run_record[it * 1 - 1].step_num}</Text>
                                                                )}</Text>
                                                            ) : (
                                                                <Text style='color:#888888;'>—</Text>
                                                            )}

                                                        </View>
                                                    </View>
                                                )}
                                            </View>
                                        )
                                    })}
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                <View className="sum-data">
                    <View className="item">
                        <View className="label">活动目标 : </View>
                        <View className="value">
                            <View className="num">{month_data.target_num}</View>
                            <View className="unit">次</View>
                        </View>
                    </View>
                    <View className="item">
                        <View className="label">我已达标 : </View>
                        <View className="value">
                            <View className="num">{month_data.user_achieve_num}</View>
                            <View className="unit">次</View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
