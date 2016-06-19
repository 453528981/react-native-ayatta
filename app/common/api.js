import Util from '../util';
import {ApiConfig} from '../config';

class ApiClient {
    constructor(baseUri, timeout) {
        this.baseUri = baseUri;
        this.timeout = timeout;
    }
    
    Excute(method, body) {
        var url = this.baseUri + method;
        return Util.Post(url, body);
    }
}

export default new ApiClient(ApiConfig.BaseUri, ApiConfig.Timeout);

