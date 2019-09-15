<template>
  <div class="cmt-wrapper">
    <div class="cmt-list" v-for="(item,index) in comment" :key="index">
      <div class="com-item">
        <div class="cmt-info">
          <img :src="`${ $axios.defaults.baseURL + item.account.defaultAvatar}`" />
          {{item.account.nickname}}
          <i></i>
          <span>{{item.account.role}}</span>
        </div>
        <div class="cmt-content">
          <div class="cmt-floor" v-if="comment[index].parent!=null"></div>
          <!-- {{comment[index].parent==null?1:2}} -->

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
              <a href>回复</a>
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
</template>
<script>
export default {
  props:{
    idValue:{
      type:Number,
      default:0
    }
  },
  data() {
    return {
      currentPage1: 1,
      total: 0,
      init: {
        post: 4,
        _limit: 2,
        _start: 1
      },
      comment: []
    };
  },
  mounted() {
    // this.init.post = this.idValue;
    setTimeout(() => {
      console.log(this.idValue);
      this.init.post = this.idValue;
    }, 100);
    
    this.$axios({
      method: "get",
      url: "/posts/comments",
      params: this.init
    }).then(res => {
      this.total = res.data.total;
      this.comment = res.data.data;
      console.log(this.comment);
    });
  },
  watch: {
    // "init._limit"() {
    //   this.$axios({
    //     method: "get",
    //     url: "/posts/comments",
    //     params: this.init
    //   }).then(res => {
    //     console.log(res.data);
    //     this.total = res.data.total;
    //   });
    // },
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
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.init._limit = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.init._start = val;
    }
  }
};
</script>
<style lang="less" scoped>
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
</style>