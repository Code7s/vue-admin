<template>
  <div id="register">
    <div class="register-box">
      <h1 class="register-title">
        注
        <span>隐藏</span>册
      </h1>
      <el-form class="register-form" :model="registerForm" :rules="rules">
        <el-form-item prop="email">
          <el-input prefix-icon="el-icon-user" placeholder="邮箱" v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="密码"
            type="password"
            v-model="registerForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="确认密码"
            type="password"
            v-model="registerForm.res_password"
          ></el-input>
        </el-form-item>
        <el-form-item class="register-wrap">
          <el-button class="register" type="danger">注册</el-button>
          <el-button @click="goLogin()">返回登录页</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerForm: {
        email: "",
        password: "",
        res_password: ""
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
        ],
        checkPass: []
      }
    };
  },
  methods: {
    goLogin() {
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style lang="less">
#register {
  width: 100%;
  height: 100%;
  background-color: #10548c;
}
.register-box {
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
  padding: 0px 40px;
  .register-title {
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
  .register-wrap {
    margin-top: -10px;
    width: 100%;
    button {
      width: 100%;
      margin: 10px 0;
    }
  }
}
</style>