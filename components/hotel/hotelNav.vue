<template>
  <div class="hotelNav">
    <el-row class="area">
      <!-- 区域标题 -->
      <el-col :span="3">
        <span>区域:</span>
      </el-col>
      <!-- 区域列表显示 -->
      <el-col :span="21">
        <div :class="{hiddenNav:ishiddenNav}" ref="nav">
          <span
            class="areaList"
            @click="clickScenics(item.id,index)"
            :class="{active:current===index}"
            v-for="(item,index) in scenics"
            :key="index"
          >{{item.name}}</span>
        </div>
        <i class="el-icon-d-arrow-right orange rotateDown" :class="{rotateUp:!ishiddenNav}"></i>
        <span @click="ishiddenNav=!ishiddenNav" style="cursor:pointer">等{{scenics.length-1}}个区域</span>
      </el-col>
    </el-row>
    <el-row class="helpPost">
      <!-- 攻略标题 -->
      <el-col :span="3">
        <span>攻略:</span>
      </el-col>
      <!-- 攻略文章 -->
      <el-col :span="21">
        <span>北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</span>
      </el-col>
    </el-row>
    <el-row class="averagePrice">
      <!-- 均价标题 -->
      <el-col :span="3">
        <span>
          均价
          <el-tooltip effect="dark" content="等级均价由平日价格计算得出，节假日价格会有上浮" placement="top-start">
            <sup class="sup">?</sup>
          </el-tooltip>:
        </span>
      </el-col>
      <!-- 均价内容 -->
      <el-col :span="21">
        <el-row>
          <el-col :span="7">
            <i class="iconfont iconhuangguan orange"></i>
            <i class="iconfont iconhuangguan orange"></i>
            <i class="iconfont iconhuangguan orange"></i>
            <el-tooltip
              effect="dark"
              :visible-arrow="false"
              content="等级均价由平日价格计算得出，节假日价格会有上浮"
              placement="bottom"
            >
              <span>￥332</span>
            </el-tooltip>
          </el-col>
          <el-col :span="7">
            <i class="iconfont iconhuangguan orange"></i>
            <i class="iconfont iconhuangguan orange"></i>
            <i class="iconfont iconhuangguan orange"></i>
            <i class="iconfont iconhuangguan orange"></i>
            <el-tooltip
              effect="dark"
              :visible-arrow="false"
              content="等级均价由平日价格计算得出，节假日价格会有上浮"
              placement="bottom"
            >
              <span>￥521</span>
            </el-tooltip>
          </el-col>
          <el-col :span="7">
            <i class="iconfont iconhuangguan orange"></i>
            <i class="iconfont iconhuangguan orange"></i>
            <i class="iconfont iconhuangguan orange"></i>
            <i class="iconfont iconhuangguan orange"></i>
            <i class="iconfont iconhuangguan orange"></i>
            <el-tooltip
              effect="dark"
              :visible-arrow="false"
              content="等级均价由平日价格计算得出，节假日价格会有上浮"
              placement="bottom"
            >
              <span>￥768</span>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    clickScenics(id, index) {
      if (index === this.current) {
        return;
      }
      if (this.$route.query.scenic) {
        let url = "";
        if (id === 3000) {
          url = this.$route.fullPath.replace(
            "&scenic=" + this.$route.query.scenic,
            ""
          );
        } else {
          url = this.$route.fullPath.replace(this.$route.query.scenic, id);
        }
        this.$router.push(url);
      } else {
        this.$router.push(this.$route.fullPath + "&scenic=" + id);
      }
      this.current = index;

      // this.$router.push(`${this.$route.fullPath}&scenic=${id}`)
      // console.log(id);
    }
  },
  mounted() {
    let city = this.cityName || "南京";
    this.$axios({
      url: `/cities?name=${city}`
    }).then(res => {
      this.scenics = res.data.data[0].scenics;
      if(this.$route.query.city!==res.data.data[0].id){
        this.$router.push(`/hotel?city=${res.data.data[0].id}`)
      }
      this.scenics.unshift({ name: "全部", id: 3000 });
      let ind = 0;
      if (this.$route.query.scenic) {
        ind = this.scenics.findIndex(val => {
          return val.id === this.$route.query.scenic - 0;
        });
      }
      this.current = ind;
      this.index = ind;
    });
  },
  watch: {
    cityName() {
      this.$axios({
        url: `/cities?name=${this.cityName}`
      }).then(res => {
        this.scenics = res.data.data[0].scenics;
        this.scenics.unshift({ name: "全部", id: 3000 });
      });
    }
  },
  data() {
    return {
      scenics: [],
      current: "",
      index: 0,
      current: 0,
      ishiddenNav: true
    };
  },
  props: {
    cityName: {
      type: String,
      defalut: "南京"
    }
  }
};
</script>

<style lang="less" scoped>
// 公共样式
.orange {
  color: #f90;
}
.active {
  color: #999;
  background: #eee;
  cursor: text !important;
  &:hover {
    color: #999 !important;
    text-decoration: none !important;
  }
}
.hotelNav {
  padding-right: 5px;
  font-size: 14px;
  color: #222;
  .area {
    padding-bottom: 10px;
    .hiddenNav {
      height: 19px;
      overflow: hidden;
    }
    .areaList {
      cursor: pointer;
      padding: 0 2px;
      margin-right: 14px;
      &:hover {
        color: #09f;
        text-decoration: underline;
      }
    }
    .rotateDown {
      transform: rotate(90deg);
    }
    .rotateUp {
      transform: rotate(270deg) !important;
    }
  }
  .helpPost {
    padding-bottom: 10px;
  }
  .averagePrice {
    padding-bottom: 10px;
    .sup {
      display: inline-block;
      color: #fff;
      background-color: #ccc;
      padding: 0 5px;
      border-radius: 50%;
    }
  }
}
</style>