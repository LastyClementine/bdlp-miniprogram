import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image, Button, Canvas} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import './index.scss'
import wxml2canvas from '../../utils/html2canvas/wxml2canvas'

@connect(({today_achievement, common, loading}) => ({
    ...today_achievement,
    ...common,
    loading
}))
export default class Today_achievement extends Component {
    config = {
        navigationBarTitleText: '今日成就',
        navigationBarBackgroundColor: '#273747',
        navigationBarTextStyle: 'white',
        backgroundColor: '#273747'
    }

    componentDidMount = () => {
        this.props.dispatch({
            type: 'today_achievement/getTodayAchievement',
            payload: {}
        })
    }

    saveImage=()=>{

        Taro.getSetting()
            .then(res=>{
                if (res.authSetting['scope.writePhotosAlbum']===false){//以前授权失败
                    Taro.openSetting()
                        .then(result=>{

                        })
                }else {
                    const {
                        achievement_data
                    } = this.props

                    const wrapperId = '.wrapper'
                    const drawClassName = '.draw'
                    const canvasId = 'canvasposter'

                    wxml2canvas(wrapperId, drawClassName, canvasId).then(() => {
                        Taro.canvasToTempFilePath({
                            canvasId: 'canvasposter',
                            success(res) {
                                Taro.getImageInfo({
                                    src:res.tempFilePath,
                                })
                                .then(res=>{
                                    Taro.saveImageToPhotosAlbum({
                                        filePath:res.path
                                    })
                                    .then(res=>{
                                        Taro.showToast({
                                            title:"图片保存成功"
                                        })
                                    })
                                })
                            }
                        })
                    })
                }
            })
    }


    render() {
        const {
            achievement_data
        } = this.props
        return (
            <View className='today_achievement-page'>
                <View className="wrapper">
                    <Image className="bg-image draw" src={achievement_data.cover}/>
                    <View className="content draw">
                        <View className="top draw">
                            <Image className="header-img draw" src={achievement_data.user_avatar}/>
                            <View className="desc draw">
                                <View className="name draw" data-text={achievement_data.nick_name}>{achievement_data.nick_name}</View>
                                <View className="date draw" data-text={achievement_data.date}>{achievement_data.date}</View>
                            </View>
                        </View>

                        <View className="sum-data draw">
                            <View className="item draw">
                                <View className="desc draw" data-text="累计打卡">累计打卡</View>
                                <View className="value draw">
                                    <View className="num draw" data-text={achievement_data.user_all_card_num}>{achievement_data.user_all_card_num}</View>
                                    <View className="unit draw" data-text="天">天</View>
                                </View>
                            </View>
                            <View className="item draw">
                                <View className="desc draw" data-text="今日步数">今日步数</View>
                                <View className="value draw">
                                    <View className="num draw" data-text={achievement_data.user_now_step_num}>{achievement_data.user_now_step_num}</View>
                                    <View className="unit draw" data-text="步">步</View>
                                </View>
                            </View>
                        </View>

                        <View className="footer draw" data-text={achievement_data.word}>
                            <Text className="draw">"</Text>
                            {achievement_data.word}
                            <Text className="draw">"</Text>
                        </View>
                    </View>
                </View>
                <View className="btn white" onClick={this.saveImage}>
                    保存图片
                </View>
                <Canvas className='canvas-poster' canvas-id='canvasposter'></Canvas>
            </View>
        )
    }
}
