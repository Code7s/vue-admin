<template>
  <div class="userlist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
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
      <el-table :data="tableData" style="width: 100%;margin-top:20px;" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="用户名" prop="user_name"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.user_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="">
            <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini" circle></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" circle></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" circle></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="tableData.length"
        ></el-pagination>
      </div>
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
    // 获取用户列表(暂时全部获取无需分页)
    async getUserList() {
      let res = await this.$axios.get("user_list");
      console.log(res);
      this.tableData = res.data;
    }
  },
  created() {
    this.getUserList();
  }
};
</script>

<style lang="less" scoped>
.el-pagination{
  padding-top: 20px;
}
</style>