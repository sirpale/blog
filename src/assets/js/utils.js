/**
 * @Author Sirpale
 * @Description 全局工具类
 * @Date Created in 2018\4\29 0029
 */

// 导入必要的模块
import axios from 'axios';
import {Message, Notification} from 'element-ui';

export default {

  /**
   * get请求
   * @DateTime 2018-4-29
   * @param {string} url [地址]
   * @param {object} data [数据]
   *
   * */

   get(url,data,cb) {
    if(!url) {
      console.error('没有请求地址');
      return false;
    }

    return axios({
      method: 'GET',
      url: url
    }).then(res => {
      return Promise.resolve(res);
    }, res=> {
      if(cb) cb(res);
      return Promise.reject(res);
    }).catch(e => {
      console.log(e);
    })
  },


  /**
   * post请求
   * @DateTime 2018-4-29
   * @param {string} url [地址]
   * @param {object} data [数据]
   * @param {object} options 扩展
   * */

   post(url, data, options = {}) {
    if(!url) {
      console.error('没有请求地址');
      return false;
    }

    return axios(Object.assign({
      method: 'POST',
      url: url,
      data: data
    }, options)).then(res => {
      return Promise.resolve(res);
    }, res => {
      return Promise.reject(res);
    }).catch( e => {
      console.log(e);
    })

  },

  /**
   * 中部的alert
   * @DateTime 2018-04-29
   * @param {string} type [要显示的类型] success/warning/error
   * @param {string} msg[要提示的信息]
   * @param {number} time [要显示的时间]
   * */

  msg(type = 'success', msg, time = 2000) {
    Message({
      type: type,
      message: msg,
      duration: time
    });
  },

  /**
   * 右上角提示
   * @DateTime 2018-4-29
   * @param {string} type [要显示的类型] success/warning/error
   * @param {string} msg [提示信息]
   * @param {string} title [要显示的标题]
   * */
  notice(type = 'success', msg, title = '') {

    if(title === '') {
      switch(type) {
        case 'warning': title = '警告';break;
        case 'error': title = '错误'; break;
        default: title ='成功';
      }
    }



    Notification({
      type: type,
      title: title,
      message: msg,
      duration: 2000

    })
  }

}
