import Taro, {Component} from '@tarojs/taro'
import {View, Text, Canvas, Button} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import './index.scss'
import {AtModal, AtModalHeader, AtModalContent, AtModalAction, AtProgress} from "taro-ui"


@connect(({home, common, loading}) => ({
    ...home,
    ...common,
    loading
}))
export default class Home extends Component {
    config = {
        navigationBarTitleText: '首页',
        navigationBarBackgroundColor: '#0bad61',
        navigationBarTextStyle: 'white',
        backgroundColorBottom: '#0bad61',
        enablePullDownRefresh: true,
        backgroundColor: '#0bad61'
    }

    state={
        unit:''
    }

    componentDidMount = () => {
        Taro.getSystemInfo()
            .then(res=>{
                this.setState({
                    unit:res.windowWidth/375
                },()=>{
                    this.circleInit()
                    this.drawCircle()
                })
            })


        // this.index()
    }

    componentDidShow() {
        this.login()
    }

    //下拉刷新
    onPullDownRefresh() {
        if (Taro.getStorageSync('token')) {
            this.index()
        }
    }

    //获取首页数据
    index = () => {
        Taro.getWeRunData()
            .then(res => {
                if (res.errMsg == 'getWeRunData:ok') {
                    this.props.dispatch({
                        type: 'home/index',
                        payload: {
                            encrypted_data: res.encryptedData,
                            iv: res.iv,
                            cb: this.drawCircle
                        }
                    })
                } else {
                    console.log('获取微信运动授权失败')
                    this.props.dispatch({
                        type: 'common/save',
                        payload: {
                            need_run_auth:true
                        }
                    })
                }

            })
            .catch(err => {
                this.props.dispatch({
                    type: 'common/save',
                    payload: {
                        need_run_auth:true
                    }
                })
            })

    }

    //登录
    login = () => {
        Taro.login().then(res => {
            if (res.code) {
                this.props.dispatch({
                    type: 'common/index_index_login',
                    payload: {
                        js_code: res.code,
                        cb: this.index
                    }
                })
            }
        })
    }

    //注册
    regist = (e) => {
        let detail = e.detail
        if (detail.errMsg == 'getUserInfo:ok') {
            Taro.login().then(res => {
                if (res.code) {
                    let detail = e.detail
                    let payload = {
                        js_code: res.code,
                        encrypted_data: detail.encryptedData,
                        iv: detail.iv,
                        raw_data: detail.rawData,
                        signature: detail.signature,
                    }
                    this.props.dispatch({
                        type: 'common/index_index_register',
                        payload
                    })
                    this.props.dispatch({
                        type: 'common/save',
                        payload: {
                            need_authorization: false
                        }
                    })
                }
            })
        } else {//授权失败
            console.log('授权被拒绝')
        }

    }

    //强制授权
    openSetting=(e)=>{
        let is_agree=e.detail.authSetting['scope.werun']
        if(is_agree){
            this.index()
        }
        this.props.dispatch({
            type: 'common/save',
            payload: {
                need_run_auth: !e.detail.authSetting['scope.werun']
            }
        })

    }

    //设置目标值
    goSetTarget = () => {
        Taro.navigateTo({
            url: '/pages/set_target/index'
        })
    }

    //跳转设置提醒时间
    goSetTime = () => {
        Taro.navigateTo({
            url: '/pages/set_remind/index'
        })
    }

    //跳转今日成就
    getTodayAchievement = () => {
        Taro.navigateTo({
            url: '/pages/today_achievement/index'
        })
    }

    goActivityDetail = (id, event_type) => {
        Taro.navigateTo({
            url: '/pages/activity_detail/index?id=' + id + '&event_type=' + event_type
        })
    }

    //跳转步数统计
    goStepChart = () => {
        Taro.navigateTo({
            url: '/pages/step_chart/index'
        })
    }

    //画圆圈
    circleInit = () => {
        const unit=this.state.unit
        var cxt_arc = Taro.createCanvasContext('canvasCircle');
        cxt_arc.setLineWidth(6*unit);
        cxt_arc.setStrokeStyle('#f0f0f0');
        cxt_arc.setLineCap('round');
        cxt_arc.beginPath();
        cxt_arc.arc(100*unit, 100*unit, 96*unit, 0, 2 * Math.PI, false);
        cxt_arc.stroke();
        cxt_arc.draw();
    }

    drawCircle = (curr, total) => {
        const unit=this.state.unit
        var ctx = Taro.createCanvasContext('canvasArcCir');

        function drawArc(s, e) {
            ctx.setFillStyle('white');
            ctx.clearRect(0, 0, 200*unit, 200*unit);
            ctx.draw();
            var x = 100*unit, y = 100*unit, radius = 96*unit;
            ctx.setLineWidth(5*unit);
            ctx.setStrokeStyle('#0bad61');
            ctx.setLineCap('round');
            ctx.beginPath();
            ctx.arc(x, y, radius, s, e, false);
            ctx.stroke()
            ctx.draw()
        }

        var startAngle = 1.5 * Math.PI, endAngle = (1.5 + 2 * (curr / total)) * Math.PI
        drawArc(startAngle, endAngle)
    }

