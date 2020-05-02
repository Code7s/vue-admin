<template>
  <el-container class="wrap">
    <el-header>
      <h1>后台管理系统</h1>
      <span class="exit" @click="exitLogin()">退出</span>
    </el-header>
    <el-container>
      <!-- 侧边导航 -->
      <el-aside width="200px">
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu v-for="item in asideList" :key="item.id" :index="item.id+''">
            <template slot="title">
              <i :class="iconList[item.id]"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.id+''">
              <template slot="title">
                <i :class="subIconList[subItem.id]"></i>
                <span>{{subItem.title}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容区 -->
      <el-main>
        <el-header>hdhad</el-header>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      asideList: [],
      // 设置侧边栏一级标题图标 {id:class名}
      iconList: {
        1: "el-icon-user-solid",
        2: "el-icon-warning",
        3: "el-icon-s-goods",
        4: "el-icon-s-order",
        5: "el-icon-s-marketing"
      },
      // 设置侧边栏二级标题图标 {id:class名}
      subIconList: {
        1: "el-icon-user",
        2: "el-icon-user",
        3: "el-icon-warning-outline",
        4: "el-icon-goods",
        5: "el-icon-tickets",
        6: "el-icon-guide",
        7: "el-icon-document",
        8: "el-icon-coin"
      }
    }
  },
  methods: {
    exitLogin() {
      localStorage.clear();
      this.$router.push("/login");
    }
  },
  created() {
    this.$axios.get("aside_list").then(result => {
      this.asideList = result.data;
    });
  }
};
</script>

<style lang="less" scoped>
.wrap {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  padding-right: 70px !important;
  background-color: #283641;
  line-height: 60px;
  h1 {
    font-weight: normal;
    color: #fff;
  }
  .exit {
    font-size: 14px;
    color: #f5f6f7;
    cursor: pointer;
  }
}
.el-aside {
  background-color: #565c63;
  color: #333;
  text-align: left;
  line-height: 200px;
  .el-submenu,
  .el-menu-item {
    width: 200px;
  }
}
.el-main {
  background-color: #eee;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>