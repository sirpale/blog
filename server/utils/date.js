
const Dte = function() {};


Dte.prototype.timeStampToTime = (timestamp) => {

    // 时间戳为10位需要乘以1000
    let date = new Date(timestamp);

    let Y,M,D,h,m,s;

    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 + '-');
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();

    return Y+M+D+h+m+s;



};



module.exports = {
  timeStampToTime(timestamp) {

    // 时间戳为10位需要乘以1000
    let date = new Date(timestamp);

    let Y,M,D,h,m,s;

    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-');
    D = this.formateDate(date.getDate()) + ' ';
    h = this.formateDate(date.getHours()) + ':';
    m = this.formateDate(date.getMinutes()) + ':';
    s = this.formateDate(date.getSeconds());

    return Y+M+D+h+m+s;

  },
  formateDate(d) {
    return d < 10 ? '0' + d : d;
  }


};