    render() {
        const {
            index_data,
            sync_success,
            loading,
            need_run_auth,
            is_certified,
            need_authorization
        } = this.props
        const {least_event} = index_data
        let percent = 0
        if (JSON.stringify(least_event) !== '{}') {
            percent = (least_event.user_num / least_event.target_num) * 100
        }
        console.log('index_data',index_data)
        return (
            <View className='home-page'>
                <View className="wrapper">
                    <View className="page-top-bg">
                        <View className="page-top">
                            {sync_success === false ? (
                                <View className="title">
                                    下拉可再次同步微信步数
                                </View>
                            ) : (
                                <View className="title">
                                    今日全校共{index_data.school_total_card_num}人打卡，你已击败{index_data.user_defeat_pec}%人
                                </View>
                            )}

                            <View className="circle-wrapper" onClick={this.goSetTarget.bind(this)}>
                                <View className="wrap">
                                    <View className="circle-box">
                                        <Canvas
                                            className="circle"
                                            canvasId="canvasCircle"
                                        >
                                        </Canvas>
                                        <Canvas
                                            className="circle"
                                            canvasId="canvasArcCir"
                                        >
                                        </Canvas>
                                    </View>
                                </View>
                                <View className="data">
                                    <View className="desc">当前步数</View>
                                    <View
                                        className="num">{loading['effects']['home/index'] ? 0 : (index_data.user_now_step_num||0)}</View>
                                    <View className="target">今日目标：{(index_data.user_target_step_num&&index_data.user_target_step_num[1]) || 6000}</View>
                                </View>
                            </View>
                            <View className="cell">
                                <View className="cell-it" onClick={this.goStepChart.bind(this)}>
                                    <Image className="image" src={require('../../assets/images/bstj.png')}/>
                                    <View className="text">步数统计</View>
                                </View>
                                <View className="cell-it">
                                    <Image className="image" src={require('../../assets/images/yqjr.png')}/>
                                    <View className="text">邀请加入</View>
                                </View>
                                <View className="cell-it" onClick={this.getTodayAchievement.bind(this)}>
                                    <Image className="image" src={require('../../assets/images/jrcj.png')}/>
                                    <View className="text">今日成就</View>
                                </View>
                                <View className="cell-it" onClick={this.goSetTime}>
                                    <Image className="image" src={require('../../assets/images/sztx.png')}/>
                                    <View className="text">设置提醒</View>
                                </View>
                            </View>
                        </View>
                    </View>


                    <View className="sub-title">
                        当前活动
                    </View>

                    {JSON.stringify(least_event) === '{}' ? (
                        <View className="activity-con">
                            <View className="null">
                                <Image className="null-image" src={require('../../assets/images/zanwu.png')}/>
                                <View className="null-desc">学校暂未开展教职工活动</View>
                            </View>
                            <View className="create-btn">
                                创建活动
                            </View>
                        </View>
                    ) : (
                        <View className="activity-con">
                            <View className="activity-top">
                                <View className="name">{least_event.title}</View>
                                {least_event.event_type == 1 && (
                                    <View className="btn wait">即将开始</View>
                                )}
                                {least_event.event_type == 2 && (
                                    <View className="btn ing">进行中</View>
                                )}
                                {least_event.event_type == 3 && (
                                    <View className="btn end">已结束</View>
                                )}
                            </View>
                            <View className="mark">我的达标次数（每日{least_event.target_step_num}步）：</View>
                            <View className="activity-footer">
                                <View className="footer-l">
                                    <Text>{least_event.user_num}</Text>
                                    次
                                </View>
                                <View className="footer-r">
                                    <Text>{least_event.target_num}</Text>
                                    次
                                </View>
                            </View>
                            <AtProgress percent={percent} isHidePercent strokeWidth={5} color='#2f404d'/>

                            <View className="detail-wrapper"
                                  onClick={this.goActivityDetail.bind(this, least_event.event_id, least_event.event_type)}>
                                <View className="detail">
                                    查看详情
                                </View>
                            </View>
                        </View>
                    )}

                </View>
                <AtModal isOpened={need_authorization} closeOnClickOverlay={false}>
                    <AtModalHeader>提示</AtModalHeader>
                    <AtModalContent>
                        为了更好使用，请同意微信授权
                    </AtModalContent>
                    <AtModalAction>
                        <Button
                            openType="getUserInfo"
                            onGetUserInfo={this.regist.bind(this)}
                        >
                            <Text style='color:#09bb07;'>确定</Text>
                        </Button>
                    </AtModalAction>
                </AtModal>
                <AtModal isOpened={need_run_auth} closeOnClickOverlay={false}>
                    <AtModalHeader>提示</AtModalHeader>
                    <AtModalContent>
                        为了更好使用，请授权微信运动
                    </AtModalContent>
                    <AtModalAction>
                        <Button
                            openType="openSetting"
                            onOpenSetting={this.openSetting}
                        >
                            <Text style='color:#09bb07;'>确定</Text>
                        </Button>
                    </AtModalAction>
                </AtModal>
                <View className="blank"></View>
            </View>
        )
    }
}
