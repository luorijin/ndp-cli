import axios from 'axios'
import qs from 'qs'
import servletContext from 'servletContext'
axios.defaults.timeout = 30000;                      //响应时间
axios.defaults.headers['Content-Type'] = "application/json";

axios.defaults.baseURL = servletContext.baseURL;   //配置接口地址

axios.interceptors.request.use((config) => {
    //在发送请求之前做某件事
    if (config.method == 'get') {//axios中设置Content-Type不生效的问题
        config.data = true
    }
    if(config.headers['Content-Type'].indexOf('x-www-form-urlencoded') != -1){
        config.data= qs.stringify(config.data);
    }
    return config;
},(error) =>{
    return Promise.reject(error);
});
 
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
    //对响应数据做些事
    if(!res.status==200){
        //错误捕获
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    //错误捕获
    return Promise.reject(error);
});
export default axios;