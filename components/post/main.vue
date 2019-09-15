<!-- 文章展示区域 -->
<template>
  <div>
    <!-- 轮播图 -->
    <div class="container">
      <el-carousel :interval="3000" arrow="always">
        <el-carousel-item v-for="(item,index) in banners" :key="index">
          <!-- 动态渲染轮播图，不想用后台的图片 -->
          <!-- <div class="banner-image" :style="`background:url(${$axios.defaults.baseURL + item.url}) center center no-repeat;
            background-size:contain contain`">
          </div> -->
          <!-- 静态文件，改为了其他的图片 -->
          <div class="banner-image" :style="`
                background:url(${item.url}) center center no-repeat;
                background-size:contain contain;
                `"></div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 头部组件 -->

    <Head @searchByCity="searchByCity" @getDataByCity="getDataByCity"></Head>
    <!-- 城市旅游信息 -->
    <main v-for="(item,index) in articleData" :key="index">
      <!-- 多张图片 -->
      <nuxt-link :to="`/post/detail?id=${item.id}`" class="three" v-if="item.images.length > 1">
        <div class="title">{{item.title}}</div>
        <p class="description">{{item.summary}}</p>
        <!-- 图片 -->
        <el-row class="images" type="flex">
          <el-col :span="24/item.images.length" v-for="(image,number) in item.images" :key="number">
            <img :src="image" alt />
          </el-col>
        </el-row>
        <!-- 最底下的小信息 -->
        <el-row class="info" type="flex" justify="space-between">
          <el-col :span="8">
            <i class="el-icon-location-outline"></i>
            {{item.cityName}}&nbsp;&nbsp;by
            <span>
              <img class="avatar" :src="'http://157.122.54.189:9095'+item.account.defaultAvatar" alt />
              {{item.account.nickname}}
            </span>
            <i class="el-icon-view"></i>
            {{item.watch}}
          </el-col>
          <el-col :span="14"></el-col>
          <el-col :span="2" class="like">{{item.like}}赞</el-col>
        </el-row>
      </nuxt-link>
      <!-- 1张图片 -->
      <nuxt-link :to="`/post/detail?id=${item.id}`" class="one" v-else>
        <el-row type="flex">
          <el-col :span="8">
            <img :src="item.images" alt />
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="15">
            <div class="title">{{item.title}}</div>
            <p class="description">{{item.summary}}</p>
            <!-- 最底下的小信息 -->
            <el-row class="info" type="flex" justify="space-between">
              <el-col :span="14">
                <i class="el-icon-location-outline"></i>
                {{item.cityName}}&nbsp;&nbsp;by
                <span>
                  <img class="avatar" :src="'http://157.122.54.189:9095'+item.account.defaultAvatar" alt />
                  {{item.account.nickname}}
                </span>
                <i class="el-icon-view"></i>
                {{item.watch}}
              </el-col>
              <el-col :span="7"></el-col>
              <el-col :span="3" class="like">{{item.like}}赞</el-col>
            </el-row>
          </el-col>
        </el-row>
      </nuxt-link>
    </main>
    <!-- 分页 -->
    <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[3, 5, 10, 15]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    <!-- 返回顶部 -->
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="300" :backPosition="50">
      </back-to-top>
    </el-tooltip>
  </div>
</template>
<script>
import Head from "./head";
import BackToTop from "./scrolltop";
export default {
  data() {
    return {
      // 文章列表数据
      articleData: [],
      // 当前页码数
      currentPage: 1,
      // 数据总数
      total: 1,
      // 从第几条数据开始获取
      start: 3,
      // 一共获取多少条
      limit: 3,
      // 定义一个接收城市的变量
      city: "",
      // 轮播图
      banners: [
        {
          url:
            "https://b1-q.mafengwo.net/s11/M00/E1/BE/wKgBEFsYhsCAUh5KAAXn20e3Ig4130.png"
        },
        {
          url:
            "https://p2-q.mafengwo.net/s11/M00/07/57/wKgBEFrikRaAZO1cAAR67VzFWpU34.jpeg"
        },
        {
          url:
            "https://n1-q.mafengwo.net/s12/M00/53/7C/wKgED1ujcYOAajw-AAmb2Ru77hU284.png"
        },
        {
          url:
            "https://n2-q.mafengwo.net/s11/M00/3D/3F/wKgBEFtrlBWAUHczAAR1Jh3BMT410.jpeg"
        }
      ],
      // 返回顶部
      myBackToTopStyle: {
        "left": "730px",
        "bottom": "30px",
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
    Head,
    // 回到顶部组件
    BackToTop
  },
  mounted() {
    // 默认从第0条数据开始拿，拿3条数据
    this.init(0, 3, this.$route.query.city);

    // 请求轮播图的数据
    // this.$axios({
    //   url: "/scenics/banners"
    // }).then(res => {
    //   // 赋值给banners
    //   this.banners = res.data.data;
    // });
  },
  watch: {
    $route({ query }, old) {
      // 获取路由改变后带的城市名，然后调用封装好的方法
      let city = query.city;
      this.initByCity(city);
    }
  },

  methods: {
    // 搜索框筛选事件
    searchByCity(city) {
      if (!city.trim()) {
        this.$message.warning("请输入成名后再搜索!");
        return;
      }
      this.initByCity(city);
    },

    // 根据城市名请求数据
    getDataByCity(city) {
      this.initByCity(city);
    },

    // 封装通过城市名请求数据
    initByCity(city) {
      this.city = city;
      this.currentPage = 1;
      this.start = (this.currentPage - 1) * this.limit;
      this.init(this.start, this.limit, this.city);
    },

    // 封装请求数据方法
    init(_start, _limit, city) {
      this.$axios({
        // 本地数据库只有4条数据，所以请求贤哥的服务器
        baseURL: "http://157.122.54.189:9095",
        url: "/posts",
        params: {
          _start,
          _limit,
          city
        }
      }).then(res => {
        if (res.data.data.length == 0) {
          this.$message.warning("该城市还没开通攻略，请确认输入的城市名无误！");
        }
        this.articleData = res.data.data;
        this.total = res.data.total;
      });
    },
    // 封装分页器改变展示数据条数或者是改变页码数后操作
    changSize() {
      this.start = (this.currentPage - 1) * this.limit;
      // 判断
      if (!this.city) {
        this.init(this.start, this.limit);
      } else {
        this.init(this.start, this.limit, this.city);
      }
    },
    // 改变页面展示数据的条数
    handleSizeChange(val) {
      this.currentPage = 1;
      this.limit = val;
      this.changSize();
    },
    // 改变页码数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.changSize();
    }
  }
};
</script>
<style lang='less' scoped>
// 边框值
@bd : 3px solid orange;
// 主颜色
@color: orange;
@bdgray: 0.5px solid rgb(224, 223, 223);

// 主内容样式
main {
  img {
    width: 100%;
  }
  // 公共样式
  .title {
    font-size: 18px;
    padding: 20px 0 15px;
    &:hover {
      color: @color;
    }
  }
  .description {
    height: 60px;
    overflow: hidden;
    margin-bottom: 15px;
    font-size: 14px;
    color: #777;
  }
  img {
    width: 100%;
    height: 165px;
    object-fit: cover;
  }
  .info {
    font-size: 12px;
    color: #777;
    .avatar {
      width: 25px;
      height: 25px;
      vertical-align: middle;
    }
    a {
      color: @color;
    }
    .like {
      color: @color;
      font-size: 16px;
    }
  }
  .three,
  .one {
    display: block;
    padding-bottom: 10px;
    border-bottom: @bdgray;
  }
  .one {
    margin-top: 15px;
  }
}
.container {
  width: 100%;
  margin: 20px auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 350px;
  }
  //   .el-carousel__indicators{
  // float: right;
  //   }
  /deep/ .el-carousel__button {
    width: 12px;
    height: 12px;
    border: 1px solid #088;
    border-radius: 50%;
  }
  .banner-image {
    width: 100%;
    height: 100%;
  }

  .banner-content {
    z-index: 1;
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 45%;
    margin-left: -500px;
    border-top: 1px transparent solid;
  }
}
.pagination {
  margin: 15px 0;
}
</style>