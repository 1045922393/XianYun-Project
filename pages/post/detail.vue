<template>
  <el-row type="flex" justify="space-between" class="post-detail">
    <el-col class="main">
      <!-- 面包削导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
        <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 文本 -->
      <div class="text">
        <h1>{{text.title}}</h1>
        <div class="info">
          <span>攻略 : {{info.time | times}}</span>
          <span>攻略 : {{info.read}}</span>
        </div>
        <div v-html="text.content" class="content"></div>
      </div>

      <!-- 评论，收藏分栏 -->
      <div class="post-ctrl">
        <el-row type="flex" justify="center" class="el">
          <div class="ctrl-item">
            <i class="iconfont iconpinglun"></i>
            <span>评论({{comments|long}})</span>
          </div>
          <div class="ctrl-item" v-on:click="star">
            <i class="iconfont iconstar1"></i>
            <span>收藏</span>
          </div>
          <div class="ctrl-item">
            <i class="iconfont iconfenxiang"></i>
            <span>分享</span>
          </div>
          <div class="ctrl-item">
            <i class="iconfont iconding"></i>
            <span>点赞({{res.like}})</span>
          </div>
        </el-row>
      </div>
      <comment :idValue="a"/>
    </el-col>
    <el-col class="aside">123</el-col>
  </el-row>
</template>
<script>
import comment from "@/components/post/comment.vue";
let moment = require("moment");
export default {
  data() {
    return {
      text: {
        title: "",
        content: ""
      },
      info: {
        time: "",
        read: ""
      },
      res: "",
      comments: 0,
      a:0
    };
  },
  components: {
    comment
  },
  mounted() {
    // console.log(this.$route.query);
    const id = this.$route.query;
    this.a=id.id-0;
    this.$axios({
      method: "get",
      url: "/posts",
      params: id
    }).then(res => {
      console.log(res.data.data[0]);
      this.res = res.data.data[0];
      this.text.title = res.data.data[0].title;
      this.text.content = res.data.data[0].content;
      this.info.time = res.data.data[0].created_at;
      this.info.read = res.data.data[0].watch;
      this.comments = res.data.data[0].comments.length;
    });
  },
  methods: {
    star: function() {
      const id = this.$route.query;
      this.$axios({
        method: "get",
        url: "/posts/star",
        params: id,
        headers: {
          Authorization: ` Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        console.log(res);
      });
    }
  },
  filters: {
    times: function(t) {
      // console.log(moment(t).format('YYYY-MM-DD HH:MM' ))
      return moment(t).format("YYYY-MM-DD HH:MM");
    },
    long: function(i) {
      return i > 100 ? 100 : i;
    }
  }
};
</script>

<style lang="less" scoped>
// scoped 只对当前组件的样式生效
.post-detail {
  width: 1000px;
  padding-top: 20px;
  margin: 0 auto;
  // background: skyblue;
  .main {
    width: 700px;
    .text {
      h1 {
        display: block;
        border-bottom: 1px solid #ddd;
        padding: 20px 0;
      }
      .info {
        color: #999;
        padding: 20px;
        text-align: right;
        span {
          margin-left: 20px;
        }
      }
      .content {
        width: 100%;
        // 样式穿透
        /deep/img {
          width: auto;
          margin: 10px 0;
          max-width: 100%;
        }
      }
    }
    .post-ctrl {
      padding: 50px 0 30px;
      .ctrl-item {
        margin: 0 20px;
        font-size: 20px;
        text-align: center;
        cursor: pointer;
        &:nth-child(2) i {
          transform: scale(1.4);
        }
        i {
          display: block;
          font-size: 28px;
          color: orange;
        }
        span {
          margin-top: 5px;
          font-size: 14px;
          color: #999;
        }
      }
    }
  }
  .aside {
    width: 280px;
  }
}
</style>