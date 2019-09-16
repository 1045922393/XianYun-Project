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
          <div class="ctrl-item" v-on:click="postlike">
            <i class="iconfont iconding"></i>
            <span>点赞({{res.like}})</span>
          </div>
        </el-row>
      </div>
      <!-- <addcomment /> -->

      <!-- 提交评论 -->
      <div class="add">
        <h4>评论</h4>
        <el-tag closable v-show="name1!=null" @close="del">回复 @{{name1}}</el-tag>

        <div class="cmt-input">
          <el-input type="textarea" placeholder="请输入内容" v-model="reObj.content" resize="none"></el-input>
        </div>

        <el-row type="flex" justify="space-between" class="cmt-input-ctrls">
          <div class="cmt_pics">
            <el-upload
              name="files"
              action="http://127.0.0.1:1337/upload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="success"
              ref="upload"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </div>
          <div>
            <el-button type="primary" size="mini" @click="release">提交</el-button>
          </div>
        </el-row>
      </div>

      <!-- 评论/分页 -->
      <div class="cmt-wrapper">
        <h2 v-show="total==0">暂无评论</h2>
        <div v-if="total!==0" style="border: 1px solid #ddd;">
          <div class="cmt-list" v-for="(item,index) in comment" :key="index">
            <div class="com-item">
              <div class="cmt-info">
                <img :src="`${ $axios.defaults.baseURL + item.account.defaultAvatar}`" />
                {{item.account.nickname}}
                <i>{{item.created_at |times}}</i>
                <span>{{item.level}}</span>
              </div>
              <div class="cmt-content">
                <!-- <div class="cmt-floor" v-if="item.parent!=undefined">
                  <comment1 :date="item.parent"/>
                </div>-->
                <comment1 :date="item" />

                <div class="cmt-new">
                  <p>{{item.content}}</p>
                  <el-row type="flex">
                    <div class="cmt-pic" v-for="(item,index) in comment[index].pics" :key="index">
                      <img
                        v-if="comment[index].pics!=null"
                        :src="`${ $axios.defaults.baseURL + item.url}`"
                        alt
                      />
                    </div>
                  </el-row>
                  <div class="cmt-ctrl">
                    <a @click="huifu(item.id,item.account.nickname)">回复</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <el-row type="flex" justify="center" style="margin-top: 10px;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage1"
              :page-sizes="[2, 4, 6, 8]"
              :page-size="1"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </el-row>
        </div>
      </div>
    </el-col>
    <el-col class="aside">
      <h4 class="aside-title">相关攻略</h4>
      <div class="recommend-list">
        <a
          :href="`/post/detail?id=${item.id}`"
          v-for="(item,index) in aside"
          :key="index"
          class="recommend-item"
        >
          <!-- <div class="post-img el-row is-align-middle el-row--flex"></div> -->
          <el-row class="post-imgText" type="flex">
            <el-row align="middle" type="flex" class="post-img">
              <img :src="`${item.images[0]}`" alt />
            </el-row>
            <div class="post-text">
              <div>{{item.title}}</div>
              <p>{{item.created_at |times}} 阅读 {{item.watch}}</p>
            </div>
          </el-row>
        </a>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import comment1 from "@/components/post/comment1.vue";
