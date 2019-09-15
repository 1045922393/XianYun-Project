<template>
  <div class="hotelMap">
    <div id="container"></div>
    <span v-show="false">{{markHotels}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: {}
    };
  },
  props: {
    markHotels: {
      type: Array,
      default: []
    }
  },
  methods: {
  },
  watch: {
    markHotels() {
      let _this = this;
      window.onload()
    }
  },
  mounted() {
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=4b518a6fcd95aefe165e7e3469e6ab39&callback=onload";
    let _this = this;
    window.onload = function() {
      var map = new AMap.Map("container", {
        center: [
          _this.markHotels[0]
            ? _this.markHotels[0].location.longitude
            : 118,
          _this.markHotels[0]
            ? _this.markHotels[0].location.latitude
            : 31
        ],
        // zoom放大等级
        zoom: 7
      });
      // console.log(_this.markHotels);
      let markList = [];
      _this.markHotels.forEach((item, index) => {
        let marker = new AMap.Marker({
          position: new AMap.LngLat(
            item.location.longitude,
            item.location.latitude
          ), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: item.name,
          content: `<div style="width:22px;
                  height:36px;
                  background:url('https://webapi.amap.com/theme/v1.3/markers/b/mark_b.png') center no-repeat;
                  background-size:contain;
                  text-align:center;
                  color:#fff;">${index + 1}</div>`
        });
        markList.push(marker);
      });
      map.add(markList);
    };
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
    // var url =
    //   "https://webapi.amap.com/maps?v=1.4.15&key=4b518a6fcd95aefe165e7e3469e6ab39&callback=onload";
    // let _this = this;
    // window.onload = function() {
    //   var map = new AMap.Map("container", {
    //     center: [
    //       _this.markHotels[0]?_this.markHotels[0].location.longitude:118.8718107,
    //       _this.markHotels[0]?_this.markHotels[0].location.latitude:31.32846821
    //     ],
    //     // zoom放大等级
    //     zoom: 11
    //   });
    //   // console.log(_this.markHotels);
    //   let markList = [];
    //   _this.markHotels.forEach((item, index) => {
    //     let marker = new AMap.Marker({
    //       position: new AMap.LngLat(
    //         item.location.longitude,
    //         item.location.latitude
    //       ), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    //       title: item.name,
    //       content: `<div style="width:22px;
    //               height:36px;
    //               background:url('https://webapi.amap.com/theme/v1.3/markers/b/mark_b.png') center no-repeat;
    //               background-size:contain;
    //               text-align:center;
    //               color:#fff;">${index + 1}</div>`
    //     });
    //     markList.push(marker);
    //   });
    //   map.add(markList);
    // // 需要动态获取,for循环

    // var marker2 = new AMap.Marker({
    //   position: new AMap.LngLat(120.39, 40), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    //   title: "动态填写",
    //   content: `<div style="width:22px;
    //             height:36px;
    //             background:url('https://webapi.amap.com/theme/v1.3/markers/b/mark_b.png') center no-repeat;
    //             background-size:contain;
    //             text-align:center;
    //             color:#fff;">1</div>`
    // });
    // 可以添加数组
  }
};
</script>

<style lang="less" scoped>
#container {
  width: 420px;
  height: 260px;
}
// .marker{
//   width:22px;
//   height:36px;
//   background:url('https://webapi.amap.com/theme/v1.3/markers/b/mark_b.png') center no-repeat;
//   background-size:contain;
//   text-align:center;
//   color:#fff;
// }
</style>