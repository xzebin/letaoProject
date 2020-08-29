import moment from "moment";
import Vue from "vue";

//创建全局过滤器formatDate用来转换时间格式
Vue.filter("formatDate",function(date,format = 'YYYY-MM-DD HH:mm:ss'){
    return moment(date).format(format);
})