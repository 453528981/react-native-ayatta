import Config from '../config';
import {Dimensions} from 'Dimensions';
import {PixelRatio} from 'react-native';

export default {
    //单位像素
    Pixel: 1 / PixelRatio.get(),

    //屏幕尺寸
    Screen: {
        Width: dimensions.width,
        Height: dimensions.height,
    },

    Get: function (url, timeout) {
        timeout = timeout || Config.DefaultNetworkTimeout;
        return get(url, timeout);
    },

    Post: function (url, body, timeout) {
        timeout = timeout || Config.DefaultNetworkTimeout;
        return post(url, body, timeout);
    },
}


const dimensions = Dimensions.get('window');

function get(url, timeout) {

    return timeoutFetch(timeout, fetch(url))
        .then(filterStatus)
        .then(filterData)
        .then(filterJSON)
        .catch(function (error) {
            throw "请求数据失败";
        });
}

function post(url, body, timeout) {

    return timeoutFetch(timeout, fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }))
        .then(filterStatus)
        .then(filterData)
        .then(filterJSON)
        .catch(function (error) {
            throw "提交数据失败";
        });
}

function filterStatus(res) {
    if (res.ok) {
        return res;
    } else {
        throw res.statusText;
    }
}

function filterData(res) {
    return res.text();
}

function filterJSON(data) {
    try {
        return JSON.parse(data);
    } catch (e) {
        throw '数据格式错误';
    }
}

function timeoutFetch(ms, promise) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error("请求数据超时"));
        }, ms);
        promise.then(
            (res) => {
                clearTimeout(timer);
                resolve(res);
            },
            (err) => {
                clearTimeout(timer);
                reject(err);
            }
        );
    })
}

