<template>
  <div class="add">
    <h4>评论</h4>
    <div class="cmt-input">
      <el-input type="textarea" placeholder="请输入内容" v-model="textarea" resize="none"></el-input>
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
</template>
<script>
export default {
  data() {
    return {
      textarea: "",
      dialogImageUrl: "",
      dialogVisible: false,
      reObj:{
        content:'',
        pics:'',
        post:''
      }
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    success(res) {
      console.log(res, 1234);
    },
    release() {
      this.$axios({
        method: "post",
        url: "/comments",
        headers: {
          Authorization: ` Bearer ${this.$store.state.user.userInfo.token}`
        },
        params: this.init
      }).then(res => {
        this.total = res.data.total;
        this.comment = res.data.data;
        // console.log(this.comment);
      });
    }
  }
};
</script>
<style lang="less" scoped>
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