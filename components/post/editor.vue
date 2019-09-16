<template>
  <div class="editor">
    <h2>发表新攻略</h2>
    <p>分享你的个人游记，让更多人看到哦！</p>
    <el-form>
      <el-form-item>
        <el-input placeholder="请输入标题" v-model="postForm.title"></el-input>
      </el-form-item>
      <!--富文本-->
      <el-form-item>
        <!-- <div
          ref="myQuillEditor"
          class="quill-editor"
          :content="postForm.content"
          @change="onEditorChange($event)"
          v-quill:myQuillEditor="editorOption"
          @blur="onEditorBlur($event)"
        ></div>-->
        <VueEditor :config="config" ref="vueEditor" />
      </el-form-item>
      <el-form-item label="选择城市">
        <el-autocomplete
          :fetch-suggestions="querySearchAsync"
          placeholder="请搜索游玩城市"
          @select="handleSelect"
          v-model="postForm.cityName"
          @blur="getCity"
        ></el-autocomplete>
      </el-form-item>
      <el-row>
        <el-button type="primary" size="small" @click="publishPost">发布</el-button>
        <span>
          或者
          <a href="javascript:(0)" @click="saveDraft">保存到草稿</a>
        </span>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import Vue from 'vue'
//引入moment插件
import moment from 'moment'
//引入post公共总线
import postBus from '@/assets/js/bus/post.js'

import "quill/dist/quill.snow.css"

let VueEditor;

if (process.browser) {
  VueEditor = require('vue-word-editor').default
}

