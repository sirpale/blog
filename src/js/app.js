import Head from '@/pages/public/head';
import Foot from '@/pages/public/foot';

import Login from '@/components/login';

export default {
  name: 'App',
  components : {Head,Foot,Login},
  data() {
    return {
      date : ''
    }
  },
  mounted() {
    let _this = this;
    setInterval(() => {
      _this.date = _this.getDate();
    }, 1000)

  },
  methods: {
    getDate() {
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      let w = date.getDay();

      let arr = ['一','二','三', '四', '五', '六', '日'];

      let h = date.getHours();
      let minu = date.getMinutes();
      let s = date.getSeconds();

      h = h < 10 ? `0${h}`: h;
      minu = minu < 10 ? `0${minu}`: minu;
      s = s < 10 ? `0${s}` : s;

      return `${y}年${m}月${d}日，${h}:${minu}:${s}，星期${arr[w-1]}`;

    }
  }
}
