<template>
  <div>
    <h1>Welcome! 关于作者</h1>
    <el-card class="box-card">
      <div class="myinfo">
        <h3>信息</h3>
        <p>姓名: 余其胜</p>
        <p>生日: 1997.08.25</p>
        <p>所在地: 江西南昌</p>
        <p>学校: 江西师范大学</p>
        <p>微信: code7s</p>
        <p>QQ: 927727867</p>
        <p>
          Email:
          <a href="mailto:code7s@sina.com">code7s@sina.com</a>
        </p>
        <p>
          Github主页:
          <a href="https://github.com/Code7s">https://github.com/Code7s</a>
        </p>
        <p>
          个人博客:
          <a href="http://www.code7s.com">http://www.code7s.com</a>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="less" scoped>
h1 {
  font-size: 40px;
  font-weight: normal;
  line-height: 80px;
  color: #4d4d4d;
  margin-top: 20px;
}
.myinfo {
  text-align: left;
  h3 {
    line-height: 30px;
  }
  p {
    font-size: 14px;
    color: #666;
    line-height: 25px;
    a {
      color: #666;
    }
  }
}
</style>