export default {
  data() {
    return {
      config: {
        modules: {
          // 工具栏
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            ['image', 'video']
          ]
        },
        // 主题
        theme: 'snow',
        uploadImage: {
          url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file) {
            return true
          },
          uploadProgress(res) {

          },
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url)
          },
          uploadError() { },
          showProgress: false
        },
        uploadVideo: {
          //url: "http://157.122.54.189:9095/upload",
          url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file) {
            return true
          },
          uploadProgress(res) {

          },
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url)
          },
          uploadError() { },
        },
        handler: {
        }
      },
      postForm: {
        content: '',
        title: '',
        cityId: '',
        cityName: '',
        time: ''
      },
      temp: '',
      cityName: '',
      currentIndex: -1,
      quill: ''
    }
  },
  methods: {
    //格式化<p></p>标签
    //动态获取输入内容以及回调
    querySearchAsync(value, cb) {
      console.log(value)
      if (!value) {
        // 传递空数组不会出现下拉框
        cb([]);
        return;
      }
      // 根据用户的输入请求建议城市
      this.$axios({
        url: "/airs/city",
        // get参数
        params: {
          // 输入框的关键字
          name: value
        }
      }).then(res => {
        // 数组
        const { data } = res.data;
        //存放回调显示的数组
        const arr = [];
        // 给数组中每个对象添加value属性
        data.forEach(v => {
          v.value = v.name
          // 把带有value属性的对象添加到新数组中,显示带市的参数
          arr.push(v);
        });

        // 默认选中第一个
        // this.cityName = arr[0].name;
        // this.cityId = arr[0].id;
        this.temp = arr[0]

        //显示到下拉列表中
        cb(arr);
      })
    },
    //失焦获取数据
    getCity() {
      this.cityName = this.temp.name;
      this.postForm.cityId = this.temp.id;
    },
    //选中查询列表内容
    handleSelect(item) {
      console.log(item)
      this.cityName = item.name;
      this.postForm.cityId = item.id;
      this.postForm.cityName = item.name;
    },
    //编辑内容变化
    onEditorChange({ editor, html, text }) {
      //   console.log('editor change!', editor, html, text)
      //html格式
      console.log(html)
      this.postForm.content = html
      console.log(this.$refs.myQuillEditor)

    },
    onEditorBlur() {
      console.log("失焦")
    },
    // 选择图片之后的处理
    selectContentImg(e) {
      let vueObj = this//读取当前文章
      //点击事件获取到当前文件列表
      let files = e.target.files;
      const request = new XMLHttpRequest()
      //ajax请求request=ajax,原生js写法
      let formData = new FormData()
      formData.append("files", files[0])
      // request.open('POST', 'http://127.0.0.1:1337/upload')
      // //发送formData对象
      // request.send(formData)
      // request.onreadystatechange = function () {
      //   //如果上传成功
      //   if (request.readyState == 4 && request.status == 200) {
      //     let res = JSON.parse(request.responseText)
      //     // console.log(res[0])
      //     //对原有的html代码格式进行拼接
      //     vueObj.postForm.content += `<img src="http://localhost:1337${res[0].url}">`;
      //     console.log(vueObj)
      //   }
      // }

      //ajax方法
      this.$axios({
        url: "/upload",
        method: 'POST',
        data: formData
      }).then(res => {
        if (res.status === 200) {
          console.log(res.data[0].url)
          this.postForm.content += `<img src="http://localhost:1337${res.data[0].url}">`
          console.log(this)

        }
      })
    },
    //发布文章
    publishPost() {
      //录入当前时间
      this.postForm.time = moment(moment.now()).format(`YYYY-MM-DD`)
      if (!this.postForm.title) {
        this.$alert("标题不能为空", "提示");
        return
      }
      if (!this.postForm.content) {
        this.$alert("内容不能为空", "提示");
        return
      }
      if (!this.postForm.cityName) {
        this.$alert("请选择一个城市", "提示");
        return
      }

      //token验证
      console.log(this.$store.state.user.userInfo.token)
      if (!this.$store.state.user.userInfo.token) {
        this.$alert("请先登录", "提示");
        this.$router.push({ path: "/" })
      }
      console.log(this.postForm)


      this.$axios({
        url: '/posts',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        },
        data: {
          content: this.postForm.content,
          title: this.postForm.title,
          city: this.postForm.cityId
        }
      }).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.$message.success(res.data.message)

          //发布文章,如果选择草稿发送文章，则从草稿列表中删除对应的数组
          let postsArr = JSON.parse(localStorage.getItem('postsList')) || []
          if (this.currentIndex !== -1) {
            //删除当前草稿栏的index
            postsArr.splice(this.currentIndex, 1)
            //重新放入localstorage，postsArr已经修改

            //再将数组转化为JSON格式的字符串
            let postListStr = JSON.stringify(postsArr)
            console.log(postListStr)
            //再存入本地存储当中
            localStorage.setItem('postsList', postListStr)
            //传递子组件信息，通知完成

            this.currentIndex = -1
            this.postForm = {}
          }
          //路由跳转
          this.$router.push({ path: "/post" })
        }
      })
    },
    //保存草稿
    saveDraft() {
      //录入当前时间
      this.postForm.time = moment(moment.now()).format(`YYYY-MM-DD`)

      //判断当前index,如果为-1表示新增，否则为修改
      //获取到本地存储内容,push方式添加
      let postsArr = JSON.parse(localStorage.getItem('postsList')) || []
      if (this.currentIndex === -1) {
        //放入数组
        postsArr.unshift(this.postForm)
      } else {
        //删除当前index
        let temp = postsArr.splice(this.currentIndex, 1)
        //此时postForm保存的是编辑的最新内容
        postsArr.unshift(this.postForm)
      }
      //当前置空
      this.$message.success("保存成功")
      this.currentIndex = -1
      this.postForm = {}
      this.$refs.vueEditor.editor.root.innerHTML = this.postForm.content

      //再将数组转化为JSON格式的字符串
      let postListStr = JSON.stringify(postsArr)
      console.log(postListStr)
      //再存入本地存储当中
      localStorage.setItem('postsList', postListStr)
      //传递子组件信息，通知完成
      postBus.$emit("localOk")


    }
  },
  mounted() {
    //动态获取输入的内容

    this.$refs.vueEditor.editor.on('editor-change', (delta, oldDelta, source) => {
      console.log(this.$refs.vueEditor.editor)
      console.log(this.postForm.content)
      // console.log(this.$refs.vueEditor.editor.root.innerHTML)
      this.postForm.content = this.$refs.vueEditor.editor.root.innerHTML
    })

    // Object.defineProperty(this.postForm,'content',{
    //   set:function(val){
    //     document.getElementById()
    //     this.$refs.vueEditor.editor.root.innerHTML=val
    //   }
    // });


    //组件初始监听传递的数据
    postBus.$on('getCurrentIndex', data => {
      // console.log(data)
      this.currentIndex = data
      //通过currentIndex找到localstorage中对应数据
      let postsArr = JSON.parse(localStorage.getItem('postsList'))
      //双向绑定赋值
      this.postForm = (postsArr.slice(this.currentIndex, this.currentIndex + 1))[0]
      if (this.$refs.vueEditor)
        this.$refs.vueEditor.editor.root.innerHTML = this.postForm.content
      // console.log(this.postForm)
    })
  },
  components: {
    VueEditor
  }


}
</script>

<style lang="less">
#editor {
  height: 400px !important;

  p {
    font-size: 13px;
    color: #000 !important;
  }
}

.editor {
  width: 750px;
  h2 {
    font-weight: normal;
    margin-bottom: 10px;
    font-size: 22px;
  }
  p {
    color: #999;
    margin-bottom: 10px;
    font-size: 12px;
  }
  .quill-editor {
    min-height: 400px;
    line-height: 1.42;
    text-align: left;
    overflow-y: auto;
  }
  span {
    font-size: 14px;
    margin-left: 10px;
    a {
      color: orange;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>