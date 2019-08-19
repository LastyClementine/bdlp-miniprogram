import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image, Button} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import './index.scss'

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
                    Taro.getImageInfo({
                        src:achievement_data.cover,
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
    }


    render() {
        const {
            achievement_data
        } = this.props
        console.log('achievement_data',achievement_data)
        return (
            <View className='today_achievement-page'>
                <View className="wrapper">
                    <Image className="bg-image" src={achievement_data.cover}/>
                    <View className="content">
                        <View className="top">
                            <Image className="header-img" src={achievement_data.user_avatar}/>
                            <View className="desc">
                                <View className="name">{achievement_data.nick_name}</View>
                                <View className="date">{achievement_data.date}</View>
                            </View>
                        </View>

                        <View className="sum-data">
                            <View className="item">
                                <View className="desc">累计打卡</View>
                                <View className="value">
                                    <View className="num">{achievement_data.user_all_card_num}</View>
                                    <View className="unit">天</View>
                                </View>
                            </View>
                            <View className="item">
                                <View className="desc">今日步数</View>
                                <View className="value">
                                    <View className="num">{achievement_data.user_now_step_num}</View>
                                    <View className="unit">步</View>
                                </View>
                            </View>
                        </View>

                        <View className="footer">
                            <Text>"</Text>
                            {achievement_data.word}
                            <Text>"</Text>
                        </View>
                    </View>
                </View>

                <View className="btn white" onClick={this.saveImage}>
                    保存图片
                </View>
            </View>
        )
    }
}
