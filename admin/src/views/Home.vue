<template>
  <el-container class="wrap">
    <el-header>
      <h1>后台管理系统</h1>
      <div class="user">
        <span class="user_name">{{ userInfo.user_name }}</span>
        <span class="exit" @click="exitLogin()">退出</span>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边导航 -->
      <el-aside :width="isFold ? '64px' : '200px'">
        <el-menu
          :collapse-transition="false"
          :default-active="mainRouter"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          :collapse="isFold"
          router
        >
          <el-submenu
            v-for="item in asideList"
            :key="item.id"
            :index="item.id + ''"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              v-for="subItem in item.children"
              :key="subItem.id"
              :index="subItem.path"
            >
              <template slot="title">
                <i :class="subItem.icon"></i>
                <span>{{ subItem.title }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <div
          :class="[
            'drawer',
            [isFold ? 'el-icon-arrow-right' : 'el-icon-arrow-left'],
          ]"
          @click="fold()"
        ></div>
      </el-aside>
      <!-- 内容区 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 用户信息
      userInfo: {},
      // 侧边栏是否折叠
      isFold: false,
      // 侧边栏列表数据
      asideList: []
    };
  },
  methods: {
    // 获取用户名
    getUser() {
      this.$axios.get("user").then((result) => {
        if (result.status === 200) {
          this.userInfo = result.data;
          sessionStorage.setItem("userInfo", JSON.stringify(result.data));
        }
      });
    },
    // 退出登录
    exitLogin() {
      localStorage.clear();
      this.$router.push("/login");
    },
    // 获取侧边栏数据
    getAsideList() {
      this.$axios.get("aside_list").then((result) => {
        if (result.status === 200) {
          this.asideList = result.data;
          this.setAside();
        }
      });
    },
    // 给侧边栏数据设置icon和路由跳转
    setAside() {
      // 设置侧边栏一级标题图标 (一维数组)
      let iconList = [
        "el-icon-user-solid",
        "el-icon-warning",
        "el-icon-s-goods",
        "el-icon-s-order",
        "el-icon-s-marketing",
      ];
      // 设置侧边栏二级标题图标 (二维数组)
      let subIconList = [
        ["el-icon-user"],
        ["el-icon-user", "el-icon-warning-outline"],
        ["el-icon-goods", "el-icon-tickets", "el-icon-guide"],
        ["el-icon-document"],
        ["el-icon-coin"],
      ];
      // 设置侧边栏路由跳转 (二维数组)
      let pathList = [
        ["/userlist"],
        ["/roles", "/power"],
        ["/goodslist", "/sortarg", "/goodsarg"],
        ["/orderlist"],
        ["/statistics"],
      ];
      this.asideList.forEach((item, index) => {
        item.icon = iconList[index];
        item.children.forEach((item2, index2) => {
          item2.icon = subIconList[index][index2];
          item2.path = pathList[index][index2];
        });
      });
    },
    // 侧边栏展开按钮开关
    fold() {
      this.isFold = !this.isFold;
    },
  },
  created() {
    this.getUser();
    this.getAsideList();
  },
  computed: {
    // 确保侧边栏在二级路由下依然能有active状态
    mainRouter() {
      if (this.$route.path.indexOf("/", 1) == -1) {
        // 只有一级路由时
        return this.$route.path;
      } else {
        // 二级或多级路由时
        return this.$route.path.substring(0, this.$route.path.indexOf("/", 1));
      }
    },
  },
  provide: function () {
    return {
      userInfo: this.userInfo,
    };
  },
};
</script>

<style lang="less" scoped>
.wrap {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  background-color: #283641;
  line-height: 60px;
  h1 {
    font-weight: normal;
    color: #fff;
  }
  .user {
    font-size: 14px;
    .exit {
      color: #f5f6f7;
      cursor: pointer;
    }
    .exit:hover {
      color: #59d0ff;
    }
    .user_name {
      color: #59d0ff;
      padding-right: 15px;
    }
  }
}
.el-aside {
  // 避免隐藏按钮不显示
  overflow: unset;
  position: relative;
  background-color: #565c63;
  color: #333;
  text-align: left;
  line-height: 200px;
  // 这里侧边栏有1px没有对齐，发现是el-menu中border的问题
  .el-menu {
    border-right: 0;
  }
  .drawer {
    width: 10px;
    height: 80px;
    background-color: #b4b4b4;
    border-radius: 0 5px 5px 0;
    position: absolute;
    top: 50%;
    right: -10px;
    margin-top: -40px;
    font-size: 10px;
    color: black;
    line-height: 80px;
    cursor: pointer;
  }
}
.el-main {
  background-color: #eee;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>