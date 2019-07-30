import Nerv from "nervjs";
import Taro, { Component } from "@tarojs/taro-h5";
import { View, Image } from '@tarojs/components';
import { connect } from "@tarojs/redux-h5";
import './index.scss';

export default @connect(({ step_statistics, common, loading }) => ({
  ...step_statistics,
  ...common,
  loading
}))
class Step_statistics extends Component {
  config = {
    navigationBarTitleText: '达标记录'
  };

  state = {
    currentDay: '',
    currentMonth: '',
    currentYear: '',
    weekList: [{ name: '日', className: '' }, { name: '一', className: '' }, { name: '二', className: '' }, { name: '三', className: '' }, { name: '四', className: '' }, { name: '五', className: '' }, { name: '六', className: '' }],
    dayList: []
  };

  componentDidMount = () => {
    this.initCalendar();
  };

  // 获取当前date的当月第一天的字符串形式
  getMonthFirstDate = date => {
    let nowYear = date.getFullYear(); // 获取年份
    let nowMonth = date.getMonth() + 1; // 获取月份
    return `${nowYear}-${nowMonth}-01`;
  };

  // 获取当前date的字符串形式
  getDateString = date => {
    let nowYear = date.getFullYear(); // 获取年份
    let nowMonth = date.getMonth() + 1; // 获取月份
    let day = date.getDate();
    day = day < 10 ? '0' + day : day;
    return `${nowYear}-${nowMonth}-${day}`;
  };

  // 上个月
  preMonth = () => {
    let date = new Date(`${this.state.currentYear}-${this.state.currentMonth}-${this.state.currentDay}`);
    let preMonthFirstDate = new Date(this.getMonthFirstDate(new Date(date.setDate(0)))); // 0 是上个月最后一天
    this.initCalendar(preMonthFirstDate);
  };

  // 下个月
  nextMonth = () => {
    let date = new Date(`${this.state.currentYear}-${this.state.currentMonth}-${this.state.currentDay}`);
    let nextMonthFirstDate = new Date(this.getMonthFirstDate(new Date(date.setDate(33))));
    this.initCalendar(nextMonthFirstDate);
  };

  // 初始化日历
  initCalendar = currentDate => {
    let nowDate = currentDate ? currentDate : new Date();
    let nowMonthFirstDate = this.getMonthFirstDate(nowDate); // 获取当月1号日期
    let nowWeek = new Date(nowMonthFirstDate).getDay() ? new Date(nowMonthFirstDate).getDay() : 7; // 获取星期
    let newDateList = []; // 创建日期数组
    let startDay = 2 - nowWeek; // 开始日期的下标  因为 setDate(0)是上个月最后一天  所以是2-nowWeek
    console.log('startDay', startDay);
    let showDayLength = nowWeek < 6 ? 35 : 42; // 如果5行能显示下一个月 就只显示5行
    // 循环处理 获取日历上应该显示的日期
    for (let i = startDay; i < startDay + showDayLength; i++) {
      let date = new Date(new Date(nowMonthFirstDate).setDate(i)); // 获取时间对象
      let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); // 小于9的数字前面加0
      let dayObject = {
        date: this.getDateString(date),
        day,
        className: ''
        // new Date(str).toDateString() === new Date().toDateString()
      };if (date.toDateString() === new Date().toDateString()) {
        dayObject.className = 'today';
      }
      newDateList.push(dayObject);
    }

    this.setState(pre => {
      return {
        dayList: newDateList,
        currentDay: nowDate.getDate(),
        currentMonth: nowDate.getMonth() + 1 >= 10 ? nowDate.getMonth() + 1 : '0' + (nowDate.getMonth() + 1),
        currentYear: nowDate.getFullYear()
      };
    });
  };

  render() {
    const {} = this.props;
    return <View className="step_statistics-page">
                <View className="calendar">
                    <View className="calendar-header">
                        <View className="calendar-header-left">
                            <Image src={require('../../assets/images/calendar_last.png')} onClick={this.preMonth.bind(this)} />
                        </View>
                        <View className="calendar-header-center">
                            {this.state.currentYear}年{this.state.currentMonth}月
                        </View>
                        <View className="calendar-header-right">
                            <Image src={require('../../assets/images/calendar_next.png')} onClick={this.nextMonth.bind(this)} />
                        </View>
                    </View>
                    <View className="calendar-body">
                        <View className="week-container">
                            {this.state.weekList.map(week => {
              return <View key={week.name} className={`week ${week.className}`}>{week.name}</View>;
            })}
                        </View>
                        <View className="day-container">
                            {this.state.dayList.map((dayObject, index) => {
              return <View key={index} className={`day ${dayObject.className}`}>
                                        <View className="flag">起</View>
                                        <View className="data-wrap">
                                            <View className="date">{dayObject.day}</View>
                                            <View className="steps">8420</View>
                                        </View>
                                    </View>;
            })}
                        </View>
                    </View>
                </View>

                <View className="sum-data">
                    <View className="item">
                        <View className="label">活动目标 : </View>
                        <View className="value">
                            <View className="num">29</View>
                            <View className="unit">次</View>
                        </View>
                    </View>
                    <View className="item">
                        <View className="label">我已达标 : </View>
                        <View className="value">
                            <View className="num">29</View>
                            <View className="unit">次</View>
                        </View>
                    </View>
                </View>
            </View>;
  }

  componentDidMount() {
    super.componentDidMount && super.componentDidMount();
  }

  componentDidShow() {
    super.componentDidShow && super.componentDidShow();
  }

  componentDidHide() {
    super.componentDidHide && super.componentDidHide();
  }

}