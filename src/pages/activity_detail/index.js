import Taro, {Component} from '@tarojs/taro'
import {View, Text, Picker, Image} from '@tarojs/components'
import {AtIcon} from 'taro-ui'
import {connect} from '@tarojs/redux'
import './index.scss'

@connect(({activity_detail, common, loading}) => ({
    ...activity_detail,
    ...common,
    loading
}))
export default class Activity_detail extends Component {
    config = {
        navigationBarTitleText: '活动详情',
        navigationBarBackgroundColor: '#0bad61',
        navigationBarTextStyle: 'white',
        backgroundColorBottom: '#0bad61',
        backgroundColor: '#0bad61'
    }

    componentDidMount = () => {
        this.getDetailData(this.$router.params.id)
        const event_type = this.$router.params.event_type
        if (event_type == 2 ) {
            this.getEventRank()
        }
        if(event_type == 3){
            this.props.dispatch({
                type:'activity_detail/save',
                payload:{
                    rank_type:3
                }
            })
            this.getEventRank()
        }

    }

    componentWillUnmount() {
        this.props.dispatch({
            type:'activity_detail/save',
            payload:{
                scope_type:'0',//数据类型
                rank_type:1,//排名类型
            }
        })
    }

    getDetailData = (id) => {
        this.props.dispatch({
            type: 'activity_detail/detail',
            payload: {
                event_id: id
            }
        })
    }

    goActivityInfo = () => {
        Taro.navigateTo({
            url: '/pages/activity_info/index'
        })
    }

    onPickerChange = (e) => {
        const {value} = e.detail
        const key = e.target.id
        this.props.dispatch({
            type: 'activity_detail/save',
            payload: {
                [`${key}`]: value,
            }
        })

        this.getEventRank()
    }

    onTabChange = (value) => {
        this.props.dispatch({
            type: 'activity_detail/save',
            payload: {
                rank_type: value
            }
        })
        this.getEventRank()
    }

    getEventRank = () => {
        const {
            scope_type,
            rank_type,
            all_scope_type
        } = this.props
        this.props.dispatch({
            type: 'activity_detail/getEventRank',
            payload: {
                event_id: this.$router.params.id,
                scope_type: all_scope_type[scope_type].value,
                rank_type: rank_type
            }
        })
    }

    goStepStatistics = () => {
        Taro.navigateTo({
            url: '/pages/step_statistics/index?id=' + this.$router.params.id
        })
    }

    formatDate = (date) => {
        date = date * 1000
        let year = new Date(date).getFullYear()
        let month = new Date(date).getMonth() + 1
        let day = new Date(date).getDate()
        return year + '.' + month + '.' + day
    }

