<template>
  <div class="hotelList">
    <el-row>
      <el-col :span="8" class="pic">
        <img :src="showData.photos" alt />
      </el-col>
      <el-col :span="16" class="centerPart">
        <nuxt-link :to="`/hotel/1?id=${this.showData.id}`" class="title">{{showData.name}}</nuxt-link>
        <el-row>
          <el-col :span="16">
            <p class="spellTitle">
              {{showData.alias}}
              <i
                class="iconfont iconhuangguan orange"
                v-for="(item,index) in levelArr"
                :key="index"
              />
              {{showData.hoteltype.name}}
            </p>
            <el-row class="scole">
              <el-col :span="10">
                <el-rate
                  v-model="showData.stars"
                  disabled
                  show-score
                  text-color="#f90"
                  :score-template="`${showData.stars}分`"
                ></el-rate>
              </el-col>
              <el-col :span="6">
                <span class="orange">{{showData.all_remarks}}</span>条评价
              </el-col>
              <el-col :span="8">
                <span class="orange">{{showData.num_collected}}</span>篇游记
              </el-col>
            </el-row>
            <p class="location">
              <i class="iconfont iconlocation">位于:{{showData.address}}</i>
            </p>
          </el-col>
          <el-col :span="8" class="friendLink">
            <nuxt-link to="#" v-for="(item,index) in showData.products" :key="index">
              <el-row class="link">
                <el-col :span="12">{{item.name}}</el-col>
                <el-col :span="12">
                  <span class="orange">￥{{item.price}}</span>起
                  <i class="el-icon-arrow-right"></i>
                </el-col>
              </el-row>
            </nuxt-link>
          </el-col>
        </el-row>
      </el-col>
      <!-- <el-col :span="8" class="pricePart">
        
      </el-col>-->
    </el-row>
  </div>
</template>

<script>
export default {
  mounted() {},
  computed: {
    levelArr() {
      let arr = [];
      if (!this.showData.hotellevel) {
        return [];
      }
      for (let i = 0; i < this.showData.hotellevel.level; i++) {
        arr.push(1);
      }
      return arr;
    }
  },
  props: {
    showData: {
      type: Object,
      default: {
        hoteltype: {},
        hotellevel: {}
      }
    }
  }
};
</script>

<style lang="less" scoped>
.orange {
  color: #f90;
}
.hotelList {
  padding: 25px 0;
  border-bottom: 1px solid #eee;
  .pic {
    img {
      display: block;
      width: 320px;
      height: 240px;
    }
  }
  .centerPart {
    color: #000;
    .title {
      font-size: 24px;
    }
    .spellTitle {
      color: #999;
      font-size: 12px;
      padding-bottom: 5px;
    }
    .scole {
      padding-bottom: 5px;
    }
    .location {
      font-size: 14px;
      color: #666;
      padding-bottom: 5px;
    }
    .friendLink {
      .link {
        padding: 10px;
        border-bottom: 1px solid #ebeef5;
        &:hover {
          background-color: #eee;
        }
      }
    }
  }
}
</style> 