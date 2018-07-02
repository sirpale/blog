<template>
  <el-card class="box-card content-card">
    <el-button>socket聊天室</el-button>
    <!--<div :style="{fontSize:postFontSize+'em'}">-->
      <!--<Demo-->
        <!--v-for="post in posts"-->
        <!--:key="post.id"-->
        <!--:post="post"-->
        <!--@enlarge-text="onEnlargeText"-->
      <!--/>-->
    <!--</div>-->

    <!--<div class="socket-box">-->
      <!--<p class="conn-state" ></p>-->
      <!--<el-button @click="connectSocket" :disabled="!disState" class="conn">进入聊天</el-button>-->
      <!--<el-button type="warning" @click="closeSocket" :disabled="disState" class="close">退出聊天</el-button><br />-->

      <!--名字：<input :disabled="!disState" type="text" id="nickname" /><br />-->
      <!--内容：<textarea type="textarea" id="msg-box" rows="10" ></textarea><br/>-->

      <!--<el-button type="success" @click="sendMsg" :disabled="disState" class="send">提交信息</el-button>-->

      <!--<div class="msg-list"></div>-->
    <!--</div>-->

  </el-card>
</template>

<style lang="scss" scoped>
  button {width:200px;height:40px;margin:20px;}
  .socket-box {
    color:#333;
    font-size:20px;
    input[type="text"] {width:300px;margin-bottom:20px;padding:10px;}
    textarea {width:300px;padding:10px;}
    .conn-state {color:green;padding:10px 20px;}
    .msg-list {
      font-size:16px;color:#666;
      padding: 30px;

    }
  }


</style>

<script>
  import {mapState, mapActions} from 'vuex';

  import Demo from './demo';

  export default {
    data() {
      return {
        total:0,
        wsUrl:  location.hostname,
        socket: null,
        disState: true,
        posts: [
          { id: 1, title: 'My journey with Vue', content:'1111' },
          { id: 2, title: 'Blogging with Vue', content:'222' },
          { id: 3, title: 'Why Vue is so fun', content: '3333' }
        ],
        postFontSize: 1
      }
    },
    components: {
      Demo
    },
    methods: {
      connectSocket() {

        let _this = this;

        if(_this.socket) return false;

        // 向服务器发送信息
        let connState = document.querySelector('.conn-state'),
          name = document.getElementById('nickname');

        if(!WebSocket) {
          connState.innerHTML = '您的浏览器不支持webSocket';
          return false;
        }

        if(name.value === '') {
          _this.uts.msg('error','名字不能为空')
        } else {

          // 链接socket服务器
          _this.socket = new WebSocket(`ws://${_this.wsUrl}:3001`);

          let socket = _this.socket;

          // 监听socket的链接
          socket.onopen = () => {
            _this.disState = false;
            connState.innerHTML = `成功加入聊天！`;
          };

          // 监听服务器断开
          socket.onclose = () => {
            connState.innerHTML = '退出聊天！';
            _this.disState = true;
            socket = null;
          };

          // 监听服务端异常
          socket.onerror = () => {
            connState.innerHTML = '服务错误';
            socket = null;
          };

          // 监听服务端广播过来的信息
          socket.onmessage = msg => {
            let msgObj = JSON.parse(msg.data);
            let msgList = document.querySelector('.msg-list');
            let box = document.createElement('p');
            if(msgObj.status === 0) {
              box.innerHTML = `${msgObj.nickname}在<i style="font-size:12px;color:#666;padding: 0 10px;">[${msgObj.time}]</i>退出聊天`;

            } else {
              box.innerHTML = `${msgObj.nickname}在<i style="font-size:12px;color:#666;padding: 0 10px;">[${msgObj.time}]</i>说：${msgObj.message}`
            }

            box.style.borderBottom = '1px dashed #e8e8e8';
            box.style.lineHeight = '30px';
            box.style.padding = '20px';

            msgList.appendChild(box);
          }

        }
      },
      closeSocket() {
        if(this.socket) {
          this.socket.close();
          this.socket = null;
        }
      },
      sendMsg() {
        let name = document.getElementById('nickname');
        let msgBox = document.getElementById('msg-box');

        let myDate = new Date();
        let now = (myDate.getMonth()+1) + '-' + myDate.getDate() + ' ' + myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds();

        let msg = {
          nickname: name.value,
          message: msgBox.value,
          time: now
        };

        if(!this.socket) {
          this.uts.notice('error','请先连接socket服务器!');
        } else {
          if(msg.message === '') {
            this.uts.msg('error', '消息是空的！');
          } else {
            this.socket.send(JSON.stringify(msg));
          }
        }



      },
      onEnlargeText(enlargeAmount) {
        this.postFontSize += enlargeAmount;
      }
    }
  }



</script>