    render() {
        const {
            detail_data,
            scope_type,
            rank_type,
            rank_data,
            all_scope_type
        } = this.props
        const {user_rank, today_rank, achieve_num} = rank_data
        let rank = today_rank||[]
        console.log('rank_data',rank_data,detail_data)
        const {event_type} = this.$router.params
        //活动类型为 达标率排名 并且是进行中的状态
        if (rank_type == '3' && event_type == 2) {
            rank = rank_data.rank||[]
        }
        let start_time = this.formatDate(detail_data.start_time)
        let end_time = this.formatDate(detail_data.end_time)
        return (
            <View className='activity_detail-page'>
                <View className="info">
                    <View className="info-item">
                        {/*<View className="label">活动名称：</View>*/}
                        <View className="desc title">{detail_data.title}</View>
                    </View>
                    <View className="info-item">
                        <View className="label">活动日期：</View>
                        <View className="desc subTitle">{start_time}-{end_time}</View>
                    </View>
                    <View className="info-item">
                        <View className="label">活动目标：</View>
                        <View className="desc subTitle">
                            每日{detail_data.target_step_num}步为目标，共需达标{detail_data.target_num}次
                        </View>
                    </View>
                    <View className="btns" >
                        <View className="btn" onClick={this.goActivityInfo}>活动介绍</View>
                        <View className="btn" onClick={this.goStepStatistics}>达标记录</View>
                    </View>
                </View>
                <View className="opt-bar" onClick={this.goStepStatistics}>
                    <View className="name">达标记录</View>
                    <AtIcon value='chevron-right' size='18' color='#c4c4c7' className='chevron-right'></AtIcon>
                </View>
                <View className="ranking">
                    <View className="title">活动排名</View>
                    {/*即将开始*/}
                    {event_type == 1 && (
                        <View className="null">
                            <View className="desc">暂无活动排名</View>
                            <View className="desc">活动开始后会在此处显示排名数据</View>
                        </View>
                    )}

                    {/*进行中*/}
                    {event_type == 2 && (
                        <View>
                            <Picker
                                className="filter"
                                rangeKey='name'
                                id='scope_type'
                                range={all_scope_type}
                                onChange={this.onPickerChange.bind(this)}
                            >
                                {all_scope_type[scope_type].name}数据
                                <AtIcon
                                    value='chevron-down'
                                    size='14'
                                    color='#00ad5a'
                                    className='chevron-down'/>
                            </Picker>
                            <View className="sum-data">
                                <View className="sum-it">
                                    <View className="label">今日达标：</View>
                                    <View className="value">
                                        <Text>{rank_data.today_achieve_num}</Text>
                                        人
                                    </View>
                                </View>
                                <View className="sum-it">
                                    <View className="label">昨日达标 ：</View>
                                    <View className="value">
                                        <Text>{rank_data.yesterday_achieve_num}</Text>
                                        人
                                    </View>
                                </View>
                            </View>

                            {/*tab区域*/}
                            <View className="tabs">
                                <View
                                    className={rank_type == 1 ? 'tab tab--active' : 'tab'}
                                    onClick={this.onTabChange.bind(this, 1)}
                                >
                                    今日排名
                                    {rank_type == 1 && <View className="active-bar"></View>}
                                </View>
                                <View
                                    className={rank_type == 2 ? 'tab tab--active' : 'tab'}
                                    onClick={this.onTabChange.bind(this, 2)}
                                >
                                    昨日排名
                                    {rank_type == 2 && <View className="active-bar"></View>}
                                </View>
                                <View
                                    className={rank_type == 3 ? 'tab tab--active' : 'tab'}
                                    onClick={this.onTabChange.bind(this, 3)}
                                >
                                    达标率排名
                                    {rank_type == 3 && <View className="active-bar"></View>}
                                </View>
                            </View>
                            <View className="content">
                                <View className="item me">
                                    <View className="item-l">
                                        {user_rank.rank == 1 && (
                                            <Image className="index"
                                                   src={require('../../assets/images/gold_medal.png')}/>
                                        )}
                                        {user_rank.rank == 2 && (
                                            <Image className="index"
                                                   src={require('../../assets/images/silver_medal.png')}/>
                                        )}
                                        {user_rank.rank == 3 && (
                                            <Image className="index"
                                                   src={require('../../assets/images/bronze_medal.png')}/>
                                        )}
                                        {user_rank.rank > 3 && (
                                            <View className="index">{user_rank.rank}</View>
                                        )}
                                        <Image
                                            className="header-img"
                                            src={user_rank.user_avatar}
                                        />
                                        <View className="name">{user_rank.name}</View>
                                    </View>
                                    {rank_type==3?(
                                        <View className="rate">
                                            <View className="percent">{user_rank.percent}%</View>
                                            <View className="times">{user_rank.achieve_num}次</View>
                                        </View>
                                    ):(
                                        <View className="steps">{user_rank.step_num}</View>
                                    )}

                                </View>
                                {rank.map((item, index) => (
                                    <View className="item" key={index}>
                                        <View className="item-l">
                                            {index == 0 && (
                                                <Image className="index"
                                                       src={require('../../assets/images/gold_medal.png')}/>
                                            )}
                                            {index == 1 && (
                                                <Image className="index"
                                                       src={require('../../assets/images/silver_medal.png')}/>
                                            )}
                                            {index == 2 && (
                                                <Image className="index"
                                                       src={require('../../assets/images/bronze_medal.png')}/>
                                            )}
                                            {index > 2 && (
                                                <View className="index">{index + 1}</View>
                                            )}
                                            <Image
                                                className="header-img"
                                                src={item.user_avatar}
                                            />
                                            <View className="name">{item.name}</View>
                                        </View>
                                        {rank_type==3?(
                                            <View className="rate">
                                                <View className="percent">{item.percent}%</View>
                                                <View className="times">{item.achieve_num}次</View>
                                            </View>
                                        ):(
                                            <View className="steps">{item.step_num}</View>
                                        )}

                                    </View>
                                ))}
                            </View>
                        </View>
                    )}


                    {/*已结束*/}
                    {event_type == 3 && (
                        <View>
                            <Picker
                                className="filter"
                                rangeKey='name'
                                id='scope_type'
                                range={all_scope_type}
                                onChange={this.onPickerChange.bind(this)}
                            >
                                {all_scope_type[scope_type].name}数据
                                <AtIcon
                                    value='chevron-down'
                                    size='14'
                                    color='#00ad5a'
                                    className='chevron-down'/>
                            </Picker>
                            <View className="sum-data">
                                <View className="sum-it only">
                                    <View className="label">达标人数：</View>
                                    <View className="value">
                                        <Text>{achieve_num}</Text>
                                        人
                                    </View>
                                </View>
                            </View>
                            <View className="content">
                                <View className="item me">
                                    <View className="item-l">
                                        {user_rank.rank == 1 && (
                                            <Image className="index"
                                                   src={require('../../assets/images/gold_medal.png')}/>
                                        )}
                                        {user_rank.rank == 2 && (
                                            <Image className="index"
                                                   src={require('../../assets/images/silver_medal.png')}/>
                                        )}
                                        {user_rank.rank == 3 && (
                                            <Image className="index"
                                                   src={require('../../assets/images/bronze_medal.png')}/>
                                        )}
                                        {user_rank.rank > 3 && (
                                            <View className="index">{user_rank.rank}</View>
                                        )}
                                        <Image
                                            className="header-img"
                                            src={user_rank.user_avatar}
                                        />
                                        <View className="name">{user_rank.name}</View>
                                    </View>
                                    <View className="steps">{user_rank.achieve_num}</View>
                                </View>
                                {rank.map((item, index) => (
                                    <View className="item" key={index}>
                                        <View className="item-l">
                                            {index == 0 && (
                                                <Image className="index"
                                                       src={require('../../assets/images/gold_medal.png')}/>
                                            )}
                                            {index == 1 && (
                                                <Image className="index"
                                                       src={require('../../assets/images/silver_medal.png')}/>
                                            )}
                                            {index == 2 && (
                                                <Image className="index"
                                                       src={require('../../assets/images/bronze_medal.png')}/>
                                            )}
                                            {index > 2 && (
                                                <View className="index">{index + 1}</View>
                                            )}
                                            <Image
                                                className="header-img"
                                                src={item.user_avatar}
                                            />
                                            <View className="name">{item.name}</View>
                                        </View>
                                        <View className="steps">{item.achieve_num}</View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                </View>
            </View>
        )
    }
}
