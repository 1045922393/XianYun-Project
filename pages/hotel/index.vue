<template>
  <div class="hotel">
    <div class="container">
      <div class="bread">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>酒店</el-breadcrumb-item>
          <el-breadcrumb-item>{{cityName?cityName:"南京市"}}酒店预订</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="search">
        <el-row :gutter="10">
          <el-col :span="5">
            <el-autocomplete
              v-model="citystate"
              :fetch-suggestions="querySearchAsync"
              placeholder="目的地"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
          <el-col :span="9">
            <el-date-picker
              v-model="daterange"
              value-format="yyyy-MM-dd"
              @change="chooseDateRange"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-col>
          <el-col :span="5" class="counts">
            <el-input placeholder="人数未定" @focus="showChildren=true" v-model="counts">
              <i slot="suffix" class="el-input__icon iconfont iconuser"></i>
            </el-input>
            <!-- 隐藏部分 -->
            <el-card class="box-card" v-show="showChildren">
              <div slot="header" class="clearfix">
                <el-row :gutter="8">
                  <el-col :span="8">
                    <span style="font-size:14px">每间</span>
                  </el-col>
                  <el-col :span="8">
                    <el-select v-model="adultValue" size="mini" placeholder="请选择">
                      <el-option
                        v-for="item in adult"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select v-model="childrenValue" size="mini" placeholder="请选择">
                      <el-option
                        v-for="item in children"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </div>
              <el-row>
                <el-col :span="6" :offset="18">
                  <div class="text item">
                    <el-button type="primary" size="mini" @click="comfirmCounts">确定</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="5">
            <el-button type="primary" @click="checkPrice">清空筛选</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="area">
        <el-row>
          <el-col :span="14">
            <hotel-nav :cityName="citystate"></hotel-nav>
          </el-col>
          <el-col :span="10">
            <div v-if="loading">
              <img src="http://157.122.54.189:9093/images/loading.gif" alt />
            </div>
            <hotel-map v-show="!loading" :markHotels="hotels"></hotel-map>
          </el-col>
        </el-row>
      </div>
      <div class="filter">
        <hotel-filter :cityName="citystate"></hotel-filter>
      </div>
      <div class="list" v-show="!loading">
        <!-- 循环遍历酒店列表 -->
        <hotel-list v-for="(item,index) in hotels" :key="index" :showData="item"></hotel-list>
      </div>

      <div v-if="loading" style="text-align:center">
        <img src="http://157.122.54.189:9093/images/loading.gif" alt />
      </div>

      <div v-show="hotels.length===0&&!loading">
        <h2 style="color:#409EFF;text-align:center;line-height:60px;">没有适合条件的酒店信息</h2>
      </div>
      <div class="page" v-show="hotels.length!==0&&!loading">
        <el-pagination
          class="pagination"
          prev-text="<上一页"
          next-text="下一页>"
          layout="prev, pager, next"
          :total="hotelsTotal"
          :current-page="$route.query.page?$route.query.page-0:1"
          @current-change="pageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import hotelNav from "@/components/hotel/hotelNav";
