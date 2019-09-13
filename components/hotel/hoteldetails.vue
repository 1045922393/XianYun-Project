<template>
  <div class="details">
    <!-- 面包屑导航 -->
    <el-row>
      <el-col>
        <el-breadcrumb class="arrow">
          <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
          <el-breadcrumb-item>南京酒店</el-breadcrumb-item>
          <el-breadcrumb-item>南京世茂滨江希尔顿酒店</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <!-- 酒店名字 -->
    <el-row>
      <el-col :span="24">
        <h4 class="hotelname">
          南京世茂滨江希尔顿酒店
          <span data-v-3cab31ba title="[object Object]星级">
            <i class="iconfont iconhuangguan"></i><i class="iconfont iconhuangguan"></i><i class="iconfont iconhuangguan"></i><i class="iconfont iconhuangguan"></i><i class="iconfont iconhuangguan"></i>
          </span>
        </h4>
        <div data-v-3cab31ba class="el-row">
          <span data-v-3cab31ba class="hotel-en-name">nan jing shi mao bin jiang xi er dun hotel</span>
        </div>
        <div data-v-3cab31ba class="el-row">
          <i data-v-3cab31ba class="iconfont iconlocation"></i>淮滨路1号(近南通路，世茂滨江新城)
        </div>
      </el-col>
    </el-row>

    <!-- 图片 -->
    <el-row>
      <el-col>
        <div data-v-1895589c data-v-3cab31ba class="photo-view el-row">
          <div data-v-1895589c class="main-pic el-col el-col-16">
            <img
              data-v-1895589c
              height="360"
              width="640"
              src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg"
              alt="南京世茂滨江希尔顿酒店"
            />
            <span data-v-1895589c class="summary"></span>
          </div>
          <div data-v-1895589c class="list-pics el-col el-col-8">
            <div
              data-v-1895589c
              class="list-item el-row"
              style="margin-left: -10px; margin-right: -10px;"
            >
              <div
                data-v-1895589c
                class="el-col el-col-12"
                style="padding-left: 10px; padding-right: 10px;"
              >
                <a data-v-1895589c href="javascript:void(0)">
                  <img
                    data-v-1895589c
                    width="160"
                    src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg"
                    alt="南京世茂滨江希尔顿酒店"
                  />
                </a>
              </div>
              <div
                data-v-1895589c
                class="el-col el-col-12"
                style="padding-left: 10px; padding-right: 10px;"
              >
                <a data-v-1895589c href="javascript:void(0)">
                  <img
                    data-v-1895589c
                    width="160"
                    src="http://157.122.54.189:9093/images/hotel-pics/2.jpeg"
                    alt="南京世茂滨江希尔顿酒店"
                  />
                </a>
              </div>
              <div
                data-v-1895589c
                class="el-col el-col-12"
                style="padding-left: 10px; padding-right: 10px;"
              >
                <a data-v-1895589c href="javascript:void(0)">
                  <img
                    data-v-1895589c
                    width="160"
                    src="http://157.122.54.189:9093/images/hotel-pics/3.jpeg"
                    alt="南京世茂滨江希尔顿酒店"
                  />
                </a>
              </div>
              <div
                data-v-1895589c
                class="el-col el-col-12"
                style="padding-left: 10px; padding-right: 10px;"
              >
                <a data-v-1895589c href="javascript:void(0)">
                  <img
                    data-v-1895589c
                    width="160"
                    src="http://157.122.54.189:9093/images/hotel-pics/4.jpeg"
                    alt="南京世茂滨江希尔顿酒店"
                  />
                </a>
              </div>
              <div
                data-v-1895589c
                class="el-col el-col-12"
                style="padding-left: 10px; padding-right: 10px;"
              >
                <a data-v-1895589c href="javascript:void(0)">
                  <img
                    data-v-1895589c
                    width="160"
                    src="http://157.122.54.189:9093/images/hotel-pics/5.jpeg"
                    alt="南京世茂滨江希尔顿酒店"
                  />
                </a>
              </div>
              <div
                data-v-1895589c
                class="el-col el-col-12"
                style="padding-left: 10px; padding-right: 10px;"
              >
                <a data-v-1895589c href="javascript:void(0)">
                  <img
                    data-v-1895589c
                    width="160"
                    src="http://157.122.54.189:9093/images/hotel-pics/6.jpeg"
                    alt="南京世茂滨江希尔顿酒店"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 价格来源 -->
    <el-orw>
      <el-col>
        <el-table :data="tableData" style="width: 100%;margin-bottom:40px;">
          <el-table-column prop="date" label="价格来源" width="400"></el-table-column>
          <el-table-column prop="name" label="低价房型" width="400"></el-table-column>
          <el-table-column prop="address" label="最低价格/每晚"></el-table-column>
        </el-table>
      </el-col>
    </el-orw>

    <!-- 地图风景 -->
    <el-row>
      <el-col :span="16" style="margin-bottom:40px;">
        <div class="grid-content bg-purple">
          <!-- 地图 -->
          <div id="container"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <!-- 风景 -->
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="风景" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="交通" name="second">配置管理</el-tab-pane>
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
            <div class="grid-content bg-purple-light">2011年开业/2011年装修</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">酒店规模：63间客房</div>
          </el-col>
        </el-row>
        <!-- 主要设施 -->
        <el-row>
          <el-col class="formtabel">
            <el-col :span="4">
              <div class="grid-content bg-purple">主要设施</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-tag type="info">wifi</el-tag>
              </div>
            </el-col>
          </el-col>
        </el-row>
        <!-- 停车服务 -->
        <el-row>
          <el-col class="formtabel">
            <el-col :span="4">
              <div class="grid-content bg-purple">主要设施</div>
            </el-col>
            <el-col :span="20">
              <div class="grid-content bg-purple">
                免费:提供免费停车位：酒店停车场，免费
              </div>
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
              <div class="grid-content bg-purple">
                希尔顿
              </div>
            </el-col>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "second",
      tableData: [
        {
          date: "携程",
          name: "高级大床A",
          address: "￥ 1518 起 >"
        },
        {
          date: "携程",
          name: "高级大床A",
          address: "￥ 1518 起 >"
        },
        {
          date: "携程",
          name: "高级大床A",
          address: "￥ 1518 起 >"
        }
      ]
    };
  },
  mounted() {
    window.onLoad = function() {
      var map = new AMap.Map("container", {
        zoom: 11, //级别
        center: [116.397428, 39.90923] //中心点坐标
      });
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=dd5426f9859fbcfd420fffc5a1fdf80a&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style scoped lang="less">
.details {
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
}
</style>