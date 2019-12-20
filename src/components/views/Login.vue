<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title" style="color:#000;">登录</div>
      <el-form :model="ruleForm" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item>
          <span class="registe1">用户名：</span>
          <el-input
            v-model.trim="ruleForm.username"
            style="width:78%;"
            ref="userName"
            placeholder="请填写用户名"
            @focus="userNameFocus"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <span class="registe1">密码：</span>
          <el-input
            type="text"
            style="width:78%;"
            placeholder="请填写密码"
            ref="password"
            @focus="passwordFocus"
            v-model.trim="ruleForm.password"
            @keyup.enter.native="submitForm"
            v-if="checked"
          >
            <i slot="suffix" class="el-icon-view passIcon" @click="showPwd"></i>
          </el-input>
          <el-input
            type="password"
            style="width:78%;"
            placeholder="请填写密码"
            ref="password"
            @focus="passwordFocus"
            v-model.trim="ruleForm.password"
            @keyup.enter.native="submitForm"
            v-else
          >
            <i slot="suffix" class="el-icon-view passIcon" @click="showPwd"></i>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm">登录</el-button>
        </div>
      </el-form>
      <!-- errors -->
      <div v-if="response" class="text-red">
        <p>{{response}}</p>
      </div>
    </div>
  </div>
</template>

<script>
// 用户名：admin  密码：123456
import api from "../../api";
import md5 from "js-md5";
import jwt from "jwt-decode";
import qs from 'qs';
export default {
  data: function() {
    return {
      userState: true,
      passwordState: true,
      checked: false,
      response: "",
      ruleForm: {
        username: "",
        password: ""
      }
      // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MDkzZDJjNC01YzYyLTQwOWMtODAwZi04N2Q1MjMwNjkxNDUiLCJhdWQiOiJOLk4gSHVtYW4gV2ViIiwiaWF0IjoxNTQwNzc5OTQ2LCJSb2xlIjoiU3lzQWRtaW4iLCJ1aWQiOiJzeXMiLCJuYmYiOjE1NDA3Nzk5NDYsImV4cCI6MTU3Njc3OTk0NiwiaXNzIjoiTi5OIEh1bWFuIn0.RNZWzqakz7Hrt9GLAQK-rBuysZiMIPWGG1oX7mbIqXI'
    };
  },
  methods: {
    // 点击切换密码显示与隐藏
    showPwd() {
      this.checked = !this.checked;
    },
    // 获取焦点
    userNameFocus() {
      this.$refs.userName.placeholder = "";
    },
    passwordFocus() {
      this.$refs.password.placeholder = "";
    },
    // 提交
    submitForm() {
      console.log(this.ruleForm.username)
      if (this.ruleForm.username === "") {
        this.$message.error("请输入用户名！");
        return;
      } else if (this.ruleForm.password === "") {
        this.$message.error("请输入密码！");
        return;
      } else {
        this.submitForm1();
        // this.$router.push({ path: "/" });
      }
    },

    submitForm1() {
      // var md5pass = md5(this.ruleForm.password);
      var data = {
        user: this.ruleForm.username,
        password: this.ruleForm.password
      };
      console.log(data);
      // this.toggleLoading();
      var headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      api.request("post", "/loginCheck", null,qs.stringify(data), headers).then(response => {
        var data = response.data.results;
        console.log(data.data);
        if (data.status == 200 & data.message == 'success') {
          var TOKEN = data.TOKEN;
          console.log(TOKEN);
          this.$store.commit("SET_TOKEN", TOKEN);
          if (window.localStorage) {
            window.localStorage.setItem("TOKEN", TOKEN);
          }
          var user_id = data.data.user_id;
          this.$store.commit("SET_USERID", user_id);
          var user_type = data.data.user_type
          this.$store.commit("SET_USERTYPE",user_type);
          var company = data.data.user_company
          this.$store.commit("SET_COMPANYNAME",company);
          var company_dept = data.data.company_dept
          this.$store.commit("SET_DEPARTMENT",company_dept);
          sessionStorage.setItem("store", JSON.stringify(this.$store.state));
          this.$router.push({ path: "/" });
        } else {
          // this.$message.error("用户名或密码错误")
          this.$message.error(data.message);

        }
      })
      .catch(error => {
        // this.$store.commit('TOGGLE_LOADING')
        console.log(error);
        this.response = "用户名或密码错误";
        // this.toggleLoading();
      });
    },
    toggleLoading() {
      this.loading = this.loading === "" ? "loading" : "";
    },
    resetResponse() {
      this.response = "";
    }
  }
};
</script>

<style lang="less">
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: #324157;
  // background-image: url(../../../static/images/login-bg.jpg);
  // background-size: cover;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.setPassword {
  // margin-left:auto;
  // margin-right:auto;
  text-align: center;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #409eff;
  display: inline-block;
  cursor: pointer;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
  .text-red {
    font-size: 14px;
    color: rgb(206, 31, 31);
    margin-top: 15px;
    text-align: center;
  }
}
.ms-content {
  padding: 30px 30px 15px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 40%;
  height: 36px;
  margin-bottom: 10px;
}
.registe1 {
  width: 58px;
  display: inline-block;
  text-align: right;
  /* color:#fff; */
}
.passIcon {
  margin-right: 6px;
  cursor: pointer;
}
</style>