import hotelMap from "@/components/hotel/hotelMap";
import hotelFilter from "@/components/hotel/hotelFilter";
import hotelList from "@/components/hotel/hotelList";
export default {
  data() {
    return {
      // 筛选条件
      option: {},
      // counts人数
      counts: "",
      person: 0,
      // adult的菜单
      adult: [
        {
          value: 1,
          label: "1成人"
        },
        {
          value: 2,
          label: "2成人"
        },
        {
          value: 3,
          label: "3成人"
        },
        {
          value: 4,
          label: "4成人"
        },
        {
          value: 5,
          label: "5成人"
        },
        {
          value: 6,
          label: "6成人"
        },
        {
          value: 7,
          label: "7成人"
        }
      ],
      adultValue: 1,
      // children的菜单
      children: [
        {
          value: 0,
          label: "0儿童"
        },
        {
          value: 1,
          label: "1儿童"
        },
        {
          value: 2,
          label: "2儿童"
        },
        {
          value: 3,
          label: "3儿童"
        },
        {
          value: 4,
          label: "4儿童"
        }
      ],
      childrenValue: 0,
      // 隐藏子菜单
      showChildren: false,
      // 这是要展示得酒店列表
      hotels: [],
      // 所有酒店的总数
      hotelsTotal: 0,
      // 绑定搜索城市数据
      citystate: "南京市",
      cityName: "",
      cityData: {},
      daterange: [],
      loading: false
    };
  },
  components: {
    "hotel-nav": hotelNav,
    "hotel-map": hotelMap,
    "hotel-filter": hotelFilter,
    "hotel-list": hotelList
  },
  watch: {
    $route() {
      this.loading = true;
      this.filterHotel();
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    }
  },
  methods: {
    // 页码
    pageChange(val) {
      let url = this.$route.fullPath;
      if (url.indexOf("page") === -1) {
        url += "&page=" + val;
      } else {
        if (val === 1) {
          url = url.replace(`&page=${this.$route.query.page}`, "");
        }
        url = url.replace(`page=${this.$route.query.page}`, `page=${val}`);
      }
      this.$router.push(url);
    },
    // 查看价格
    checkPrice() {
      this.counts = "1成人";
      this.adultValue = 1;
      this.childrenValue = 0;
      this.$router.push("/hotel?city=74");
    },
    // 确认人数
    comfirmCounts() {
      this.counts = `${this.adultValue}成人`;
      this.person = this.adultValue;
      if (this.childrenValue) {
        this.counts += ` ${this.childrenValue}儿童`;
        this.person += this.childrenValue;
      }
      this.showChildren = false;
    },
    // 选择时间触发事件
    chooseDateRange(value) {
      let url = this.$route.fullPath;
      if (!value) {
        url = url.replace(
          `&enterTime=${this.$route.query.enterTime}&leftTime=${this.$route.query.leftTime}`,
          ""
        );
        this.$router.push(url);
        return false;
      }
      if (!this.$route.query.enterTime) {
        url += `&enterTime=${value[0]}&leftTime=${value[1]}`;
      } else {
        url = url.replace(
          `enterTime=${this.$route.query.enterTime}&leftTime=${this.$route.query.leftTime}`,
          `enterTime=${value[0]}&leftTime=${value[1]}`
        );
      }
      this.$router.push(url);
      // console.log(this.daterange)
    },
    async querySearchAsync(queryString, cb) {
      // console.log(queryString);
      if (!queryString) {
        cb([]);
        return false;
      }
      // 获得城市列表
      let res = await this.$axios({
        url: "/airs/city",
        params: { name: queryString }
      });
      let arr = [];
      res.data.data.forEach(item => {
        item.value = item.name;
        arr.push(item);
      });
      // 默认是第一个
      this.citystate = res.data.data[0].name;
      this.cityName = res.data.data[0].name;
      // 回调需要的是数组,而且数组的元素是一个个带value的对象
      cb(arr);
    },
    handleSelect(item) {
      this.citystate = item.name;
      this.cityData = item;
      this.$router.push(`/hotel?city=${item.id}`);
    },
    // 封装筛选
    filterHotel() {
      let url = this.$route.fullPath;
      if (url.indexOf("page") !== -1) {
        url = url.replace(
          `page=${this.$route.query.page}`,
          `_start=${(this.$route.query.page - 1) * 5}`
        );
      }
      // let defObj = this.$route.query;
      let queryStr = url.slice(6);
      this.$axios({
        url: `/hotels${queryStr}`,
        method: "get"
        // params: defObj
      }).then(res => {
        this.hotels = res.data.data;
        this.hotelsTotal = res.data.total;
      });
      // let url = this.$route.fullPath;
      // url =url.replace("hotel","hotels")
      // this.$axios({
      //   url
      // }).then(res => {
      //   this.hotels = res.data.data;
      //   this.hotelsTotal = res.data.total;
      //   console.log(this.hotels)
      // });
    }
  },
  mounted() {
    if (!this.$route.query.city) {
      this.$router.push("/hotel?city=74");
    }
    // 获取酒店列表,前十个
    this.loading = true;
    this.filterHotel();
    setTimeout(() => {
      this.loading = false;
    }, 2000);
    // this.$axios({
    //   url: "/hotels",
    //   method: "get"
    // }).then(res => {
    //   console.log(res);
    //   this.hotels = res.data.data;
    //   this.hotelsTotal = res.data.total;
    // });
  }
};
</script>

<style lang="less" scoped>
.hotel {
  .container {
    width: 1000px;
    margin: 0 auto;
    .bread {
      padding: 20px 0 10px;
    }
    .search {
      padding: 10px 0 20px;
      .counts {
        position: relative;
        .box-card {
          padding: 10px;
          box-sizing: border-box;
          position: absolute;
          z-index: 1;
          top: 50px;
          left: 7px;
          width: 326px;
          height: 123px;
          /deep/.el-card__body {
            padding: 10px;
          }
        }
      }
    }
    .filter {
      margin-top: 20px;
    }
    .page {
      padding: 10px 0;
      box-sizing: border-box;
      height: 50px;
      .pagination {
        float: right;
        color: blueviolet;
      }
    }
  }
}
</style>