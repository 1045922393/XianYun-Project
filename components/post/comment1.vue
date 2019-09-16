<template>
  <div class="cmt-floor" v-if="date.parent"> 
      <comment1 :date="date.parent"></comment1>
    <div class="cmt-content">
      <div class="cmt-info">
        {{date.parent.account.nickname}}
        <i>{{date.parent.created_at |times}}</i>
        <span>{{date.parent.level}}</span>
      </div>
      <!-- {{date}} -->
      <p class="cmt-message">{{date.parent.content}}</p>
      <el-row type="flex">
          
      </el-row>
      <div class="cmt-ctrl">
        <a href>回复</a>
      </div>
    </div>
    <!-- <comment1 :date="date.parent"></comment1> -->
  </div>
</template>
<script>
let moment = require("moment");
export default {
  name: "comment1",
  props: ["date"],
  // mounted(){
  //     console.log(this.date,123)
  // },
  filters: {
    times: function(t) {
      // console.log(moment(t).format('YYYY-MM-DD HH:MM' ))
      return moment(t).format("YYYY-MM-DD HH:MM");
    }
  }
};
</script>
<style lang="less" scoped>
.cmt-floor {
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding: 2px;
  .cmt-content {
    padding: 5px 10px 0;
    .cmt-info {
      font-size: 12px;
      color: #666;
      i {
        color: #999;
      }
      span {
        float: right;
      }
    }
    .cmt-message {
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
</style>
