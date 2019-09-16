<template>
  <div class="post">
    <el-row type="flex" class="post_content" justify="space-between">
      <el-col class="menus-wrapper" :span="7">
        <!-- 左侧菜单导航栏 -->
        <Aside />
      </el-col>

      <el-col class="post-wrapper" :span="17">
        <!-- 文章展示区域 -->
        <Main/>

      </el-col>
      <!-- 返回顶部 -->
     <el-tooltip placement="top" content="返回顶部">
        <!-- 组件使用 -->
      <BackToTop 
        transitionName="fade"
        :customStyle="myBackToTopStyle" 
        :visibilityHeight="300" 
        :backPosition="0">
      </BackToTop>
    </el-tooltip>
    </el-row>
  </div>
</template>

<script>
import Aside from "@/components/post/aside";
import Main from "@/components/post/main";
import BackToTop from "@/components/post/scrolltop";
export default {
  data() {
    return {
      city: "",
      // 返回顶部
      myBackToTopStyle: {
        "right": "80px",
        "bottom": "335px",
        "width": "40px",
        "height": "40px",
        "border":"1px solid #e5e5e5",
        "border-radius": "20px",
        "line-height": "40px",
        "background": "#fff"
      }
    };
  },
  components: {
    Aside,
    Main,
    // 回到顶部组件
    BackToTop
  }
};
</script>



<style lang="less" scopde>
.post_content {
  width: 1000px;
  margin: 0 auto;
  // background-color: aqua;
}
</style>