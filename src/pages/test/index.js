import Taro, {Component} from '@tarojs/taro'
import {View, Button, Canvas} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import './index.scss'

@connect(({test, common, loading}) => ({
    ...test,
    ...common,
    loading
}))
export default class Test extends Component {
    config = {
        navigationBarTitleText: 'test',
    }


    state = {
        currentDay: '',
        currentMonth: '',
        currentYear: '',
        weekList: [
            {name: '日', className: ''},
            {name: '一', className: ''},
            {name: '二', className: ''},
            {name: '三', className: ''},
            {name: '四', className: ''},
            {name: '五', className: ''},
            {name: '六', className: ''},
        ],
        dayList: []
    }

    componentDidMount() {
        this.initCalendar()

        this.circleInit()
    }

    // 获取当前date的当月第一天的字符串形式
    getMonthFirstDate = (date) => {
        let nowYear = date.getFullYear(); // 获取年份
        let nowMonth = date.getMonth() + 1; // 获取月份
        return `${nowYear}-${nowMonth}-01`
    }

    // 获取当前date的字符串形式
    getDateString = (date) => {
        let nowYear = date.getFullYear(); // 获取年份
        let nowMonth = date.getMonth() + 1; // 获取月份
        let day = date.getDate();
        day = day < 10 ? '0' + day : day;
        return `${nowYear}-${nowMonth}-${day}`
    }

    // 上个月
    preMonth = () => {
        let date = new Date(`${this.state.currentYear}-${this.state.currentMonth}-${this.state.currentDay}`)
        let preMonthFirstDate = new Date(this.getMonthFirstDate(new Date(date.setDate(0)))); // 0 是上个月最后一天
        this.initCalendar(preMonthFirstDate)
    }

    // 下个月
    nextMonth = () => {
        let date = new Date(`${this.state.currentYear}-${this.state.currentMonth}-${this.state.currentDay}`)
        let nextMonthFirstDate = new Date(this.getMonthFirstDate(new Date(date.setDate(33))));
        this.initCalendar(nextMonthFirstDate)
    }

    // 初始化日历
    initCalendar = (currentDate) => {
        let nowDate = currentDate ? currentDate : new Date();
        let nowMonthFirstDate = this.getMonthFirstDate(nowDate) // 获取当月1号日期
        let nowWeek = new Date(nowMonthFirstDate).getDay() ? new Date(nowMonthFirstDate).getDay() : 7; // 获取当月第一天星期几
        let newDateList = []; // 创建日期数组
        let startDay = 1 - nowWeek; // 开始日期的下标  因为 setDate(0)是上个月最后一天  所以是2-nowWeek
    
        console.log('当月1号日期',nowMonthFirstDate)
        console.log('当月第一天星期几',nowWeek)
        console.log('开始日期的下标',startDay)

        let showDayLength = nowWeek <6 ? 35 : 42;  // 如果5行能显示下一个月 就只显示5行
        // 循环处理 获取日历上应该显示的日期
        for (let i = startDay; i < startDay + showDayLength; i++) {
           
            let date = new Date(new Date(nowMonthFirstDate).setDate(i)); // 获取时间对象

            let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() // 小于9的数字前面加0
            let dayObject = {
                date: this.getDateString(date),
                day,
                className: '',
            }
            // new Date(str).toDateString() === new Date().toDateString()
            if (date.toDateString() === new Date().toDateString()) {
                dayObject.className = 'today'
            }
            newDateList.push(dayObject)
        }

        this.setState((pre) => {
            return {
                dayList: newDateList,
                currentDay: nowDate.getDate(),
                currentMonth: nowDate.getMonth() + 1 >= 10 ? nowDate.getMonth() + 1 : '0' + (nowDate.getMonth() + 1),
                currentYear: nowDate.getFullYear(),
            }
        })

    }


    //画圆圈

    circleInit = () => {
        var cxt_arc = Taro.createCanvasContext('canvasCircle');
        cxt_arc.setLineWidth(6);
        cxt_arc.setStrokeStyle('#eaeaea');
        cxt_arc.setLineCap('round');
        cxt_arc.beginPath();
        cxt_arc.arc(100, 100, 96, 0, 2 * Math.PI, false);
        cxt_arc.stroke();
        cxt_arc.draw();
    }

    drawCircle = () => {
        var ctx = Taro.createCanvasContext('canvasArcCir');

        function drawArc(s, e) {
            ctx.setFillStyle('white');
            ctx.clearRect(0, 0, 200, 200);
            ctx.draw();
            var x = 100, y = 100, radius = 96;
            ctx.setLineWidth(5);
            ctx.setStrokeStyle('#d81e06');
            ctx.setLineCap('round');
            ctx.beginPath();
            ctx.arc(x, y, radius, s, e, false);
            ctx.stroke()
            ctx.draw()
        }

        var startAngle = 1.5 * Math.PI, endAngle = (1.5 + 2 * 0.8) * Math.PI
        drawArc(startAngle, endAngle)
    }


    render() {
        return (
            <View className='test-page'>
                <View className='calendar'>
                    <View className='calendar-header'>
                        <View className='calendar-header-left'>
                            <Button onClick={this.preMonth.bind(this)}>上个月</Button>
                        </View>
                        <View className=''>
                            {this.state.currentYear}年{this.state.currentMonth}月
                        </View>
                        <View className='calendar-header-right'>
                            <Button onClick={this.nextMonth.bind(this)}>下个月</Button>
                        </View>
                    </View>
                    <View className='calendar-body'>
                        <View className='week-container'>
                            {this.state.weekList.map(week => {
                                return <View key={week.name} className={`week ${week.className}`}>{week.name}</View>
                            })}
                        </View>
                        <View className='day-container'>
                            {this.state.dayList.map((dayObject, index) => {
                                return <View key={index} className={`day ${dayObject.className}`}>{dayObject.day}</View>
                            })}
                        </View>
                    </View>
                </View>


                {/*圆环*/}
                <View className="wrap">
                    <View className="circle-box">
                        <Canvas
                            className="circle" style="z-index: -99; width:200px; height:200px;"
                            canvasId="canvasCircle"
                        >
                        </Canvas>
                        <Canvas
                            className="circle"
                            style="width:200px; height:200px;"
                            canvasId="canvasArcCir"
                        >
                        </Canvas>
                        <View className="draw_btn" onClick={this.drawCircle.bind(this)}>开始动态绘制</View>
                    </View>
                </View>
            </View>
        )
    }
}
