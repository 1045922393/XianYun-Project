<template>
  <div class="hotelFilter">
    <el-row>
      <el-col :span="5" class="itemFilter">
        <el-row type="flex" justify="space-between" class="priceFilter">
          <span class="itemTitle">价格</span>
          <span class="itemTitle">0-{{priceFilter}}</span>
        </el-row>
        <el-row style="position:relative;top:-6px">
          <el-slider v-model="priceFilter" :min="1" :max="4000" @change="priceChange"></el-slider>
        </el-row>
      </el-col>
      <el-col :span="5" class="itemFilter">
        <el-row class="itemTitle">住宿等级</el-row>
        <el-row>
           <el-select @change="changeLevel" v-model="levelValue" multiple  collapse-tags placeholder="不限" size="mini">
            <el-option
              v-for="item in option.levels"
              :key="item.id"
              :label="item.name"
              :value="item.level">
            </el-option>
          </el-select>
        </el-row>
      </el-col>
      <el-col :span="5" class="itemFilter">
        <el-row class="itemTitle">住宿类型</el-row>
        <el-row>
          <el-select v-model="typesValue" multiple collapse-tags placeholder="不限" size="mini">
            <el-option
              v-for="item in option.types"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-row>
      </el-col>
      <el-col :span="5" class="itemFilter">
        <el-row class="itemTitle">酒店设施</el-row>
        <el-row>
          <el-select v-model="assetsValue" multiple collapse-tags placeholder="不限" size="mini">
            <el-option
              v-for="item in option.assets"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-row>
      </el-col>
      <el-col :span="4" class="itemFilter">
        <el-row class="itemTitle">酒店品牌</el-row>
        <el-row>
         <el-select v-model="brandsValue" multiple collapse-tags placeholder="不限" size="mini">
            <el-option
              v-for="item in option.brands"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data(){
    return {
      priceFilter:4000,
      option:{
        assets:[],
        brands:[],
        levels:[],
        types:[]
      },
      levelValue:[],
      typesValue:[],
      assetsValue:[],
      brandsValue:[]
    }
  },
  methods: {
    changeLevel(command) {
      console.log(this.$route.query)
      console.log(command)
     // if(!this.$route.query.hotellevel){
      //   let url = this.$route.fullPath+"&hotellevel"
      // }
    },
    priceChange(val){
      // 判断路由是否有price_lt
      let url = this.$route.fullPath
      let index = url.indexOf('price_lt')
      if(index===-1){
        url+=`&price_lt=${val}`
      }else{
        url=url.replace(this.$route.query.price_lt-0,val)
      }
      this.$router.push(url)
    }
  },
  mounted(){
    this.$axios({
      url:'/hotels/options',
    }).then(res=>{
      this.option = res.data.data
    })
  }
};
</script>

<style lang="less" scoped>
.hotelFilter {
  border: 1px solid #ddd;
  padding: 5px 5px;
  //   box-sizing:border-box;
  .itemFilter {
    padding: 0 10px;
    border-right: 1px solid #ddd;
    height: 62px;
    &:last-child{
        border-right:none;
    }
    .itemTitle {
      font-size: 14px;
      line-height: 30px;
      color: #666;
    }
  }
}
</style> 