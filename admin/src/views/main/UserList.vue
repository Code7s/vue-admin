<template>
  <div class="userlist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button @click="addUser()" type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%;margin-top:20px;">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="用户名"></el-table-column>
        <el-table-column label="邮箱"></el-table-column>
        <el-table-column label="角色"></el-table-column>
        <el-table-column label="状态"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 当前登录用户信息
      userInfo: {
        email: this.$store.state.userInfo.email,
        user_name: this.$store.state.userInfo.user_name,
        role_name: "普通用户"
      },
      tableData: []
    };
  },
  methods: {
    // 添加用户
    async addUser() {
      let result = await this.$axios.post("add_user", this.userInfo);
      console.log(result);

      switch (result.data.status) {
        case 0:
          this.$message({
            message: result.data.message,
            type: "success"
          });
          break;
        case 1:
          this.$message({
            message: result.data.message,
            type: "warning"
          });
          break;
        case 2:
          this.$message({
            message: result.data.message,
            type: "warning"
          });
          break;
        case 3:
          this.$message({
            message: result.data.message,
            type: "warning"
          });
          break;
      }
    },
    // 获取用户列表
    getUserList() {}
  },
  created() {
    // console.log(this.userInfo);
  }
};
</script>

<style lang="less" scoped>
</style>