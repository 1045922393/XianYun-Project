<template>
  <div class="draft">
    <div class="draft-box">
      <h4>草稿箱（{{postsArr.length}}）</h4>
      <div class="draft-list">
        <div class="draft-item" v-for="(item,index) in postsArr" :key="index">
          <p class="title" @click="getIndex(index)">
            <!--链接传递index，在localstorage中查找-->
            {{item.title}}
            <i class="el-icon-edit"></i>
          </p>
          <p class="time">{{item.time}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
//引入post公共总线
import postBus from '@/assets/js/bus/post.js'
export default {
  data() {
    return {
      postsArr: []
    }
  },
  mounted() {
    // console.log(moment(moment.now()).format(`YYYY-MM-DD`))
    //页面加载获取到草稿数据内容
    //初始化
    this.postsArr = JSON.parse(localStorage.getItem("postsList")) || []
    postBus.$on("localOk", () => {
      this.postsArr = JSON.parse(localStorage.getItem("postsList")) || []
      console.log("草稿部分获取")
      console.log(this.postsArr)
    })
  },
  methods: {
    getIndex(index) {
      // console.log(index)
      console.log("发送index位置")
      postBus.$emit('getCurrentIndex', index)
      console.log("over")
    }
  }
}
</script>

<style lang='less'>
.draft-box {
  width: 200px;
  border: 1px solid #ddd;
  color: #666;
  padding: 10px;
  h4 {
    margin-bottom: 10px;
    font-weight: normal;
  }
  .draft-item {
    font-size: 14px;
    margin-bottom: 10px;
    i {
      font-size: 16px;
    }
    .title {
      color: #000;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
        color: orange;
      }
    }
    .time {
      color: #999;
    }
  }
}
</style>