<template>
  <div class="hotelFilter">
    <el-row>
      <el-col :span="5" class="itemFilter">
        <el-row type="flex" justify="space-between" class="priceFilter">
          <span class="itemTitle">价格</span>
          <span class="itemTitle">0-4000</span>
        </el-row>
        <el-row style="position:relative;top:-6px">
          <el-slider></el-slider>
        </el-row>
      </el-col>
      <el-col :span="5" class="itemFilter">
        <el-row class="itemTitle">住宿等级</el-row>
        <el-row>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              不限
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" multiple>
              <el-dropdown-item command="1">1星</el-dropdown-item>
              <el-dropdown-item command="2">2星</el-dropdown-item>
              <el-dropdown-item command="3">3星</el-dropdown-item>
              <el-dropdown-item command="4">4星</el-dropdown-item>
              <el-dropdown-item command="5">5星</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-col>
      <el-col :span="5" class="itemFilter">
        <el-row class="itemTitle">住宿类型</el-row>
        <el-row>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              不限
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">1星</el-dropdown-item>
              <el-dropdown-item command="b">2星</el-dropdown-item>
              <el-dropdown-item command="c">3星</el-dropdown-item>
              <el-dropdown-item command="c">4星</el-dropdown-item>
              <el-dropdown-item command="c">5星</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-col>
      <el-col :span="5" class="itemFilter">
        <el-row class="itemTitle">酒店设施</el-row>
        <el-row>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              不限
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">1星</el-dropdown-item>
              <el-dropdown-item command="b">2星</el-dropdown-item>
              <el-dropdown-item command="c">3星</el-dropdown-item>
              <el-dropdown-item command="c">4星</el-dropdown-item>
              <el-dropdown-item command="c">5星</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-col>
      <el-col :span="4" class="itemFilter">
        <el-row class="itemTitle">酒店品牌</el-row>
        <el-row>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              不限
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">1星</el-dropdown-item>
              <el-dropdown-item command="b">2星</el-dropdown-item>
              <el-dropdown-item command="c">3星</el-dropdown-item>
              <el-dropdown-item command="c">4星</el-dropdown-item>
              <el-dropdown-item command="c">5星</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    handleCommand(command) {
      console.log(command);
    }
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