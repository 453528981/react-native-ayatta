import ApiClient from 'api';
import {ApiConfig} from '../config';
import Storage from 'react-native-storage';

export const LocalStorage = new Storage({
    // maximum capacity, default 1000 
    size: 1000,

    // expire time, default 1 day(1000 * 3600 * 24 secs).
    // can be null, which means never expire.
    defaultExpires: 1000 * 3600 * 24,

    // cache data in the memory. default is true.
    enableCache: true,

    // if data was not found in storage or expired,
    // the corresponding sync method will be invoked and return 
    // the latest data.
    sync: {
        // we'll talk about the details later.
    }
});

LocalStorage.sync.SplashCover = function (params) {
    let {
        key,
        resolve,
        reject
    } = params;

    ApiClient.Excute(ApiConfig.Methods.SplashCoverGet).then(r => {
        LocalStorage.save({
            key: key,
            rawData: r,
        });
        // 成功则调用resolve
        resolve && resolve(r);
    }).catch(err => {
        console.err(err);
        reject && reject(err);
    }).done();
}