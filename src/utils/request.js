import Taro from '@tarojs/taro'
import qs from 'qs'
import {
    baseUrl,
    signKey,
    aes
} from '../config';
import md5 from 'js-md5'
// import {hex_sha1} from './security/sha1'
import {Decrypt} from './security/aes'


function get_params(params, is_auth) {
    let data = {
        ...params
    }
    let token = Taro.getStorageSync('token')
    if (token && is_auth) {
        data.token = token
    }
    data = get_signature(data)
    return data
}

function get_signature(params) {
    let request = {
        'timestamp': Math.round(new Date().getTime()/1000),
        // 'timestamp': new Date().getTime(),
        ...params
    }
    request['sign'] = calc_signature(request)
    return request
}

function calc_signature(parms) {
    let tmpArr = []
    let tmpStr = ''

    for (let key in parms) {
        if (parms[key]) {
            tmpArr.push(key)
        }
    }
    tmpArr = tmpArr.sort()
    for (let i = 0; i < tmpArr.length; i++) {
        if (typeof (parms[tmpArr[i]]) === 'object') {
            tmpStr = tmpStr + tmpArr[i] + JSON.stringify(parms[tmpArr[i]])
        } else {
            tmpStr = tmpStr + tmpArr[i] + parms[tmpArr[i]]
        }

    }

    tmpStr = tmpStr + signKey
    tmpStr=md5(tmpStr)
    return tmpStr
}

export default (options = {
    data: {},
    is_auth: true
}) => {
    return Taro.request({
        url: baseUrl + options.api,
        data: qs.stringify(get_params(options.data, options.is_auth)),
        method: 'POST',
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    }).then((res) => {
        const {
            statusCode,
            data
        } = res;
        if (statusCode >= 200 && statusCode < 300) {
            switch (data.status) {
                case 1:
                    // console.log('成功')
                    data.data = Decrypt(data.data,aes.key,aes.iv);
                    break;
                case 0:
                    console.log('普通异常')
                    Taro.showToast({
                        title:data.info,
                        icon:"none"
                    })
                    break;
                case -1:
                    console.log('非法操作')
                    break;
                case -2:
                    console.log('登录失效')
                    break;
            }
            return data
        } else {
            throw new Error(`网络请求错误，状态码${statusCode}`);
        }
    })
        .catch(err => {
            console.log('请求失败', err)
        })
}
