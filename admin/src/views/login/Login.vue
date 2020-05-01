<template>
  <div id="login">
    <div class="login-box">
      <h1 class="login-title">
        登
        <span>隐藏</span>录
      </h1>
      <!-- :model绑定数据对象 :rules绑定验证规则 -->
      <el-form ref="loginRef" class="login-form" :model="loginForm" :rules="rules">
        <el-form-item prop="email">
          <el-input prefix-icon="el-icon-user" placeholder="Email" v-model="loginForm.email"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="Password"
            type="password"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item class="login-wrap">
          <el-button class="login" @click="login()" type="danger">登录</el-button>
          <el-button class="register" @click="goRegister()">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      // 表单数据对象
      loginForm: {
        email: "qq@qq.com",
        password: "111111"
      },
      // 验证规则对象
      rules: {
        //验证邮箱
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur"
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 16,
            message: "至少输入6个字符，最多不超过16个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    goRegister() {
      this.$router.push({ path: "/register" });
    },
    login() {
      this.$refs.loginRef.validate(async vaild => {
        if (vaild) {
          let result = await this.$axios.post("login", this.loginForm);
          if (result.status === 200) {
            switch (result.data.status) {
              // 登录成功
              case 0:
                localStorage.token = result.data.token;
                this.$router.push({ path: "/" });
                this.open3();
                break;
              case 1:
                this.message = result.data.message;
                this.open1();
                break;
              case 2:
                this.message = result.data.message;
                this.open1();
                break;
              case 3:
                this.message = result.data.message;
                this.open2();
                break;
              case 4:
                this.message = result.data.message;
                this.open2();
            }
          }
        }
      });
    },
    open3() {
      this.$message({
        message: "登录成功！",
        type: "success"
      });
    },
    open1() {
      this.$message({
        message: this.message,
        type: "warning"
      });
    },
    open2() {
      this.$message({
        message: this.message,
        type: "error"
      });
    }
  }
};
</script>

<style lang="less">
#login {
  width: 100%;
  height: 100%;
  background-color: #10548c;
}
.login-box {
  width: 400px;
  height: min-content;
  border-radius: 10px;
  background-color: #eee;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding: 0 40px;
  .login-title {
    font-size: 24px;
    color: rgb(80, 80, 80);
    text-align: center;
    line-height: 30px;
    span {
      visibility: hidden;
    }
  }
  .el-form-item {
    margin-bottom: 35px;
  }
  .login-wrap {
    margin-top: -10px;
    width: 100%;
    button {
      width: 100%;
      margin: 10px 0;
    }
  }
}
</style>