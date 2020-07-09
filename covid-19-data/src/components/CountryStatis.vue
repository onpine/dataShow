<template>
  <div id="country">
    <!-- <h1>{{this.$route.query.country}}</h1> -->
    <div class="content">
      <div id="countrydata">
        <div class="countryName">
          <p>国家/地区</p>
          <p>
            <strong>{{country}}</strong>
          </p>
          <p>{{countryStatisdata.date}}</p>
        </div>
        <div class="nowconfirm">
          <p>较上日增加：{{countryStatisdata.nowConfirmAdd}}</p>
          <p>
            <strong>{{countryStatisdata.nowConfirm}}</strong>
          </p>
          <p>现有确诊</p>
        </div>
        <div class="confirm">
          <p>较上日增加：{{countryStatisdata.confirm_add}}</p>
          <p>
            <strong>{{countryStatisdata.confirm}}</strong>
          </p>
          <p>累计确诊</p>
        </div>
        <div class="heal">
          <p>较上日增加：{{countryStatisdata.healAdd}}</p>
          <p>
            <strong>{{countryStatisdata.heal}}</strong>
          </p>
          <p>累计治愈</p>
        </div>
        <div class="dead">
          <p>较上日增加：{{countryStatisdata.deadAdd}}</p>
          <p>
            <strong>{{countryStatisdata.dead}}</strong>
          </p>
          <p>累计病死</p>
        </div>
      </div>
      <div id="echarts">
        <div id="bar1"></div>
        <div id="bar2"></div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["country"],
  data() {
    return {
      countryStatisdata: {}
    };
  },
  watch: {
    $route(to, from) {
      console.log(to);
      console.log(to.query.country);
      if (to.query.country != from.query.country) {
        this.country = to.query.country;
        // this.getCountrydailyList(); //重新加载数据
      }
    }
  },
  created() {
    // console.log(this.$route.query.country);
    console.log("country" + this.country);
    getCountrydailyList: {
      const _this = this;
      axios
        .get("/api/foreign/daily/list?country=" + _this.country, {})
        .then(function(response) {
          const newobj = JSON.parse(JSON.stringify(response.data.data));

          const dates = [];
          const confirms = [];
          const confirm_adds = [];
          const deads = [];
          const heals = [];

          const today =
            newobj[Object.keys(newobj)[Object.keys(newobj).length - 1]];
          const yesterday =
            newobj[Object.keys(newobj)[Object.keys(newobj).length - 2]];
          // console.log(today);
          // console.log(yesterday);
          //今天现有 = 今天累计 - 今天治愈 - 今天病死
          const todayNowConfirm = today.confirm - today.dead - today.heal;
          //昨天现有 = 昨天累计 - 昨天治愈 - 昨天病死
          const yesterdayNowConfirm =
            yesterday.confirm - yesterday.dead - yesterday.heal;
          //今天现有增加 = 今天现有 - 昨天现有
          const nowConfirmAdd = todayNowConfirm - yesterdayNowConfirm;
          //  今天治愈增加 = 今天治愈 - 昨天治愈
          const healAdd = today.heal - yesterday.heal;
          //  今天病死增加 = 今天病死 - 昨天病死
          const deadAdd = today.dead - yesterday.dead;

          today.nowConfirm = todayNowConfirm;
          today.nowConfirmAdd = nowConfirmAdd;
          today.healAdd = healAdd;
          today.deadAdd = deadAdd;
          // console.log(today);

          _this.countryStatisdata = JSON.parse(JSON.stringify(today));

          for (let key in newobj) {
            // console.log(key);
            dates.push(newobj[key].date);
            confirms.push(newobj[key].confirm);
            confirm_adds.push(newobj[key].confirm_add);
            deads.push(newobj[key].dead);
            heals.push(newobj[key].heal);
          }
          // console.log(confirm_adds);
          const data = {
            text1: "每日累计：",
            text2: "每日新增：",
            date: dates[dates.length - 1],
            dates: dates,
            confirms: confirms,
            deads: deads,
            heals: heals,
            confirm_adds: confirm_adds
          };
          _this.bar(data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  methods: {
    bar(data) {
      // 引入 ECharts 主模块
      var echarts = require("echarts");
      //引入折线图
      // require("echarts/lib/chart/pie");
      // 引入提示框和标题组件
      // require("echarts/lib/component/tooltip");
      // require("echarts/lib/component/title");

      // 基于准备好的dom，初始化echarts实例
      // console.log(document.getElementById("bar"));
      //每日累计
      var myChart1 = echarts.init(document.getElementById("bar1"));
      //每日新增
      var myChart2 = echarts.init(document.getElementById("bar2"));
      // 绘制图表
      //全球每日累计
      myChart1.setOption({
        title: {
          text: data.text1,
          subtext: data.date
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["累计确诊", "累计病死", "累计治愈"]
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { show: true, type: ["stack", "tiled"] },
            saveAsImage: { show: true }
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: data.dates
        },
        yAxis: {
          type: "value"
        },
        //   grid: {
        //     x: 0,
        //     y: 20,
        //     x2: 20,
        //     y2: 20,
        //     borderWidth: 1
        //   },
        series: [
          {
            name: "累计确诊",
            type: "line",
            smooth: true,
            stack: "确诊",
            itemStyle: {
              normal: {
                // areaStyle: {
                //   type: "default",
                //   opacity: 0.1
                // }
              }
            },
            data: data.confirms
          },
          {
            name: "累计病死",
            type: "line",
            smooth: true,
            stack: "死亡",
            itemStyle: {
              normal: {
                // areaStyle: {
                //   type: "default",
                //   opacity: 0.1
                // }
              }
            },
            data: data.deads
          },
          {
            name: "累计治愈",
            type: "line",
            smooth: true,
            stack: "治愈",
            itemStyle: {
              normal: {
                // areaStyle: {
                //   type: "default",
                //   opacity: 0.1
                // }
              }
            },
            data: data.heals
          }
        ]
      });
      //每日新增
      myChart2.setOption({
        title: {
          text: data.text2,
          subtext: data.date
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["新增确诊"]
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { show: true, type: ["stack", "tiled"] },
            saveAsImage: { show: true }
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: data.dates
        },
        yAxis: {
          type: "value"
        },

        series: [
          {
            name: "新增确诊",
            type: "line",
            smooth: true,
            stack: "新增确诊",
            itemStyle: {
              normal: {
                areaStyle: {
                  type: "default",
                  opacity: 0.1
                }
              }
            },
            data: data.confirm_adds
          }
        ]
      });
    }
  }
};
</script>
<style scoped>
#country {
  height: calc(100vh - 90px);
  /* background-color: rgb(187, 136, 136); */
  padding: 10px 0;
}
.content {
  /* background-color: lightskyblue; */
  margin: 0 5%;
  width: 90%;
  height: 100%;
  display: flex;
}
#countrydata {
  width: 30%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.countryName {
  width: 80%;
  margin: 0 10%;
  height: 116px;
  background-color: rgb(170, 190, 228);
  border-radius: 20px 20px 0 0;
}
.nowconfirm {
  width: 80%;
  margin: 0 10%;
  height: 116px;
  background-color: rgb(218, 218, 218);
}
.confirm {
  width: 80%;
  margin: 0 10%;
  height: 116px;
  background-color: rgb(218, 218, 218);
}
.dead {
  width: 80%;
  margin: 0 10%;
  height: 116px;
  background-color: rgb(218, 218, 218);
  border-radius: 0 0 20px 20px;
}
.heal {
  width: 80%;
  margin: 0 10%;
  height: 116px;
  background-color: rgb(201, 231, 201);
}
p {
  line-height: 20px;
  margin: 14px;
  padding: 0;
  color: gray;
  font-size: 12px;
}
p strong {
  color: black;
  font-size: 20px;
}
#echarts {
  display: inline-block;
  width: 70%;
  height: 100%;
}
#bar1 {
  width: 100%;
  /* background-color: palevioletred; */
  height: calc(calc(100vh - 90px) / 2);
}
#bar2 {
  width: 100%;
  /* background-color: rebeccapurple; */
  height: calc(calc(100vh - 90px) / 2);
}
</style>