<template>
  <div class="header">
    <div class="hhLogo">
      <!-- <h1>
        <a href="/">新新人类</a>
      </h1> -->
      <div class="logo">考勤工资计算系统</div>
      <!-- 折叠按钮 -->
      <div class="collapse-btn" @click="collapseChage">
        <i class="el-icon-menu"></i>
      </div>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="static/images/img.jpg" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{this.$store.state.user_id}}
            <!-- {{name}} -->
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import bus from "../common/bus";
import api from "./../../api";
import qs from 'qs';
export default {
  data() {
    return {
      collapse: false,
      fullscreen: false,
      name: "admin",
      message: 2
    };
  },
  computed: {
    username() {
      let user_id = localStorage.getItem("user_id");
      return user_id ? user_id : this.user_id;
    }
  },
  methods: {
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      // console.log(command);
      // this.$router.push("/login");
      if (command === 'loginout') {
        var headers = {
          'Content-Type': "application/x-www-form-urlencoded"
        }
        var data = {
          'TOKEN': this.$store.state.TOKEN
        }
        api.request('post', '/logout',null,qs.stringify(data), headers)
          .then(response => {
            if (response.status === 200) {
              var data = response.data
              // console.log(data)
              if (data.results.message === 'success') {
                var user_Id = ''
                this.$store.commit('SET_USERID', user_Id)              
                var TOKEN = ''
                this.$store.commit('SET_TOKEN', TOKEN)
                if (window.localStorage) {
                  window.localStorage.removeItem('TOKEN');//删除数据
                }
                this.$router.push('/login')
              } else {
                this.$message(data.results.message)
              }
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      bus.$emit("collapse", this.collapse);
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  }
};
</script>
<style lang="less">
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}
.hhLogo {
  width: 310px;
  height: 100%;
  float: left;
  font-family: "幼圆";
  font-size: 20px;
  h1 {
    width: 40px;
    height: 64px;
    background: url(/static/images/logo.ico) no-repeat 0 16px;
    background-size: contain;
    float: left;
    margin-left: 6px;
    a {
      display: block;
      width: 100%;
      height: 100%;
      text-indent: -9999em;
    }
  }
  .logo {
    float: left;
    width: 194px;
    line-height: 70px;
    margin-left: 6px;
  }
  .collapse-btn {
    float: left;
    // padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
  }
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