// import addcomment from "@/components/post/addcomment.vue";
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
      currentPage1: 1,
      total: 0,
      init: {
        post: 4,
        _limit: 2,
        _start: 0
      },
      comment: [],
      digui: {},
      aside: [],
      // 提交
      // textarea: "",
      dialogImageUrl: "",
      dialogVisible: false,
      reObj: {
        content: "",
        pics: [],
        post: ""
      },
      shuaxing: true,
      name1:null
    };
  },
  components: {
    comment1
    // addcomment
  },
  mounted() {
    const id = this.$route.query;
    this.init.post = id.id;
    this.reObj.post = id.id;
    console.log(this.reObj.post, 555);
    this.$axios({
      method: "get",
      url: "/posts",
      params: id
    }).then(res => {
      console.log(res.data.data[0], 666);
      this.res = res.data.data[0];
      this.text.title = res.data.data[0].title;
      this.text.content = res.data.data[0].content;
      this.info.time = res.data.data[0].created_at;
      this.info.read = res.data.data[0].watch;
      this.comments = res.data.data[0].comments.length;
    });
    this.$axios({
      method: "get",
      url: "/posts/comments",
      params: this.init
    }).then(res => {
      this.total = res.data.total;
      this.comment = res.data.data;
      // console.log(this.comment);
    });
    this.$axios({
      method: "get",
      url: "/posts/recommend",
      params: id
    }).then(res => {
      this.aside = res.data.data;
      console.log(this.aside, 123);
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
        this.$message.success(res.data.message);
      });
    },
    postlike: function() {
      const id = this.$route.query;
      this.$axios({
        method: "get",
        url: "/posts/like",
        params: id,
        headers: {
          Authorization: ` Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        console.log(res);
        this.$message.success(res.data.message);
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.init._limit = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.init._start = val;
    },

    // 提交评论
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    success(res) {
      console.log(res[0]);
      this.reObj.pics.push(res[0]);
      console.log(this.reObj.pics);
    },
    release() {
      this.$axios({
        method: "post",
        url: "/comments",
        headers: {
          Authorization: ` Bearer ${this.$store.state.user.userInfo.token}`
        },
        data: this.reObj
      }).then(res => {
        console.log(res);
        
        this.$message.success(res.data.message);
        this.reObj.content = "";
        this.$refs.upload.clearFiles();
        this.xx();
        this.del()
        // console.log(this.shuaxing);
      });
    },
    xx() {
      console.log(999);
      // setTimeout(() => {}
      this.shuaxing = !this.shuaxing;
      // }, 500);
    },
    huifu(v,n) {
      this.reObj.follow = v;
      console.log(n);
      this.name1=n
    },
    del(){
      console.log(888)
      this.name1 = null,
      delete this.reObj.follow
    }
  },
  watch: {
    init: {
      handler() {
        this.$axios({
          method: "get",
          url: "/posts/comments",
          params: this.init
        }).then(res => {
          console.log(res.data);
          this.total = res.data.total;
          this.comment = res.data.data;
        });
      },
      deep: true
    },
    shuaxing() {
      // this.xx(),
      this.$axios({
        method: "get",
        url: "/posts/comments",
        params: this.init
      }).then(res => {
        console.log(res.data);
        this.total = res.data.total;
        this.comment = res.data.data;
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
    .add {
      h4 {
        font-weight: 400;
        font-size: 18px;
        margin-bottom: 20px;
      }
      .cmt-input {
        margin-bottom: 10px;
      }
      .cmt-input-ctrls {
        margin-bottom: 30px;
      }
    }
    .cmt-wrapper {
      .com-item {
        padding: 20px 20px 5px;
        border-bottom: 1px dashed #ddd;
        .cmt-info {
          margin-bottom: 10px;
          font-size: 12px;
          color: #666;
          img {
            width: 16px;
            height: 16px;
            border-radius: 50%;
          }
          span {
            float: right;
          }
        }
        .cmt-content {
          padding: 0 0 0 30px;
          .cmt-new {
            p {
              margin-top: 10px;
            }
            .cmt-pic {
              width: 80px;
              height: 80px;
              border-radius: 6px;
              overflow: hidden;
              margin-right: 5px;
              margin-top: 10px;
              padding: 5px;
              border: 1px dashed #ddd;
              img {
                display: block;
                width: 100%;
                height: 100%;
                -o-object-fit: cover;
                object-fit: cover;
                cursor: pointer;
              }
            }
            .cmt-ctrl {
              height: 20px;
              line-height: 20px;
              font-size: 12px;
              color: #1e50a2;
              text-align: right;
            }
          }
        }
      }
      .block {
        margin-top: 10px;
      }
    }
  }
  .aside {
    width: 280px;
    .aside-title {
      font-weight: 400;
      font-size: 18px;
      padding-bottom: 10px;
      border-bottom: 1px solid;
    }
    .recommend-list {
      .recommend-item {
        display: block;
        padding: 20px 0;
        border-bottom: 1px solid #ddd;
        .post-img {
          width: 100px;
          height: 80px;
          flex-shrink: 0;
          background: #ddd;
          overflow: hidden;
          margin-right: 10px;
          img {
            width: 100%;
            height: 100%;
            -o-object-fit: cover;
            object-fit: cover;
          }
        }
        .post-text {
          flex: 1;
          position: relative;
          div {
            position: relative;
            line-height: 1.4em;
            height: 2.8em;
            overflow: hidden;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          p {
            position: absolute;
            bottom: 0;
            left: 0;
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
}
/deep/ .el-upload-list__item-thumbnail {
  width: 100px;
  height: 100px;
}
/deep/ .el-upload-list__item {
  width: 100px;
  height: 100px;
}
/deep/.el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 100px;
  // margin-bottom: 12px;
}
</style>