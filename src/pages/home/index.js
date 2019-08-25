import Taro, {Component} from '@tarojs/taro'
import {View, Text, Canvas, Button, Image} from '@tarojs/components'
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
        backgroundTextStyle: 'dark'
        // backgroundColor: '#0bad61'
    }

    state = {
        unit: '',
        outCircle: '',
        innerCircle: ''
    }

    componentDidMount = () => {
        Taro.getSystemInfo()
            .then(res => {
                this.setState({
                    unit: res.windowWidth / 375
                }, () => {
                    this.circleInit()
                })
            })

        this.login()
        // this.index()
    }

    componentDidShow() {
        if (Taro.getStorageSync('token')&&this.props.is_certified!=1){
            this.index()
        }
    }

    //下拉刷新
    onPullDownRefresh() {
        if (Taro.getStorageSync('token')) {
            this.index()
        }
        setTimeout(() => {
            Taro.stopPullDownRefresh()
        }, 1000)
    }

    //获取首页数据
    index = () => {
        Taro.getWeRunData()
            .then(res => {
                if (res.errMsg == 'getWeRunData:ok') {
                    this.circleInit()
                    this.props.dispatch({
                        type: 'home/index',
                        payload: {
                            encrypted_data: res.encryptedData,
                            iv: res.iv,
                            cb: this.drawCircle
                        }
                    })
                } else {
                    this.props.dispatch({
                        type: 'common/save',
                        payload: {
                            need_run_auth: true
                        }
                    })
                }

            })
            .catch(err => {
                this.props.dispatch({
                    type: 'common/save',
                    payload: {
                        need_run_auth: true
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
            this.circleInit()
            Taro.login().then(res => {
                if (res.code) {
                    let detail = e.detail
                    let payload = {
                        js_code: res.code,
                        encrypted_data: detail.encryptedData,
                        iv: detail.iv,
                        raw_data: detail.rawData,
                        signature: detail.signature,
                        cb:this.login
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
    openSetting = (e) => {
        let is_agree = e.detail.authSetting['scope.werun']
        if (is_agree) {
            this.circleInit()
            this.index()
        }
        this.props.dispatch({
            type: 'common/save',
            payload: {
                need_run_auth: !e.detail.authSetting['scope.werun']
            }
        })
    }

    //将canvas 转化为图片
    handleCanvarToImg = (id, key) => {
        Taro.canvasToTempFilePath({
            canvasId: id
        })
            .then(res => {
                this.setState({
                    [`${key}`]: res.tempFilePath
                })
            })
    }

    //设置目标值
    goSetTarget = () => {
        if (this.props.is_certified==1||this.props.need_run_auth){
            // Taro.showToast({
            //     title:'请先授权认证',
            //     icon:"none"
            // })
            return
        }
        Taro.navigateTo({
            url: '/pages/set_target/index'
        })
    }

    //跳转设置提醒时间
    goSetTime = () => {
        if (this.props.is_certified==1){
            Taro.showToast({
                title:'请先授权认证',
                icon:"none"
            })
            return
        }
        Taro.navigateTo({
            url: '/pages/set_remind/index'
        })
    }

    //跳转今日成就
    getTodayAchievement = () => {
        if (this.props.is_certified==1){
            Taro.showToast({
                title:'请先授权认证',
                icon:"none"
            })
            return
        }
        Taro.navigateTo({
            url: '/pages/today_achievement/index'
        })
    }

    goActivityDetail = (id, event_type) => {
        if (this.props.is_certified==1){
            Taro.showToast({
                title:'请先授权认证',
                icon:"none"
            })
            return
        }
        console.log(event_type);
        Taro.navigateTo({
            url: '/pages/activity_detail/index?id=' + id + '&event_type=' + event_type
        })
    }

    //跳转步数统计
    goStepChart = () => {
        if (this.props.is_certified==1){
            Taro.showToast({
                title:'请先授权认证',
                icon:"none"
            })
            return
        }
        Taro.navigateTo({
            url: '/pages/step_chart/index'
        })
    }

    //画圆圈
    circleInit = () => {
        const unit = this.state.unit
        var cxt_arc = Taro.createCanvasContext('canvasCircle');
        cxt_arc.setLineWidth(6 * unit);
        cxt_arc.setStrokeStyle('#f0f0f0');
        cxt_arc.setLineCap('round');
        cxt_arc.beginPath();
        cxt_arc.arc(100 * unit, 100 * unit, 96 * unit, 0, 2 * Math.PI, false);
        cxt_arc.stroke();
        cxt_arc.draw();
        this.handleCanvarToImg('canvasCircle', 'outCircle')
    }

    drawCircle = (curr, total) => {
        const unit = this.state.unit
        var ctx = Taro.createCanvasContext('canvasArcCir');

        function drawArc(s, e) {
            ctx.setFillStyle('white');
            ctx.clearRect(0, 0, 200 * unit, 200 * unit);
            ctx.draw();
            var x = 100 * unit, y = 100 * unit, radius = 96 * unit;
            ctx.setLineWidth(5 * unit);
            ctx.setStrokeStyle('#0bad61');
            ctx.setLineCap('round');
            ctx.beginPath();
            ctx.arc(x, y, radius, s, e, false);
            ctx.stroke()
            ctx.draw()
        }

        var startAngle = 1.5 * Math.PI, endAngle = (1.5 + 2 * (curr / total)) * Math.PI
        drawArc(startAngle, endAngle)
        this.handleCanvarToImg('canvasArcCir', 'innerCircle')
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
                                    今日全校共{index_data.school_total_card_num||0}人打卡，你已击败{index_data.user_defeat_pec||0}%人
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
                                        className="num"
                                    >
                                        {(need_authorization||is_certified==1)?(
                                            <Button
                                                openType="getUserInfo"
                                                onGetUserInfo={this.regist.bind(this)}
                                            >
                                                授权认证
                                            </Button>
                                        ):(need_run_auth?(
                                            <Button
                                                openType="openSetting"
                                                onOpenSetting={this.openSetting}
                                            >
                                                同步步数
                                            </Button>
                                        ):(
                                            <Text>{index_data.user_now_step_num || 0}</Text>
                                        ))}

                                    </View>
                                    <View
                                        className="target">今日目标：{(index_data.user_target_step_num && index_data.user_target_step_num[1]) || 6000}</View>
                                </View>
                            </View>
                            <View className="cell">
                                <Button className="cell-it" onClick={this.goStepChart.bind(this)}>
                                    <Image className="image" src={require('../../assets/images/bstj.png')}/>
                                    <View className="text">步数统计</View>
                                </Button>
                                <Button className="cell-it" openType="share">
                                    <Image className="image" src={require('../../assets/images/yqjr.png')}/>
                                    <View className="text">邀请加入</View>
                                </Button>
                                <Button className="cell-it" onClick={this.getTodayAchievement.bind(this)}>
                                    <Image className="image" src={require('../../assets/images/jrcj.png')}/>
                                    <View className="text">今日成就</View>
                                </Button>
                                <Button className="cell-it" onClick={this.goSetTime}>
                                    <Image className="image" src={require('../../assets/images/sztx.png')}/>
                                    <View className="text">设置提醒</View>
                                </Button>
                            </View>
                        </View>
                    </View>


                    <View className="sub-title">
                        当前活动
                    </View>

                    {(need_authorization||is_certified==1) ? (
                        <View className="activity-con">
                            <View className="null">
                                <View className="null-desc">认证学校后可参与校园活动</View>
                            </View>
                            <Button
                                className="create-btn"
                                openType="getUserInfo"
                                onGetUserInfo={this.regist.bind(this)}
                            >
                                授权认证
                            </Button>
                        </View>
                    ):(
                        <View>
                            {JSON.stringify(least_event) === '{}' ? (
                                <View className="activity-con">
                                    <View className="null">
                                        <Image className="null-image" src={require('../../assets/images/zanwu.png')}/>
                                        <View className="null-desc">学校暂无活动，请联系管理员！</View>
                                    </View>
                                </View>
                            ) : (
                                <View className="activity-con"
                                      onClick={this.goActivityDetail.bind(this, least_event.event_id, least_event.event_type)}>
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

                                    <View className="detail-wrapper">
                                        <View className="detail">
                                            查看详情
                                        </View>
                                    </View>
                                </View>
                            )}
                        </View>
                    )}

                </View>
                <View className="blank"></View>
            </View>
        )
    }
}
