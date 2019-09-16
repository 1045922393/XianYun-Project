<template>
  <div class="details">
    <!-- 面包屑导航 -->
    <el-row>
      <el-col>
        <el-breadcrumb class="arrow">
          <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/hotel' }">南京酒店</el-breadcrumb-item>
          <el-breadcrumb-item>{{hotelData.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <!-- 酒店名字 -->
    <el-row>
      <el-col :span="24">
        <h4 class="hotelname">
          {{hotelData.name}}
          <span data-v-3cab31ba title="[object Object]星级">
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
          </span>
        </h4>
        <div data-v-3cab31ba class="el-row">
          <span data-v-3cab31ba class="hotel-en-name">{{hotelData.alias}}</span>
        </div>
        <div data-v-3cab31ba class="el-row">
          <i data-v-3cab31ba class="iconfont iconlocation"></i>
          {{hotelData.address}}
        </div>
      </el-col>
    </el-row>

    <!-- 图片 -->
    <el-row>
      <el-col>
        <div class="photo-view">
          <div class="main-pic el-col el-col-16">
            <img height="360" width="640" :src="bigImg" />
          </div>
          <div class="list-pics el-col el-col-8">
            <div class="list-item el-row" style="margin-left: -10px; margin-right: -10px;">
              <div
                class="el-col el-col-12"
                style="padding-left: 10px; padding-right: 10px;"
                v-for="(item,index) in picsArr"
                :key="index"
              >
                <a href="javascript:void(0)">
                  <img width="160" @click="changeBigPic(item)" :src="item" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 价格来源 -->
    <el-row class="products">
      <el-col :span="8" style="width:40%">
        <div>价格来源</div>
      </el-col>
      <el-col :span="8" style="width:40%">
        <div>低价房型</div>
      </el-col>
      <el-col :span="8" style="width:20%">
        <div>最低价格/每晚</div>
      </el-col>
    </el-row>
    <a href="https://hotels.ctrip.com/hotel/694679.html" target="_blank" v-for="(item,index) in hotelData.products" :key="index">
      <el-row class="products">
        <el-col :span="8" style="width:40%">
          <div>{{item.name}}</div>
        </el-col>
        <el-col :span="8" style="width:40%">
          <div>{{item.bestType}}</div>
        </el-col>
        <el-col :span="8" style="width:20%">
          <div class="money">
            ￥{{item.price}}
            <span>起</span> >
          </div>
        </el-col>
      </el-row>
    </a>

    <!-- 地图风景 -->
    <el-row style="margin:40px 0;">
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <!-- 地图 -->
          <div id="container"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <!-- 风景 -->
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="风景" name="first">
              <ol style="height:306px;overflow-y:auto">
                <li style="margin: 0 10px 10px 10px;cursor: pointer">没有</li>
                <li style="margin: 0 10px 10px 10px;cursor: pointer">uh</li>
                <li style="margin: 0 10px 10px 10px;cursor: pointer">uh</li>
                <li style="margin: 0 10px 10px 10px;cursor: pointer">uh</li>
                <li style="margin: 0 10px 10px 10px;cursor: pointer">uh</li>
                <li style="margin: 0 10px 10px 10px;cursor: pointer">uh</li>
                <li style="margin: 0 10px 10px 10px;cursor: pointer">uh</li>
                <li style="margin: 0 10px 10px 10px;cursor: pointer">uh</li>
                <li style="margin: 0 10px 10px 10px;cursor: pointer">uh</li>
                <li style="margin: 0 10px 10px 10px;cursor: pointer">uh</li>
                <li style="margin: 0 10px 10px 10px;cursor: pointer">uh</li>
                <li style="margin: 0 10px 10px 10px;cursor: pointer">uh</li>
                <li style="margin: 0 10px 10px 10px;cursor: pointer">uh</li>
              </ol>
            </el-tab-pane>
            <el-tab-pane label="交通" name="second">
              <ol style="height:306px;overflow-y:auto">
                <li style="margin: 0 10px 10px 10px;cursor: pointer">还是没有</li>
                <li style="margin: 0 10px 10px 10px;cursor: pointer">nghj</li>
                <li style="margin: 0 10px 10px 10px;cursor: pointer">nghj</li>
                <li style="margin: 0 10px 10px 10px;cursor: pointer">nghj</li>
                <li style="margin: 0 10px 10px 10px;cursor: pointer">nghj</li>
                <li style="margin: 0 10px 10px 10px;cursor: pointer">nghj</li>
                <li style="margin: 0 10px 10px 10px;cursor: pointer">nghj</li>
                <li style="margin: 0 10px 10px 10px;cursor: pointer">nghj</li>
                <li style="margin: 0 10px 10px 10px;cursor: pointer">nghj</li>
                <li style="margin: 0 10px 10px 10px;cursor: pointer">nghj</li>
                <li style="margin: 0 10px 10px 10px;cursor: pointer">nghj</li>
                <li style="margin: 0 10px 10px 10px;cursor: pointer">nghj</li>
              </ol>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>

    <!-- 基本信息 -->
    <el-row>
      <el-col :span="24" style="margin-bottom:40px;">
        <el-row class="formtabel">
          <el-col :span="4">
            <div class="grid-content bg-purple">基本信息</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple-light">入住时间：14:00之后</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">离店时间12:00之前</div>
          </el-col>
          <el-col :span="5">
            <div
              class="grid-content bg-purple-light"
            >{{hotelData.creation_time}}/{{hotelData.renovat_time}}</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">酒店规模：{{hotelData.roomCount}}间客房</div>
          </el-col>
        </el-row>
        <!-- 主要设施 -->
        <el-row>
          <el-col class="formtabel">
            <el-col :span="4">
              <div class="grid-content bg-purple">主要设施</div>
            </el-col>
            <el-col :span="20">
              <div class="grid-content bg-purple">
                <el-tag
                  type="info"
                  v-for="(item,index) in assetsArr"
                  :key="index"
                  style="margin-right:10px;"
                >{{item.name}}</el-tag>
              </div>
            </el-col>
          </el-col>
        </el-row>
        <!-- 停车服务 -->
        <el-row>
          <el-col class="formtabel">
            <el-col :span="4">
              <div class="grid-content bg-purple">停车服务</div>
            </el-col>
            <el-col :span="20">
              <div class="grid-content bg-purple">免费:提供免费停车位：酒店停车场，免费</div>
            </el-col>
          </el-col>
        </el-row>
        <!-- 品牌信息 -->
        <el-row>
          <el-col class="formtabel">
            <el-col :span="4">
              <div class="grid-content bg-purple">品牌信息</div>
            </el-col>
            <el-col :span="20">
              <div class="grid-content bg-purple">希尔顿</div>
            </el-col>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 用户评论 -->
    <el-row>
      <el-col :span="24">
        <h4>用户评论</h4>
      </el-col>
    </el-row>
    <el-row class="discuss">
      <el-col :span="4">
        <p>总评数：{{hotelData.good_remarks+hotelData.bad_remarks}}</p>
        <p>好评数：{{hotelData.good_remarks}}</p>
        <p>差评数：{{hotelData.bad_remarks}}</p>
      </el-col>
      <el-col :span="5" class="star">
        <el-rate
          v-model="hotelData.stars"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}分"
          class="role"
        ></el-rate>
        <div class="rmd">推荐</div>
      </el-col>
      <el-col :span="5">
        <div class="rate_box">
          <div class="circle_rate">
            <svg viewBox="0 0 210 74">
              <path
                d="M 35 2, A 35,35 0 1 1 3.61513496225993,24.80243918562674"
                fill="none"
                stroke="#f90"
                stroke-width="2"
              />
            </svg>
            <span class="text">
              <p>环境</p>
              <span class="value">{{hotelData.scores.environment}}</span>
            </span>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="rate_box">
          <div class="circle_rate">
            <svg viewBox="0 0 210 74">
              <path
                d="M 35 2, A 35,35 0 1 1 3.61513496225993,24.80243918562674"
                fill="none"
                stroke="#f90"
                stroke-width="2"
              />
            </svg>
            <span class="text">
              <p>服务</p>
              <span class="value">{{hotelData.scores.service}}</span>
            </span>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="rate_box">
          <div class="circle_rate">
            <svg viewBox="0 0 210 74">
              <path
                d="M 35 2, A 35,35 0 1 1 3.61513496225993,24.80243918562674"
                fill="none"
                stroke="#f90"
                stroke-width="2"
              />
            </svg>
            <span class="text">
              <p>产品</p>
              <span class="value">{{hotelData.scores.product}}</span>
            </span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 大图的网址
      bigImg: "http://157.122.54.189:9093/images/hotel-pics/1.jpeg",
      // 设施数组
      picsArr: [
        "http://157.122.54.189:9093/images/hotel-pics/1.jpeg",
        "http://157.122.54.189:9093/images/hotel-pics/2.jpeg",
        "http://157.122.54.189:9093/images/hotel-pics/3.jpeg",
        "http://157.122.54.189:9093/images/hotel-pics/4.jpeg",
        "http://157.122.54.189:9093/images/hotel-pics/5.jpeg",
        "http://157.122.54.189:9093/images/hotel-pics/6.jpeg"
      ],
      assetsArr: [],
      value: 4,
      activeName: "first",
      hotelData: {
        location: {},
        scores: {}
      }
    };
  },
  mounted() {
    // 高德地图
    let _this = this;
    // let latitude =this.hotelData.location.latitude;
    // let longitude =this.hotelData.location.longitude;
    window.onLoad = function() {
      var map = new AMap.Map("container", {
        zoom: 16, //级别
        center: [
          _this.hotelData.location.longitude,
          _this.hotelData.location.latitude
        ] //中心点坐标
      });
      // 创建一个 Marker 实例：
      var marker = new AMap.Marker({
        // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        position: new AMap.LngLat(
          _this.hotelData.location.longitude,
          _this.hotelData.location.latitude
        ),
        title: _this.hotelData.name
      });
      // 将创建的点标记添加到已有的地图实例：
      map.add(marker);
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=dd5426f9859fbcfd420fffc5a1fdf80a&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);

    // 请求酒店详情数据
    let id = this.$route.query.id;
    this.$axios({
      url: `/hotels?id=${id}`
    }).then(res => {
      // console.log(res);
      this.hotelData = res.data.data[0];
    });

    // 获取酒店设施数据
    this.$axios({
      url: "hotels/options"
    }).then(res => {
      // console.log(res)
      this.assetsArr = this.hotelFacilities = res.data.data.assets;
      // console.log(this.hotelFacilities)
    });
  },
  methods: {
    // 点击改变大图
    changeBigPic(img) {
      this.bigImg = img;
    },
    // 风景和交通事件
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>



<style scoped lang="less">
.details {
  i {
    margin: -4px;
  }
  width: 1000px;
  margin: 0 auto;
  .arrow {
    height: 50px;
    line-height: 50px;
  }
  .hotelname {
    font-size: x-large;
    font-weight: 400;
    .iconfont {
      font-size: 14px;
    }
    .iconhuangguan {
      color: #f90;
    }
  }
  .products {
    line-height: 50px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    .money {
      color: #fa3;
      span {
        color: #000;
      }
    }
  }
  .photo-view {
    margin: 40px 0;
    .el-col-12 {
      margin-bottom: 10px;
    }
  }
  #container {
    width: 650px;
    height: 360px;
  }
  .formtabel {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
  }
  .discuss {
    margin: 20px 0;
    .star {
      position: relative;
      .role {
        margin: 20px 0;
        span {
          i {
            color: rgb(247, 186, 42);
            font-size: 24px;
            margin-right: -6px;
          }
        }
        .score {
          color: rgb(255, 153, 0);
          vertical-align: middle;
          font-size: 14px;
        }
        .star_five {
          height: 20px;
          line-height: 1px;
        }
      }
      .rmd {
        position: absolute;
        left: 20px;
        top: 0;
        width: 70px;
        height: 70px;
        border: 2px solid #fa3;
        text-align: center;
        line-height: 70px;
        border-radius: 50%;
        font-size: x-large;
        color: #fa3;
        transform: rotate(-30deg);
        opacity: 0.25;
      }
    }
    .rate_box {
      .circle_rate {
        position: relative;
        .text {
          color: rgb(255, 153, 0);
          position: absolute;
          top: 24%;
          left: 10%;
          text-align: center;
        }
      }
    }
  }
}
</style>